"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Partnership", href: "#partnership" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
      
        <Link href="/" className="relative z-[110]">
          <div className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors duration-300 ${
            scrolled ? "text-slate-800" : "text-slate-900"
          }`}>
            YOUR<span className="text-blue-600">SUB</span>
          </div>
        </Link>

      
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wide transition-all hover:text-blue-600 ${
                scrolled ? "text-slate-600" : "text-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link href="/register">
            <button className="relative overflow-hidden px-8 py-3 font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 group active:scale-95 transition-transform">
              <span className="relative z-10">Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </button>
          </Link>
        </div>

      
        <button 
          className="md:hidden relative z-[110] p-2 text-slate-800" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

       
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-white transition-all duration-500 ease-in-out z-[100] flex flex-col items-center justify-center space-y-8 md:hidden ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-3xl font-black text-slate-800 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/register" onClick={() => setOpen(false)} className="w-full px-12">
            <button className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold text-xl shadow-xl shadow-blue-100">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;