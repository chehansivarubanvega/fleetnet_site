'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Eye, 
  Lock, 
  Trash2, 
  HelpCircle, 
  Mail, 
  Phone, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

const SECTIONS: Section[] = [
  { id: 'introduction', title: '1. Introduction', icon: FileText },
  { id: 'data-collection', title: '2. Information We Collect', icon: Eye },
  { id: 'location-tracking', title: '3. Location Tracking', icon: MapPin },
  { id: 'data-usage', title: '4. How We Use Your Data', icon: CheckCircle2 },
  { id: 'data-sharing', title: '5. Sharing & Third Parties', icon: Shield },
  { id: 'data-security', title: '6. Data Security', icon: Lock },
  { id: 'retention-deletion', title: '7. Retention & Deletion', icon: Trash2 },
  { id: 'legal-rights', title: '8. Your Legal Rights', icon: HelpCircle },
  { id: 'contact-us', title: '9. Contact Us', icon: Mail },
];

export default function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState('introduction');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for headers

      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -120; // Extra offset to account for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#020202] text-white pt-32 pb-24 font-[family-name:var(--font-outfit)]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-orange-400 mb-6"
          >
            <Shield className="w-3.5 h-3.5" />
            Compliance Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-none"
          >
            PRIVACY <span className="text-orange-500">POLICY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg sm:text-xl font-medium"
          >
            Last Updated: July 3, 2026. This policy outlines how FleetNET GLOBAL collects, uses, and safeguards information across our platforms and mobile applications.
          </motion.p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-8 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 bg-white/[0.01] border border-white/5 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-6 pl-2">Navigation Index</h3>
            <nav className="space-y-1">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                      isActive 
                        ? 'bg-orange-500/10 text-orange-400 border-l-2 border-orange-500' 
                        : 'hover:bg-white/5 text-white/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-orange-400' : 'text-white/30 group-hover:text-white/60'}`} />
                      <span className="text-sm font-semibold tracking-wide">{section.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Policy Text Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Introduction */}
            <section 
              id="introduction" 
              ref={(el) => { sectionRefs.current['introduction'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">1. Introduction</h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed font-medium">
                <p>
                  Welcome to FleetNET GLOBAL (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the FleetNET Enterprise Platform and the associated FleetNET mobile applications (including &quot;FleetNET Mobile&quot; and &quot;FleetNET Driver&quot;) to provide comprehensive real-time fleet operations, asset tracking, driver dispatch, and performance analytics.
                </p>
                <p>
                  This Privacy Policy describes how we collect, store, process, and disclose information from operators, company administrators, and drivers (&quot;Users&quot;, &quot;you&quot;) when utilizing our software platforms, mobile applications, and IoT tracking devices.
                </p>
                <p>
                  By registering an account, installing our applications, or using the FleetNET services, you acknowledge that you have read and understood the practices detailed in this policy.
                </p>
              </div>
            </section>

            {/* Section 2: Data Collection */}
            <section 
              id="data-collection" 
              ref={(el) => { sectionRefs.current['data-collection'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">2. Information We Collect</h2>
              </div>
              <div className="space-y-6 text-white/60 leading-relaxed font-medium">
                <p>To provide a functional and reliable fleet management service, we collect several categories of information:</p>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">■</span>
                    <div>
                      <strong className="text-white">Account Information:</strong> Name, work email address, mobile phone number, driver credentials, employee ID, and associated company name when your employer creates your fleet profile.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">■</span>
                    <div>
                      <strong className="text-white">Telemetry &amp; Driver Behavior Data:</strong> Real-time operational speed, harsh acceleration, harsh braking, cornering speed, route history, and engine diagnostics metrics.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">■</span>
                    <div>
                      <strong className="text-white">Device Information:</strong> Device brand, model, operating system version, screen resolution, connection status, unique device identifiers, and IP addresses.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">■</span>
                    <div>
                      <strong className="text-white">Device Access Permissions:</strong> Camera access is requested to capture and upload vehicle damage reports, fuel receipts, or proof-of-delivery documents.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Foreground Location Tracking (DISCLOSURE FOR PLAY STORE) */}
            <section 
              id="location-tracking" 
              ref={(el) => { sectionRefs.current['location-tracking'] = el; }} 
              className="relative overflow-hidden border border-orange-500/20 bg-orange-600/[0.02] rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              {/* Highlight background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/40">
                  <MapPin className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">3. Prominent Disclosure: Foreground Location Tracking</h2>
              </div>
              
              <div className="space-y-6 leading-relaxed">
                <div className="flex gap-4 items-start bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 mb-4 text-orange-200 font-semibold text-sm">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p>
                    Important for Google Play Store Policy compliance: This application collects precise location data to enable real-time fleet coordination, job dispatch, and driver navigation mapping.
                  </p>
                </div>
                
                <p className="text-white/80 font-bold text-base">
                  When and how we access location:
                </p>
                
                <ul className="space-y-4 list-none pl-0 text-white/60 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">✓</span>
                    <div>
                      <strong className="text-white">Foreground Location Access:</strong> FleetNET collects location data <span className="text-orange-400 font-bold">only when the application is actively running in the foreground (open on screen)</span>. We do NOT access, track, or record your location data in the background when the app is closed, minimized, or not in use.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">✓</span>
                    <div>
                      <strong className="text-white">Core Functional Purpose:</strong> Location tracking is used to display your current position on real-time transit maps, calculate route distance, and provide automated check-ins and accurate arrival estimates (ETA) to your fleet operators.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">✓</span>
                    <div>
                      <strong className="text-white">User Control:</strong> Location tracking is only active when you are logged into the app and marked as &quot;On-Shift&quot;. You can stop location tracking at any time by changing your status to &quot;Off-Shift&quot;, closing the application, or logging out.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Data Usage */}
            <section 
              id="data-usage" 
              ref={(el) => { sectionRefs.current['data-usage'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">4. How We Use Your Data</h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed font-medium">
                <p>We process the collected data for the following legitimate purposes:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>Rendering real-time location and navigation maps.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>Calculating driving metrics, safety behavior profiles, and compliance scoring.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>Handling system alerts (e.g., geo-fencing breach, accident impact detection).</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>Delivering driver support and debugging technical errors via crash reports.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>Facilitating job notifications and communication between operators and drivers.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5: Sharing & Third Parties */}
            <section 
              id="data-sharing" 
              ref={(el) => { sectionRefs.current['data-sharing'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">5. Sharing &amp; Third Parties</h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed font-medium">
                <p>
                  We prioritize user privacy. We will never sell, lease, or trade personal data to commercial advertising brokers. Data sharing is limited to:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">▪</span>
                    <div>
                      <strong className="text-white">Your Employer:</strong> All location logs, telemetry, and driver behavior reports are shared directly with the company administrator managing your fleet account.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">▪</span>
                    <div>
                      <strong className="text-white">Service Providers:</strong> Cloud infrastructure host (Amazon Web Services), authentication services, and analytics/crash reporting systems (Firebase SDK, Google Play Services).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-1">▪</span>
                    <div>
                      <strong className="text-white">Legal Obligations:</strong> In response to valid legal requests, subpoenas, or to ensure the safety and security of our platform.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6: Data Security */}
            <section 
              id="data-security" 
              ref={(el) => { sectionRefs.current['data-security'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">6. Data Security</h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed font-medium">
                <p>
                  FleetNET employs robust, industry-standard cybersecurity measures to shield data from unauthorized access, loss, or disclosure.
                </p>
                <p>
                  This includes end-to-end TLS 1.3 encryption for data in transit, AES-256 encryption at rest, secure API authentication keys, and isolated database schemas. We regularly monitor our endpoints and conduct vulnerability scans to uphold secure operations.
                </p>
              </div>
            </section>

            {/* Section 7: Data Retention & Deletion (IMPORTANT FOR PLAY STORE) */}
            <section 
              id="retention-deletion" 
              ref={(el) => { sectionRefs.current['retention-deletion'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">7. Data Retention &amp; Deletion</h2>
              </div>
              <div className="space-y-6 text-white/60 leading-relaxed font-medium">
                <p>
                  We retain information for as long as your driver account remains active or as required by your employer to maintain fleet operational history.
                </p>
                
                {/* Visual Deletion Box */}
                <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3">How to Delete Your Account and Data:</h4>
                  <p className="mb-4">
                    In compliance with global data protection laws and App Store/Google Play requirements, we provide a simple process to request deletion of your account and personal history:
                  </p>
                  <ul className="space-y-3 list-none pl-0 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>Navigate to the &quot;Account Settings&quot; menu within the FleetNET Mobile App.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>Tap the &quot;Request Account Deletion&quot; button and confirm.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>Alternatively, email us directly at <a href="mailto:info@fleetnetglobal.com" className="text-orange-400 hover:underline">info@fleetnetglobal.com</a> with the subject &quot;Account Deletion Request.&quot;</span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/40">
                    Once a deletion request is verified, we will remove or irreversibly anonymize all personal identification records from our operational databases within 30 days, except where legal, safety, or tax compliance dictates retention.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Legal Rights */}
            <section 
              id="legal-rights" 
              ref={(el) => { sectionRefs.current['legal-rights'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">8. Your Legal Rights</h2>
              </div>
              <div className="space-y-4 text-white/60 leading-relaxed font-medium">
                <p>Depending on your jurisdiction (e.g., GDPR, CCPA, or local telemetry laws), you may have the following rights:</p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>The right to request access to the data we store about you.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>The right to request corrections or updates to inaccurate profile records.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>The right to request data porting, or restricted processing.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>The right to lodge complaints with local data protection watchdogs.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 9: Contact Us */}
            <section 
              id="contact-us" 
              ref={(el) => { sectionRefs.current['contact-us'] = el; }} 
              className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">9. Contact Us</h2>
              </div>
              <div className="space-y-6 text-white/60 leading-relaxed font-medium">
                <p>
                  For any privacy inquiries, data subject access requests, or deletion queries, please contact our Compliance Officer at:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40">Email</p>
                      <a href="mailto:info@fleetnetglobal.com" className="text-white font-semibold hover:underline">info@fleetnetglobal.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40">Phone</p>
                      <span className="text-white font-semibold">+94 (77) 0576272</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mt-4">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Corporate Address</p>
                  <p className="text-white font-semibold leading-relaxed">
                    FleetNET GLOBAL Compliance Dept.<br />
                    Bay 1-5, Trace Expert City, Tripoli Square,<br />
                    Colombo 10, Sri Lanka.
                  </p>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </section>
  );
}
