"use client";
import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
          
            <div className="lg:col-span-2 space-y-6">
              <div className="text-3xl font-black tracking-tighter text-slate-900">
                YOUR<span className="text-blue-600">SUB</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                Your one-step platform for all bill payments. 
                Trusted, fast, and secure digital utility services across Nigeria.
              </p>
            </div>

      
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-slate-900">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">About Us</Link></li>
                <li><Link href="#services" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Services</Link></li>
                <li><Link href="#faq" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Help Support</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-slate-900">Partnership</h4>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Become a Partner</Link></li>
                <li><Link href="/api" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">API Documentation</Link></li>
                <li><Link href="/privacy" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-medium">
              © {currentYear} YourSub. All Rights Reserved.
            </p>
            <div className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
              Fast • Secure • Reliable
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

export default Footer;