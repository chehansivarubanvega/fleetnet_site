'use server';

import fs from 'fs/promises';
import path from 'path';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  fleetSize: string;
  focus: string;
  message: string;
  timestamp: string;
}

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

const SUBMISSIONS_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contact_submissions.json');

export async function submitContactForm(prevState: any, formData: FormData): Promise<ActionResponse> {
  // Simulate network delay to show off beautiful loaders
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const organization = formData.get('organization') as string;
  const fleetSize = formData.get('fleetSize') as string;
  const focus = formData.get('focus') as string;
  const message = formData.get('message') as string;
  const consent = formData.get('consent') === 'on';

  // Server-side validation
  const errors: ActionResponse['errors'] = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!organization || organization.trim().length < 2) {
    errors.organization = 'Organization name must be at least 2 characters.';
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  if (!consent) {
    errors.consent = 'You must authorize data transmission to proceed.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Validation failed. Please correct the errors in the form.',
      errors,
    };
  }

  try {
    // Ensure the data directory exists
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });

    // Read existing submissions or initialize an empty array
    let submissions: ContactSubmission[] = [];
    try {
      const fileData = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
      submissions = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or is invalid, start fresh
      submissions = [];
    }

    // Add new submission
    const newSubmission: ContactSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization.trim(),
      fleetSize,
      focus,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    // Save back to JSON file
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

    // Trigger Resend REST API Email Send (Zero-Package HTTP Fetch)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Operational Telemetry Received</title>
              <style>
                body {
                  background-color: #020617;
                  color: #ffffff;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 0;
                  padding: 40px 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #090d16;
                  border: 1px solid rgba(255,255,255,0.08);
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                .header {
                  background: linear-gradient(135deg, #1e1b4b, #0f172a);
                  padding: 30px;
                  border-bottom: 2px solid #fb8e17;
                  text-align: center;
                }
                .logo-text {
                  font-size: 20px;
                  font-weight: 900;
                  letter-spacing: 4px;
                  color: #ffffff;
                  margin: 0 0 10px 0;
                  text-transform: uppercase;
                }
                .tagline {
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  color: #fb8e17;
                  font-weight: 800;
                  margin: 0;
                }
                .content {
                  padding: 35px 30px;
                }
                h2 {
                  font-size: 20px;
                  font-weight: 800;
                  margin-top: 0;
                  margin-bottom: 25px;
                  letter-spacing: -0.5px;
                  color: #ffffff;
                }
                .grid-item {
                  margin-bottom: 20px;
                  border-bottom: 1px solid rgba(255,255,255,0.05);
                  padding-bottom: 15px;
                }
                .grid-item:last-child {
                  border-bottom: none;
                  margin-bottom: 0;
                  padding-bottom: 0;
                }
                .label {
                  font-size: 10px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 1.5px;
                  color: rgba(255,255,255,0.4);
                  margin-bottom: 6px;
                }
                .value {
                  font-size: 15px;
                  color: #ffffff;
                  font-weight: 500;
                }
                .value-highlight {
                  color: #fb8e17;
                  font-weight: 700;
                }
                .message-box {
                  background-color: rgba(255,255,255,0.02);
                  border: 1px solid rgba(255,255,255,0.05);
                  padding: 20px;
                  border-radius: 12px;
                  margin-top: 25px;
                }
                .footer {
                  background-color: #030712;
                  padding: 20px;
                  text-align: center;
                  font-size: 11px;
                  color: rgba(255,255,255,0.3);
                  border-top: 1px solid rgba(255,255,255,0.05);
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo-text">FleetNET GLOBAL</div>
                  <div class="tagline">Secure Operational Ingress Channel</div>
                </div>
                <div class="content">
                  <h2>Operational Diagnostic Payload Received</h2>
                  
                  <div class="grid-item">
                    <div class="label">AUTHORIZED SIGNEE</div>
                    <div class="value">${newSubmission.name}</div>
                  </div>
                  
                  <div class="grid-item">
                    <div class="label">CORPORATE EMAIL</div>
                    <div class="value"><a href="mailto:${newSubmission.email}" style="color: #fb8e17; text-decoration: none;">${newSubmission.email}</a></div>
                  </div>
                  
                  <div class="grid-item">
                    <div class="label">ORGANIZATION / ENTITY</div>
                    <div class="value">${newSubmission.organization}</div>
                  </div>
                  
                  <div class="grid-item">
                    <div class="label">FLEET SIZE</div>
                    <div class="value">${newSubmission.fleetSize} vehicles</div>
                  </div>
                  
                  <div class="grid-item">
                    <div class="label">OPERATIONAL FOCUS</div>
                    <div class="value-highlight">${newSubmission.focus}</div>
                  </div>

                  <div class="grid-item">
                    <div class="label">TRANSMISSION TIMESTAMP</div>
                    <div class="value">${newSubmission.timestamp}</div>
                  </div>
                  
                  <div class="message-box">
                    <div class="label">SPECIFIED REQUIREMENTS</div>
                    <div class="value" style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85);">${newSubmission.message}</div>
                  </div>
                </div>
                <div class="footer">
                  This transmission was securely logged under ID #${newSubmission.id}.<br>
                  &copy; ${new Date().getFullYear()} FleetNET GLOBAL. All rights reserved.
                </div>
              </div>
            </body>
          </html>
        `;

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'FleetNET Operations <onboarding@resend.dev>',
            to: 'info@voltmotive.lk',
            subject: `[TELEMETRY INGRESS] Inbound Operational Request from ${newSubmission.name} (${newSubmission.organization})`,
            html: emailHtml
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('Resend REST API transmission failed:', errText);
        }
      } catch (emailErr) {
        console.error('Failed to trigger email notification:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY environment variable is not defined.');
    }

    return {
      success: true,
      message: 'Secure data transmission successful. Our operations team has been notified.',
    };
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return {
      success: false,
      message: 'A secure backend storage error occurred. Please try again later.',
    };
  }
}
