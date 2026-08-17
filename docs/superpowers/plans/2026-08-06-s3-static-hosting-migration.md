# S3 Static Hosting Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the FleetNET GLOBAL marketing site from a Node-server Next.js build to a fully static export hosted on S3 + CloudFront, while preserving the contact form's spam protection (honeypot + Cloudflare Turnstile) and email notification (Resend) by moving that logic into a small AWS Lambda function.

**Architecture:** `next build` with `output: 'export'` produces static HTML/CSS/JS in `/out`. That folder is synced to a private S3 bucket, served through a CloudFront distribution (Origin Access Control, no public bucket) with a CloudFront Function rewriting directory requests to `index.html`. The contact form posts JSON to a standalone Lambda Function URL (no API Gateway) that performs Turnstile verification and sends the notification email via the Resend REST API — replacing the current Next.js Server Action, which cannot run in a static export. GitHub Actions builds and deploys on push to `master` using an OIDC role (no long-lived AWS keys).

**Tech Stack:** Next.js 15 (App Router, static export), Node.js 20.x Lambda (native `fetch`, no dependencies), Node's built-in `node:test` runner, AWS CLI v2, S3, CloudFront (OAC + CloudFront Functions), ACM, IAM (OIDC federation), GitHub Actions.

## Global Constraints

