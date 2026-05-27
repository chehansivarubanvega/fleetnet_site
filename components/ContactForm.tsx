'use client';

import { ActionResponse, submitContactForm } from '@/app/contact/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, Compass, Globe, Mail, MapPin, Phone, Server, ShieldCheck, Users } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResponse | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    fleetSize: '1-10',
    focus: 'Logistics & Freight',
    message: '',
    consent: false,
    fax_number: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('organization', formData.organization);
    data.append('fleetSize', formData.fleetSize);
    data.append('focus', formData.focus);
    data.append('message', formData.message);
    data.append('fax_number', formData.fax_number);
    if (formData.consent) {
      data.append('consent', 'on');
    }

    startTransition(async () => {
      const response = await submitContactForm(null, data);
      setState(response);
      if (response.success) {
        // Keep name and email, reset form fields
        setFormData((prev) => ({
          ...prev,
          message: '',
          consent: false,
          fax_number: '',
        }));
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  return (
    <section className="relative z-20 py-20 lg:py-28 bg-[#050505] overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-1/4 w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[60vw] h-[60vw] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Title */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs md:text-sm mb-4 block flex items-center gap-3">
            <Globe className="w-4 h-4 text-primary animate-pulse" /> Secure Connection Layer
          </span>
          <h2 className="text-4xl xs:text-5xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tighter text-white">
            CONNECT WITH <br />
            <span className="text-white/20">OPERATIONS DESK.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-white/50 font-medium max-w-xl leading-relaxed">
            We adapt our intelligence architectures to match your specific fleet topology. Speak with a systems integration engineer.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-4 block">FleetNET Hubs & Contact Channels</p>
            
            {/* Command HQ Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none transition-colors group-hover:bg-primary/10" />
              <div className="flex gap-6 items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Global Command HQ</h4>
                  <p className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">Trace Expert City, Tripoli Square</p>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">
                    Bay 1-5, Colombo 10, Sri Lanka
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Trace+Expert+City+Colombo" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-black uppercase tracking-wider mt-4 hover:underline"
                  >
                    Launch Grid Map <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Direct Line Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="flex gap-6 items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Direct Audio Link</h4>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">+94 (77) 0576272</p>
                  <p className="text-sm text-white/50 font-medium">Mon - Fri • 08:00 - 18:00 (UTC+5:30)</p>
                  <a 
                    href="tel:+94770576272" 
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-black uppercase tracking-wider mt-4 hover:underline"
                  >
                    Initialize Dialing Sequence <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Official Mail Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 backdrop-blur-md hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="flex gap-6 items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Secure Electronic Mail</h4>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">info@fleetnetglobal.com</p>
                  <p className="text-sm text-white/50 font-medium">Encrypted secure transmission channels active.</p>
                  <a 
                    href="mailto:info@fleetnetglobal.com" 
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-black uppercase tracking-wider mt-4 hover:underline"
                  >
                    Open Mail Interface <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Platform Integrity Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] text-xs font-black uppercase tracking-[0.2em] text-emerald-400/80"
            >
              <Server className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              <span>Operational Systems Active & Secure</span>
            </motion.div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-red-500/5 blur-[30px] rounded-[2.5rem] opacity-30 pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.01] p-8 md:p-10 backdrop-blur-xl z-10 overflow-hidden"
            >
              {/* Form scanning line effect during pending */}
              {isPending && (
                <div className="absolute inset-x-0 top-0 h-1 bg-primary/80 blur-[2px] shadow-[0_0_10px_var(--color-primary)] animate-scan z-20" />
              )}

              {/* Conditional Form or Success Screen */}
              <AnimatePresence mode="wait">
                {state?.success ? (
                  <motion.div 
                    key="success-screen"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center py-6 sm:py-8 font-[family-name:var(--font-outfit)]"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="w-10 h-10 stroke-[1.5] animate-pulse" />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight uppercase">
                      Transmission Confirmed
                    </h3>
                    
                    <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mx-auto mb-6" />
                    
                    <p className="text-white/50 text-[14px] sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-medium">
                      Operational diagnostic payload received. The electronic mail notification has been securely dispatched to our operations division at <span className="text-primary font-bold">info@fleetnetglobal.com</span>. We have registered your ingress session.
                    </p>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left max-w-md mx-auto mb-8">
                      <div className="flex justify-between items-center text-xs uppercase tracking-wider text-white/30 font-bold mb-4 pb-3 border-b border-white/5">
                        <span>Telemetry Session Logs</span>
                        <span className="text-emerald-400 font-black animate-pulse flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                        </span>
                      </div>
                      <div className="space-y-3 text-xs sm:text-sm font-semibold">
                        <div className="flex justify-between">
                          <span className="text-white/30">Signee Name:</span>
                          <span className="text-white/80">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/30">Corporate Email:</span>
                          <span className="text-white/80">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/30">Organization:</span>
                          <span className="text-white/80">{formData.organization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/30">Operational Focus:</span>
                          <span className="text-emerald-400 font-bold">{formData.focus}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setState(null);
                        setFormData({
                          name: '',
                          email: '',
                          organization: '',
                          fleetSize: '1-10',
                          focus: 'Logistics & Freight',
                          message: '',
                          consent: false,
                          fax_number: '',
                        });
                      }}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white/80 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      Transmit New Diagnostic Payload
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Server Action Alert Feedback */}
                    {state && (
                      <div 
                        className="p-5 rounded-2xl mb-8 flex gap-4 items-start border leading-relaxed text-sm font-medium bg-red-500/[0.02] border-red-500/20 text-red-400"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <p className="font-bold uppercase tracking-wider text-[11px] mb-1">
                            Transmission Protocol Halted
                          </p>
                          <p>{state.message}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Honeypot field to block simple spam bots (Layer 1) */}
                      <div className="absolute -top-[9999px] -left-[9999px] h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                        <input 
                          type="text" 
                          name="fax_number" 
                          tabIndex={-1} 
                          autoComplete="off" 
                          value={formData.fax_number}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Name field */}
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                          Authorized Signee Name
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Jane Doe"
                            disabled={isPending}
                            className={`w-full px-5 py-4 bg-white/[0.02] border rounded-2xl text-white font-medium placeholder-white/20 transition-all duration-300 outline-none ${
                              state?.errors?.name 
                                ? 'border-red-500/40 focus:border-red-500' 
                                : 'border-white/10 focus:border-primary/50 focus:bg-white/[0.03]'
                            }`}
                          />
                        </div>
                        {state?.errors?.name && (
                          <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {state.errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email and Organization Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                            Corporate Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="jane@company.com"
                            disabled={isPending}
                            className={`w-full px-5 py-4 bg-white/[0.02] border rounded-2xl text-white font-medium placeholder-white/20 transition-all duration-300 outline-none ${
                              state?.errors?.email 
                                ? 'border-red-500/40 focus:border-red-500' 
                                : 'border-white/10 focus:border-primary/50 focus:bg-white/[0.03]'
                            }`}
                          />
                          {state?.errors?.email && (
                            <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {state.errors.email}
                            </p>
                          )}
                        </div>

                        {/* Organization */}
                        <div>
                          <label htmlFor="organization" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                            Organization / Entity
                          </label>
                          <div className="relative">
                            <input 
                              type="text" 
                              id="organization"
                              name="organization"
                              required
                              value={formData.organization}
                              onChange={handleInputChange}
                              placeholder="Logistics Corp"
                              disabled={isPending}
                              className={`w-full px-5 py-4 bg-white/[0.02] border rounded-2xl text-white font-medium placeholder-white/20 transition-all duration-300 outline-none ${
                                state?.errors?.organization 
                                  ? 'border-red-500/40 focus:border-red-500' 
                                  : 'border-white/10 focus:border-primary/50 focus:bg-white/[0.03]'
                              }`}
                            />
                          </div>
                          {state?.errors?.organization && (
                            <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" /> {state.errors.organization}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* Fleet Size and Operational Focus Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Fleet Size */}
                        <div>
                          <label htmlFor="fleetSize" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                            Approximate Fleet Size
                          </label>
                          <div className="relative">
                            <select 
                              id="fleetSize"
                              name="fleetSize"
                              value={formData.fleetSize}
                              onChange={handleInputChange}
                              disabled={isPending}
                              className="w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-2xl text-white font-medium transition-all duration-300 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                            >
                              <option value="1-10">1 - 10 vehicles</option>
                              <option value="11-50">11 - 50 vehicles</option>
                              <option value="51-200">51 - 200 vehicles</option>
                              <option value="200+">200+ vehicles</option>
                              <option value="N/A">Not Applicable / Other</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                              <Users className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* Focus */}
                        <div>
                          <label htmlFor="focus" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                            Operational Focus
                          </label>
                          <div className="relative">
                            <select 
                              id="focus"
                              name="focus"
                              value={formData.focus}
                              onChange={handleInputChange}
                              disabled={isPending}
                              className="w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-2xl text-white font-medium transition-all duration-300 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                            >
                              <option value="Logistics & Freight">Logistics & Freight</option>
                              <option value="Cold Chain Logistics">Cold Chain Logistics</option>
                              <option value="Public Transport">Public Transport</option>
                              <option value="Construction Fleets">Construction Fleets</option>
                              <option value="API / Custom Integrations">API / Custom Integrations</option>
                              <option value="Other Operations">Other Operations</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                              <Compass className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2.5">
                          Operational Requirements / Specifications
                        </label>
                        <textarea 
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Provide details on your fleet specifications, integration requirements, or support needs..."
                          disabled={isPending}
                          className={`w-full px-5 py-4 bg-white/[0.02] border rounded-2xl text-white font-medium placeholder-white/20 transition-all duration-300 outline-none resize-none ${
                            state?.errors?.message 
                              ? 'border-red-500/40 focus:border-red-500' 
                              : 'border-white/10 focus:border-primary/50 focus:bg-white/[0.03]'
                          }`}
                        />
                        {state?.errors?.message && (
                          <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {state.errors.message}
                          </p>
                        )}
                      </div>

                      {/* Consent Checkbox */}
                      <div>
                        <label className="flex items-start gap-4 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            name="consent"
                            checked={formData.consent}
                            onChange={handleCheckboxChange}
                            disabled={isPending}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 mt-0.5 rounded border border-white/15 bg-white/[0.02] flex items-center justify-center text-primary shrink-0 peer-checked:border-primary peer-checked:bg-primary/10 transition-all">
                            <Check className="w-3.5 h-3.5 scale-0 peer-checked:scale-100 transition-transform stroke-[3]" />
                          </div>
                          <span className="text-[13px] text-white/40 font-medium leading-relaxed">
                            I authorize the transmission of this operational diagnostic payload to FleetNET for evaluation under strict security parameters.
                          </span>
                        </label>
                        {state?.errors?.consent && (
                          <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" /> {state.errors.consent}
                          </p>
                        )}
                      </div>

                      {/* Cloudflare Turnstile Widget (Layer 2) */}
                      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                        <div 
                          className="cf-turnstile flex justify-center mb-2" 
                          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                          data-theme="dark"
                        />
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:scale-[1.02] hover:bg-primary hover:text-white active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.06)] overflow-hidden cursor-pointer"
                      >
                        {isPending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Transmitting Payload...
                          </>
                        ) : (
                          <>
                            Transmit Inquiry
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
