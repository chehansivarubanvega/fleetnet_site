'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <div className="relative h-14 w-56">
                <Image
                  src="/images/Fleetnetlogo_lite.png"
                  alt="FleetNET GLOBAL Logo"
                  fill
                  className="object-contain object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              The world&apos;s most advanced fleet management operations platform. Empowering organizations with real-time visibility and intelligent control.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Logistics & Transport</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Public Transit</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Construction Fleets</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Electric Vehicles</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cold Chain Logistics</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-lg font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Live Tracking</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Driver Performance</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Maintenance Planning</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Fuel Analytics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Fleet Way, Tech City, <br />Global Operations Center</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@fleetnet.global</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 FleetNET GLOBAL. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