- Do not add new npm dependencies to the Next.js app or the Lambda for this migration — use built-in `fetch` and Node's built-in test runner, matching the project's current zero-test-framework setup.
- AWS region for all resources: `us-east-1` (required anyway since CloudFront/ACM certs must be issued in us-east-1).
- No long-lived AWS access keys committed anywhere (repo or GitHub secrets) — use GitHub OIDC federation for CI deploys.
- Preserve existing spam-protection behavior exactly: honeypot silent-drop, then server-side Turnstile verification (soft-fail open on Cloudflare downtime, matching current behavior at [app/contact/actions.ts:112-115](app/contact/actions.ts#L112-L115)).
- Preserve existing Resend email template and recipient (`info@voltmotive.lk`) unless the user says otherwise.
- `data/contact_submissions.json` currently contains real submitted lead data and is tracked in git — this must stop being written to and should be removed from tracking as part of this migration (flag for user confirmation before deleting history, not just working tree).
- The GitHub repo is `chehansivarubanvega/fleetnet_site`, DNS provider is not yet decided — infra steps must not assume Route53 is the authoritative zone; give portable CNAME/records instead.

---

## File Structure

**Contact-form Lambda (new):**
- `lambda/contact-form/handler.mjs` — pure submission-processing logic (validation, honeypot, orchestration of injected `verifyTurnstile`/`sendEmail` functions). No AWS SDK, no direct `fetch` calls — fully unit-testable.
- `lambda/contact-form/index.mjs` — Lambda Function URL entry point: parses the event, wires real `fetch`-based `verifyTurnstile`/`sendEmail`, calls `handler.mjs`, formats the HTTP response with CORS headers.
- `lambda/contact-form/handler.test.mjs` — `node:test` tests for `handler.mjs`.
- `lambda/contact-form/package.json` — `{"type": "module"}` marker only, no dependencies.

**Infra config (new):**
- `infra/lambda-trust-policy.json` — IAM trust policy for the Lambda execution role.
- `infra/lambda-cloudfront-function.js` — CloudFront Function source for directory → `index.html` rewriting.
- `infra/github-oidc-trust-policy.json` — IAM trust policy for the GitHub Actions deploy role (OIDC).
- `infra/github-deploy-permissions-policy.json` — IAM permissions policy for the deploy role (S3 sync + CloudFront invalidation, scoped to the one bucket/distribution).
- `infra/s3-bucket-policy.json` — Bucket policy allowing only the CloudFront distribution (via OAC) to read.
- `infra/cloudfront-distribution-config.json` — CloudFront distribution config for `aws cloudfront create-distribution`.

**Next.js app (modified):**
- `next.config.ts` — switch to `output: 'export'`, add `images.unoptimized: true`, drop `output: 'standalone'`.
- `components/ContactForm.tsx` — replace the Server Action import/call with a `fetch()` POST to the Lambda Function URL.
- `lib/contact-types.ts` (new) — the `ActionResponse` type, extracted so `ContactForm.tsx` no longer imports from the deleted `app/contact/actions.ts`.
- `.env.example` (new) — documents `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `NEXT_PUBLIC_CONTACT_API_URL` (both baked in at build time).

**Removed:**
- `app/contact/actions.ts` — Server Action, unsupported under static export; logic moves to `lambda/contact-form/`.
- `data/contact_submissions.json` — local-disk submission log, incompatible with both static export and Lambda's ephemeral filesystem.

**CI (new):**
- `.github/workflows/deploy.yml` — build + `aws s3 sync` + CloudFront invalidation on push to `master`.

---

### Task 1: Contact-form Lambda — core validation/orchestration logic

**Files:**
- Create: `lambda/contact-form/package.json`
- Create: `lambda/contact-form/handler.mjs`
- Test: `lambda/contact-form/handler.test.mjs`

**Interfaces:**
- Produces: `parseAndValidate(fields: Record<string,string>): { honeypot: boolean, valid: boolean, errors: Record<string,string>, data: { name, email, organization, fleetSize, focus, message } }`
- Produces: `processContactSubmission(fields: Record<string,string>, deps: { verifyTurnstile: (token: string, secret: string) => Promise<boolean>, sendEmail: (data, apiKey: string) => Promise<void>, turnstileSecret?: string, resendApiKey?: string }): Promise<{ success: boolean, message: string, errors?: Record<string,string> }>` — consumed by `index.mjs` in Task 3.

- [ ] **Step 1: Create the Lambda package marker**

```json
{
  "name": "fleetnet-contact-form",
  "private": true,
  "type": "module"
}
```
Write to `lambda/contact-form/package.json`.

- [ ] **Step 2: Write the failing tests for validation and honeypot**

```javascript
// lambda/contact-form/handler.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAndValidate, processContactSubmission } from './handler.mjs';

test('parseAndValidate flags honeypot when fax_number is filled', () => {
  const result = parseAndValidate({
    name: 'Jane Doe',
    email: 'jane@company.com',
    organization: 'Logistics Corp',
    message: 'We need a fleet management quote please.',
    consent: 'on',
    fax_number: 'bot-filled-this',
  });
  assert.equal(result.honeypot, true);
});

test('parseAndValidate rejects short name, bad email, short message, missing consent', () => {
  const result = parseAndValidate({
    name: 'J',
    email: 'not-an-email',
    organization: 'Logistics Corp',
    message: 'short',
    consent: '',
    fax_number: '',
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.name, 'Name must be at least 2 characters.');
  assert.equal(result.errors.email, 'Please provide a valid email address.');
  assert.equal(result.errors.message, 'Message must be at least 10 characters.');
  assert.equal(result.errors.consent, 'You must authorize data transmission to proceed.');
});

test('parseAndValidate accepts a well-formed submission', () => {
  const result = parseAndValidate({
    name: 'Jane Doe',
    email: 'jane@company.com',
    organization: 'Logistics Corp',
    fleetSize: '11-50',
    focus: 'Cold Chain Logistics',
    message: 'We need a fleet management quote please.',
    consent: 'on',
    fax_number: '',
  });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.email, 'jane@company.com');
});

test('processContactSubmission silently succeeds on honeypot without calling deps', async () => {
  let turnstileCalled = false;
  let emailCalled = false;
  const result = await processContactSubmission(
    { name: 'Bot', email: 'a@b.com', organization: 'x', message: 'x'.repeat(15), consent: 'on', fax_number: 'gotcha' },
    {
      verifyTurnstile: async () => { turnstileCalled = true; return true; },
      sendEmail: async () => { emailCalled = true; },
    }
  );
  assert.equal(result.success, true);
  assert.equal(turnstileCalled, false);
  assert.equal(emailCalled, false);
});

test('processContactSubmission returns validation errors without calling deps', async () => {
  const result = await processContactSubmission(
    { name: '', email: '', organization: '', message: '', consent: '', fax_number: '' },
    { verifyTurnstile: async () => true, sendEmail: async () => {} }
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.name);
});

test('processContactSubmission blocks when turnstile token missing but secret configured', async () => {
  const result = await processContactSubmission(
    { name: 'Jane Doe', email: 'jane@company.com', organization: 'Logistics Corp', message: 'x'.repeat(15), consent: 'on', fax_number: '' },
    { verifyTurnstile: async () => true, sendEmail: async () => {}, turnstileSecret: 'secret' }
  );
  assert.equal(result.success, false);
  assert.match(result.message, /Security validation missing/);
});

test('processContactSubmission blocks when turnstile verification fails', async () => {
  const result = await processContactSubmission(
    { name: 'Jane Doe', email: 'jane@company.com', organization: 'Logistics Corp', message: 'x'.repeat(15), consent: 'on', fax_number: '', 'cf-turnstile-response': 'tok' },
    { verifyTurnstile: async () => false, sendEmail: async () => {}, turnstileSecret: 'secret' }
  );
  assert.equal(result.success, false);
  assert.match(result.message, /bot validation failed/);
});

test('processContactSubmission succeeds and sends email when turnstile passes', async () => {
  let emailedData = null;
  const result = await processContactSubmission(
    { name: 'Jane Doe', email: 'jane@company.com', organization: 'Logistics Corp', message: 'x'.repeat(15), consent: 'on', fax_number: '', 'cf-turnstile-response': 'tok' },
    {
      verifyTurnstile: async () => true,
      sendEmail: async (data) => { emailedData = data; },
      turnstileSecret: 'secret',
      resendApiKey: 'resend-key',
    }
  );
  assert.equal(result.success, true);
  assert.equal(emailedData.name, 'Jane Doe');
});

test('processContactSubmission succeeds even if turnstile verification throws (fail-open)', async () => {
  const result = await processContactSubmission(
    { name: 'Jane Doe', email: 'jane@company.com', organization: 'Logistics Corp', message: 'x'.repeat(15), consent: 'on', fax_number: '', 'cf-turnstile-response': 'tok' },
    {
      verifyTurnstile: async () => { throw new Error('network down'); },
      sendEmail: async () => {},
      turnstileSecret: 'secret',
    }
  );
  assert.equal(result.success, true);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test lambda/contact-form/`
Expected: FAIL — `handler.mjs` does not exist yet (`Cannot find module`).

- [ ] **Step 4: Implement `handler.mjs`**

```javascript
// lambda/contact-form/handler.mjs

export function parseAndValidate(fields) {
  const honeypot = Boolean(fields.fax_number && fields.fax_number.trim().length > 0);

  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const organization = (fields.organization || '').trim();
  const fleetSize = fields.fleetSize || '';
  const focus = fields.focus || '';
  const message = (fields.message || '').trim();
  const consent = fields.consent === 'on';

  const errors = {};
  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!organization || organization.length < 2) {
    errors.organization = 'Organization name must be at least 2 characters.';
  }
  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  if (!consent) {
    errors.consent = 'You must authorize data transmission to proceed.';
  }

  return {
    honeypot,
    valid: Object.keys(errors).length === 0,
    errors,
    data: { name, email: email.toLowerCase(), organization, fleetSize, focus, message },
  };
}

export async function processContactSubmission(fields, deps) {
  const { verifyTurnstile, sendEmail, turnstileSecret, resendApiKey } = deps;
  const parsed = parseAndValidate(fields);

  if (parsed.honeypot) {
    return {
      success: true,
      message: 'Secure data transmission successful. Our operations team has been notified.',
    };
  }

  if (!parsed.valid) {
    return {
      success: false,
      message: 'Validation failed. Please correct the errors in the form.',
      errors: parsed.errors,
    };
  }

  if (turnstileSecret) {
    const token = fields['cf-turnstile-response'];
    if (!token) {
      return {
        success: false,
        message: 'Security validation missing. Please verify you are human.',
      };
    }
    try {
      const ok = await verifyTurnstile(token, turnstileSecret);
      if (!ok) {
        return {
          success: false,
          message: 'Cryptographic bot validation failed. Please solve the security widget again.',
        };
      }
    } catch (err) {
      // Fail open: do not block legitimate users if Cloudflare's validation endpoint is down.
      console.error('Turnstile verification request failed:', err);
    }
  }

  if (resendApiKey) {
    try {
      await sendEmail(parsed.data, resendApiKey);
    } catch (err) {
      console.error('Failed to send notification email:', err);
    }
  }

  return {
    success: true,
    message: 'Secure data transmission successful. Our operations team has been notified.',
  };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test lambda/contact-form/`
Expected: PASS — all 9 tests green.

- [ ] **Step 6: Commit**

```bash
git add lambda/contact-form/package.json lambda/contact-form/handler.mjs lambda/contact-form/handler.test.mjs
git commit -m "feat: add contact-form Lambda core validation and orchestration logic"
```

---

### Task 2: Contact-form Lambda — real Turnstile/Resend integrations and entry point

**Files:**
- Create: `lambda/contact-form/index.mjs`

**Interfaces:**
- Consumes: `processContactSubmission` from `handler.mjs` (Task 1).
- Produces: `export const handler` — a Lambda Function URL handler `(event) => Promise<{ statusCode, headers, body }>`, used directly as the Lambda's configured handler in Task 4 deployment.

- [ ] **Step 1: Write the entry point**

```javascript
// lambda/contact-form/index.mjs
import { processContactSubmission } from './handler.mjs';

async function verifyTurnstile(token, secret) {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });
  const data = await res.json();
  return Boolean(data.success);
}

async function sendEmail(data, apiKey) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body style="background:#020617;color:#fff;font-family:sans-serif;padding:40px 20px;">
        <div style="max-width:600px;margin:0 auto;background:#090d16;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:30px;">
          <h2 style="margin-top:0;">Operational Diagnostic Payload Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Organization:</strong> ${data.organization}</p>
          <p><strong>Fleet Size:</strong> ${data.fleetSize} vehicles</p>
          <p><strong>Focus:</strong> ${data.focus}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${data.message}</p>
        </div>
      </body>
    </html>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'FleetNET Operations <onboarding@resend.dev>',
      to: 'info@voltmotive.lk',
      subject: `[TELEMETRY INGRESS] Inbound Operational Request from ${data.name} (${data.organization})`,
      html: emailHtml,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend API error: ${res.status} ${errText}`);
  }
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const handler = async (event) => {
  const method = event.requestContext?.http?.method;

  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  let fields;
  try {
    fields = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      body: JSON.stringify({ success: false, message: 'Invalid request body.' }),
    };
  }

  const result = await processContactSubmission(fields, {
    verifyTurnstile,
    sendEmail,
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
  });

  return {
    statusCode: result.success ? 200 : 400,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    body: JSON.stringify(result),
  };
};
```

- [ ] **Step 2: Smoke-test the handler locally with a mocked event**

```bash
node -e "
import('./lambda/contact-form/index.mjs').then(async ({ handler }) => {
  const res = await handler({
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({
      name: 'Jane Doe', email: 'jane@company.com', organization: 'Logistics Corp',
      fleetSize: '11-50', focus: 'Cold Chain Logistics',
      message: 'We need a fleet management quote please.', consent: 'on', fax_number: ''
    }),
  });
  console.log(res);
});
"
```
Expected: `statusCode: 200`, `body` JSON with `success: true` (no `TURNSTILE_SECRET_KEY`/`RESEND_API_KEY` env vars set locally, so both external calls are skipped — this only exercises validation + response shape, not the live integrations).

- [ ] **Step 3: Commit**

```bash
git add lambda/contact-form/index.mjs
git commit -m "feat: add contact-form Lambda Function URL entry point"
```

---

### Task 3: Next.js app — switch to static export and remove the Server Action

**Files:**
- Modify: `next.config.ts`
- Create: `lib/contact-types.ts`
- Modify: `components/ContactForm.tsx`
- Delete: `app/contact/actions.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: the deployed Lambda Function URL (placeholder until Task 5 — use `NEXT_PUBLIC_CONTACT_API_URL` env var, read at build time).
- Produces: `lib/contact-types.ts` exports `ActionResponse` (same shape returned by the Lambda in Task 2: `{ success, message, errors? }`), consumed by `ContactForm.tsx`.

- [ ] **Step 1: Update `next.config.ts` for static export**

Modify [next.config.ts](next.config.ts):

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['motion'],
};

export default nextConfig;
```

(Drops `output: 'standalone'`, the `webpack` HMR override — irrelevant once there's no dev server behind AI Studio — and the `remotePatterns` block, since `images.unoptimized: true` serves remote URLs directly without going through Next's image optimizer.)

- [ ] **Step 2: Extract the shared response type**

```typescript
// lib/contact-types.ts
export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    organization?: string;
    message?: string;
    consent?: string;
  };
}
```

- [ ] **Step 3: Rewire `ContactForm.tsx` to call the Lambda instead of the Server Action**

In [components/ContactForm.tsx](components/ContactForm.tsx), replace the import at line 3:

```typescript
import { ActionResponse } from '@/lib/contact-types';
```

Replace `handleSubmit` (lines 22-51):

```typescript
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(null);

    const domFormData = new FormData(e.currentTarget);
    const payload = {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      fleetSize: formData.fleetSize,
      focus: formData.focus,
      message: formData.message,
      fax_number: formData.fax_number,
      consent: formData.consent ? 'on' : '',
      'cf-turnstile-response': (domFormData.get('cf-turnstile-response') as string) || '',
    };

    startTransition(async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_API_URL as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const response: ActionResponse = await res.json();
        setState(response);
        if (response.success) {
          setFormData((prev) => ({
            ...prev,
            message: '',
            consent: false,
            fax_number: '',
          }));
        }
      } catch {
        setState({
          success: false,
          message: 'Network error reaching the operations desk. Please try again.',
        });
      }
    });
  };
```

- [ ] **Step 4: Delete the Server Action**

```bash
git rm app/contact/actions.ts
```

- [ ] **Step 5: Document the build-time env vars**

```bash
# .env.example
# Baked into the static build — safe to expose to the browser.
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_CONTACT_API_URL=

# Server-side only — set on the Lambda, never in this file with real values.
# TURNSTILE_SECRET_KEY=
# RESEND_API_KEY=
```

- [ ] **Step 6: Verify the app still type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `app/contact/actions.ts` or the old `ActionResponse` import path.

- [ ] **Step 7: Commit**

```bash
git add next.config.ts lib/contact-types.ts components/ContactForm.tsx .env.example
git commit -m "refactor: switch to static export and call contact Lambda instead of a Server Action"
```

---

### Task 4: Remove the local submission log from tracking

**Files:**
- Delete: `data/contact_submissions.json`

**Interfaces:**
- None — this is cleanup with no other task depending on it.

- [ ] **Step 1: Confirm scope with the user before running**

`data/contact_submissions.json` is tracked in git and contains real lead data (names/emails from actual form submissions). Removing it from the working tree via `git rm` does not remove it from git history. Ask the user whether they also want history rewritten (`git filter-repo` or BFG) to purge it — that is a destructive, force-push-requiring operation and must not be done without explicit confirmation.

- [ ] **Step 2: Remove from the working tree and future tracking**

```bash
git rm data/contact_submissions.json
rmdir data 2>/dev/null || true
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: stop tracking local contact-submission log (superseded by Lambda + Resend)"
```

---

### Task 5: Local static-export build verification

**Files:**
- None created — verification task using the outputs of Tasks 3-4.

- [ ] **Step 1: Build with a placeholder Lambda URL**

```bash
NEXT_PUBLIC_CONTACT_API_URL="https://placeholder.lambda-url.us-east-1.on.aws/" \
NEXT_PUBLIC_TURNSTILE_SITE_KEY="1x00000000000000000000AA" \
npx next build
```
Expected: build succeeds, `/out` directory is created (no `.next/standalone` output this time).

- [ ] **Step 2: Confirm the export shape**

Run: `find out -maxdepth 2 -type d`
Expected: directories for `about`, `contact`, `industries`, `smart-operations`, `privacy-policy`, each containing an `index.html`, plus a root `index.html` and `404.html`.

- [ ] **Step 3: Serve the export locally and smoke-test navigation**

```bash
npx serve out -l 4173
```
Then open `http://localhost:4173/`, click through to `/about/`, `/industries/`, `/smart-operations/`, `/contact/`, and confirm images render (picsum/unsplash URLs) and no console errors reference `next/image` optimization or missing server routes.

- [ ] **Step 4: No commit** — this is a verification-only task with no file changes.

---

### Task 6: AWS account bootstrap — CLI + IAM

**Files:**
- Create: `infra/lambda-trust-policy.json`

**Interfaces:**
- Produces: an `aws` CLI profile with credentials sufficient for the remaining infra tasks; an IAM role ARN for the Lambda, consumed by Task 7.

- [ ] **Step 1: Install and configure the AWS CLI**

Install per the AWS docs for your OS (macOS: `brew install awscli`), then create an IAM user in the AWS Console (IAM → Users → Create user) named e.g. `fleetnet-deploy-admin` with `AdministratorAccess` for this one-time setup (you'll narrow permissions for ongoing CI in Task 10 — this user is only for the manual provisioning steps below and can be deleted afterward). Generate an access key for it, then:

```bash
aws configure
# AWS Access Key ID, Secret Access Key, region: us-east-1, output: json
```

- [ ] **Step 2: Verify access**

Run: `aws sts get-caller-identity`
Expected: JSON with your account `Account` ID, `UserId`, `Arn`. Note the `Account` ID — it's needed in later policy JSON files as `<ACCOUNT_ID>`.

- [ ] **Step 3: Create the Lambda execution role**

```json
// infra/lambda-trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name fleetnet-contact-form-lambda-role \
  --assume-role-policy-document file://infra/lambda-trust-policy.json

aws iam attach-role-policy \
  --role-name fleetnet-contact-form-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```
Expected: `create-role` returns the role ARN, e.g. `arn:aws:iam::<ACCOUNT_ID>:role/fleetnet-contact-form-lambda-role`. Record it — needed in Task 7.

- [ ] **Step 4: Commit the trust policy**

```bash
git add infra/lambda-trust-policy.json
git commit -m "chore: add IAM trust policy for the contact-form Lambda execution role"
```

---

### Task 7: Deploy the contact-form Lambda with a Function URL

**Files:**
- None created — deployment of Task 1/2 code.

**Interfaces:**
- Consumes: `lambda/contact-form/index.mjs` (Task 2), IAM role ARN (Task 6).
- Produces: a Lambda Function URL, consumed as `NEXT_PUBLIC_CONTACT_API_URL` in Task 9's production build.

- [ ] **Step 1: Package the Lambda**

```bash
cd lambda/contact-form
zip -r ../../contact-form-lambda.zip index.mjs handler.mjs package.json
cd ../..
```

- [ ] **Step 2: Create the function**

```bash
aws lambda create-function \
  --function-name fleetnet-contact-form \
  --runtime nodejs20.x \
  --role arn:aws:iam::<ACCOUNT_ID>:role/fleetnet-contact-form-lambda-role \
  --handler index.handler \
  --zip-file fileb://contact-form-lambda.zip \
  --timeout 10 \
  --memory-size 128
```
Expected: JSON response with `FunctionArn` and `State: Pending` → poll with `aws lambda get-function --function-name fleetnet-contact-form` until `State: Active`.

- [ ] **Step 3: Set the real secrets as environment variables**

Use the actual values from the project's `.env` file (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) — do not commit these anywhere:

```bash
aws lambda update-function-configuration \
  --function-name fleetnet-contact-form \
  --environment "Variables={RESEND_API_KEY=<value>,TURNSTILE_SECRET_KEY=<value>,ALLOWED_ORIGIN=https://fleetnetglobal.com}"
```

- [ ] **Step 4: Create the Function URL with CORS**

```bash
aws lambda create-function-url-config \
  --function-name fleetnet-contact-form \
  --auth-type NONE \
  --cors '{"AllowOrigins":["https://fleetnetglobal.com"],"AllowMethods":["POST"],"AllowHeaders":["content-type"]}'

aws lambda add-permission \
  --function-name fleetnet-contact-form \
  --statement-id FunctionURLAllowPublicAccess \
  --action lambda:InvokeFunctionUrl \
  --principal "*" \
  --function-url-auth-type NONE
```
Expected: `create-function-url-config` returns the `FunctionUrl`, e.g. `https://abc123xyz.lambda-url.us-east-1.on.aws/`. Record it — this is the value for `NEXT_PUBLIC_CONTACT_API_URL`.

- [ ] **Step 5: Smoke-test the live endpoint**

```bash
curl -i -X POST "<FUNCTION_URL>" \
  -H "Content-Type: application/json" \
  -H "Origin: https://fleetnetglobal.com" \
  -d '{"name":"Jane Doe","email":"jane@company.com","organization":"Logistics Corp","fleetSize":"11-50","focus":"Cold Chain Logistics","message":"We need a fleet management quote please.","consent":"on","fax_number":""}'
```
Expected: `200 OK`, JSON `{"success":true,...}`, `Access-Control-Allow-Origin: https://fleetnetglobal.com` header present. Since no valid Turnstile token was sent, this only confirms wiring — do a real end-to-end check from the deployed site in Task 9 once the widget can issue a token for the real origin.

- [ ] **Step 6: No commit** — this is infrastructure provisioning, not repo state.

---

### Task 8: Provision S3 + CloudFront (private bucket, OAC, CloudFront Function)

**Files:**
- Create: `infra/lambda-cloudfront-function.js`
- Create: `infra/s3-bucket-policy.json`
- Create: `infra/cloudfront-distribution-config.json`

**Interfaces:**
- Produces: an S3 bucket name and a CloudFront distribution domain (e.g. `d123abc.cloudfront.net`), consumed in Task 9 (deploy) and Task 11 (DNS).

- [ ] **Step 1: Create the private S3 bucket**

```bash
aws s3api create-bucket --bucket fleetnetglobal-site --region us-east-1
aws s3api put-public-access-block --bucket fleetnetglobal-site \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```
(If `fleetnetglobal-site` is taken — bucket names are globally unique — append a suffix, e.g. `fleetnetglobal-site-prod`, and use that name consistently in every step below.)

- [ ] **Step 2: Request the ACM certificate (us-east-1, required for CloudFront)**

```bash
aws acm request-certificate \
  --domain-name fleetnetglobal.com \
  --subject-alternative-names www.fleetnetglobal.com \
  --validation-method DNS \
  --region us-east-1
```
Expected: returns a `CertificateArn`. Run `aws acm describe-certificate --certificate-arn <ARN> --region us-east-1` to get the `ResourceRecord` (Name/Value) for each domain — add these as CNAME records at whichever DNS provider ends up hosting `fleetnetglobal.com` (decision pending). Wait for `Status: ISSUED` before continuing (`aws acm wait certificate-validated --certificate-arn <ARN> --region us-east-1`) — CloudFront creation in Step 5 needs an issued cert.

- [ ] **Step 3: Create the Origin Access Control**

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "fleetnet-site-oac",
    "OriginAccessControlOriginType": "s3",
    "SigningBehavior": "always",
    "SigningProtocol": "sigv4"
  }'
```
Expected: returns an `Id` (e.g. `E2QWRUHXXXX`) — needed in Step 5's distribution config.

- [ ] **Step 4: Write the CloudFront Function for directory-index rewriting**

```javascript
// infra/lambda-cloudfront-function.js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
```

```bash
aws cloudfront create-function \
  --name fleetnet-directory-index \
  --function-config '{"Comment":"Rewrite directory requests to index.html","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://infra/lambda-cloudfront-function.js

aws cloudfront publish-function \
  --name fleetnet-directory-index \
  --if-match "$(aws cloudfront describe-function --name fleetnet-directory-index --query 'ETag' --output text)"
```
Expected: `describe-function` after publish shows `Stage: LIVE`. Note the function's ARN (`aws cloudfront describe-function --name fleetnet-directory-index --query 'FunctionSummary.FunctionMetadata.FunctionARN'`) — needed in Step 5.

- [ ] **Step 5: Create the CloudFront distribution**

```json
// infra/cloudfront-distribution-config.json
{
  "CallerReference": "fleetnet-site-2026",
  "Aliases": { "Quantity": 2, "Items": ["fleetnetglobal.com", "www.fleetnetglobal.com"] },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "s3-fleetnet-site",
        "DomainName": "fleetnetglobal-site.s3.us-east-1.amazonaws.com",
        "OriginAccessControlId": "<OAC_ID_FROM_STEP_3>",
        "S3OriginConfig": { "OriginAccessIdentity": "" }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-fleetnet-site",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": { "Quantity": 2, "Items": ["GET", "HEAD"] },
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "FunctionAssociations": {
      "Quantity": 1,
      "Items": [
        { "EventType": "viewer-request", "FunctionARN": "<CLOUDFRONT_FUNCTION_ARN_FROM_STEP_4>" }
      ]
    }
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      { "ErrorCode": 403, "ResponseCode": "404", "ResponsePagePath": "/404.html", "ErrorCachingMinTTL": 10 }
    ]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "<ACM_CERT_ARN_FROM_STEP_2>",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Enabled": true,
  "Comment": "fleetnetglobal.com static site"
}
```
(`CachePolicyId` above is AWS's managed `CachingOptimized` policy — a fixed, account-agnostic ID, not a placeholder.) Fill in the three `<...>` values from Steps 2-4, then:

```bash
aws cloudfront create-distribution --distribution-config file://infra/cloudfront-distribution-config.json
```
Expected: returns the distribution `Id` and `DomainName` (e.g. `d123abc.cloudfront.net`). Record both.

- [ ] **Step 6: Lock the bucket to only this distribution**

```json
// infra/s3-bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fleetnetglobal-site/*",
      "Condition": {
        "StringEquals": { "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>" }
      }
    }
  ]
}
```

```bash
aws s3api put-bucket-policy --bucket fleetnetglobal-site --policy file://infra/s3-bucket-policy.json
```

- [ ] **Step 7: Commit the infra config**

```bash
git add infra/lambda-cloudfront-function.js infra/s3-bucket-policy.json infra/cloudfront-distribution-config.json
git commit -m "chore: add S3/CloudFront static hosting infra config"
```

---

### Task 9: Production build and first deploy

**Files:**
- None created — uses Task 8's bucket/distribution and Task 7's Function URL.

- [ ] **Step 1: Production build with real values**

```bash
NEXT_PUBLIC_CONTACT_API_URL="<FUNCTION_URL_FROM_TASK_7>" \
NEXT_PUBLIC_TURNSTILE_SITE_KEY="<real site key from .env>" \
npx next build
```

- [ ] **Step 2: Sync to S3**

```bash
aws s3 sync out/ s3://fleetnetglobal-site --delete
```
Expected: uploads every file in `/out`; `--delete` removes anything in the bucket no longer present in the export (safe here since the bucket is dedicated to this site's export output).

- [ ] **Step 3: Invalidate the CloudFront cache**

```bash
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

