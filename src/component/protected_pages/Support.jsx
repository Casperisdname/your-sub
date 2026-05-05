"use client";
import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  HelpCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-16 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/profile"
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Us</h1>
          <p className="text-slate-500">Stay in touch with us</p>
        </div>
      </div>

      <div className="bg-blue-100 rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        <SupportItem
          href="/dashboard/support/faq"
          icon={<HelpCircle size={22} className="text-blue-600" />}
          label="Frequently Asked Questions"
          sub="Find quick answers"
        />

        <SupportItem
          href="mailto:support@yoursub.com"
          icon={<AlertCircle size={22} className="text-red-500" />}
          label="Report an Issue"
          sub="Email our technical team"
        />

        <SupportItem
          href="tel:08073738272"
          icon={<Phone size={22} className="text-green-600" />}
          label="Call Us"
          sub="08073738272"
        />

        <SupportItem
          href="https://wa.me/2348073738272"
          icon={<MessageCircle size={22} className="text-emerald-500" />}
          label="WhatsApp"
          sub="Chat with an agent"
        />
      </div>

      <div>
        <h2 className="text-sm uppercase font-bold text-slate-400 tracking-widest mb-4 ml-2">
          Social Communities
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            icon={<FaFacebook />}
            label="Facebook"
            href="#"
            color="text-blue-600"
          />
          <SocialButton
            icon={<FaInstagram size={20} />}
            label="Instagram"
            href="#"
            color="text-pink-600"
          />
          <SocialButton
            icon={<FaTwitter size={20} />}
            label="Twitter"
            href="#"
            color="text-sky-500"
          />
          <SocialButton
            icon={<Send size={20} />}
            label="Telegram"
            href="#"
            color="text-blue-400"
          />
        </div>
      </div>
    </div>
  );
}

function SupportItem({ icon, label, sub, href }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-900">{label}</p>
          <p className="text-sm text-slate-500">{sub}</p>
        </div>
      </div>
      <span className="text-slate-300 group-hover:text-blue-600 transition-all font-bold">
        →
      </span>
    </a>
  );
}

function SocialButton({ icon, label, href, color }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <span className={color}>{icon}</span>
      <span className="font-bold text-slate-700 text-sm">{label}</span>
    </a>
  );
}