- [ ] **Step 4: Verify via the CloudFront domain**

Open `https://<DISTRIBUTION_DOMAIN>/` (e.g. `https://d123abc.cloudfront.net/`) in a browser. Confirm the homepage loads, navigate to `/about/`, `/contact/`, submit the contact form for real, and confirm the Turnstile widget renders and a real email arrives at `info@voltmotive.lk`.

- [ ] **Step 5: No commit** — deployment action, not a repo change.

---

### Task 10: GitHub Actions CI/CD with OIDC (no long-lived AWS keys)

**Files:**
- Create: `infra/github-oidc-trust-policy.json`
- Create: `infra/github-deploy-permissions-policy.json`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: S3 bucket name and CloudFront distribution ID (Task 8).
- Produces: automatic deploy on push to `master`.

- [ ] **Step 1: Register GitHub as an OIDC identity provider (skip if already registered on this AWS account)**

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea
```

- [ ] **Step 2: Create the deploy role scoped to this one repo**

```json
// infra/github-oidc-trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
        "StringLike": { "token.actions.githubusercontent.com:sub": "repo:chehansivarubanvega/fleetnet_site:ref:refs/heads/master" }
      }
    }
  ]
}
```

```json
// infra/github-deploy-permissions-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::fleetnetglobal-site", "arn:aws:s3:::fleetnetglobal-site/*"]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name fleetnet-github-deploy \
  --assume-role-policy-document file://infra/github-oidc-trust-policy.json

aws iam put-role-policy \
  --role-name fleetnet-github-deploy \
  --policy-name fleetnet-deploy-permissions \
  --policy-document file://infra/github-deploy-permissions-policy.json
```
Expected: returns the role ARN — needed as a repo variable in Step 3.

- [ ] **Step 3: Add repo secrets/variables (GitHub UI: Settings → Secrets and variables → Actions)**

- Secret `AWS_DEPLOY_ROLE_ARN` = the role ARN from Step 2
- Secret `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = the real site key
- Secret `NEXT_PUBLIC_CONTACT_API_URL` = the Function URL from Task 7
- Variable `S3_BUCKET` = `fleetnetglobal-site`
- Variable `CLOUDFRONT_DISTRIBUTION_ID` = the distribution ID from Task 8

- [ ] **Step 4: Write the workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy static site

on:
  push:
    branches: [master]

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - run: npx next build
        env:
          NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${{ secrets.NEXT_PUBLIC_TURNSTILE_SITE_KEY }}
          NEXT_PUBLIC_CONTACT_API_URL: ${{ secrets.NEXT_PUBLIC_CONTACT_API_URL }}

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: us-east-1

      - run: aws s3 sync out/ s3://${{ vars.S3_BUCKET }} --delete

      - run: aws cloudfront create-invalidation --distribution-id ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

- [ ] **Step 5: Verify end-to-end**

Push this commit to `master` (or open/merge a PR into it) and watch the run in the GitHub Actions tab. Expected: green run, then the live CloudFront URL reflects the change within a minute or two.

- [ ] **Step 6: Commit**

```bash
git add infra/github-oidc-trust-policy.json infra/github-deploy-permissions-policy.json .github/workflows/deploy.yml
git commit -m "ci: add OIDC-authenticated GitHub Actions deploy to S3/CloudFront"
```

---

### Task 11: DNS cutover

**Files:**
- None — external DNS provider configuration, not repo state.

- [ ] **Step 1: Add the domain records**

At whichever provider ends up hosting `fleetnetglobal.com`'s DNS (decision pending — if it becomes Route53, use an ALIAS/A record straight to the CloudFront distribution; anywhere else, use a CNAME):
- `fleetnetglobal.com` → `<DISTRIBUTION_DOMAIN>` (apex records need either the provider's ALIAS/ANAME feature or, on Route53, an ALIAS A record — plain CNAME is not valid at the zone apex)
- `www.fleetnetglobal.com` → `<DISTRIBUTION_DOMAIN>` (CNAME)

- [ ] **Step 2: Wait for propagation and verify HTTPS**

```bash
dig fleetnetglobal.com +short
curl -I https://fleetnetglobal.com/
```
Expected: resolves to CloudFront's IPs, `200 OK` (or `308` given `trailingSlash: true` redirect behavior on the root, which is fine), valid TLS cert matching the domain.

- [ ] **Step 3: Full functional pass on the live domain**

Visit every page (`/`, `/about/`, `/smart-operations/`, `/industries/`, `/privacy-policy/`, `/contact/`), submit the contact form for real, confirm the email arrives, and check `robots.txt`/`sitemap.xml` resolve correctly against the new domain.

- [ ] **Step 4: No commit** — DNS is external state.

---

## Self-Review Notes

- **Spec coverage:** contact form (Tasks 1-2, 7), static export (Task 3), local submission log removal (Task 4), build verification (Task 5), AWS bootstrap (Task 6), hosting infra (Task 8), deploy + smoke test (Task 9), CI/CD (Task 10), DNS (Task 11) — every blocker identified in the analysis has a corresponding task.
- **Cost:** at low traffic this lands in the $1-5/month range (S3 storage of a few MB + CloudFront requests) plus Lambda/CloudFront Function usage that stays within AWS's perpetual free tiers for a marketing-site volume of traffic.
- **Out of scope, flagged but not actioned:** the unused `@google/genai` dependency in `package.json` (leftover from the AI Studio scaffold) — safe to remove later, doesn't block hosting, left out of this plan since it's unrelated cleanup.
