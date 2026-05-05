"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";
import { ChevronDown } from "lucide-react";

const faqData = [
  { question: "How Do I Buy Airtime?", answer: "First create an account and login. After login, click fund wallet from the dashboard menu. Fund your wallet with your preferred option. After funding, click on buy airtime, select your network, enter the phone number, and the amount. Click 'Buy Now' and it's processed in seconds." },
  { question: "How Do I Buy Data?", answer: "Log into your dashboard, ensure your wallet is funded, and select the 'Buy Data' option. Choose your network provider and the specific data plan that suits your needs. Confirm the phone number and click purchase." },
  { question: "How Do I Check My Data Balance?", answer: "For MTN, dial *323#. For Airtel, dial *323# For Glo, dial *323#. Most plans also display balance status directly in your YourSub dashboard history." },
  { question: "Is The Data Plan Compatible With All Devices?", answer: "Yes! Our data plans work perfectly on all Android devices, iPhones, Tablets, Modems, and WiFi/MiFi routers." }
];

function Stay() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
   
    <section id="faq" className="relative py-12 bg-slate-100 overflow-hidden">
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 pb-20">
          
          <div className="lg:w-1/3 text-left">
            <div className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">
              Stay Connected
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              Frequently Asked <br /> Questions.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Everything you need to know about getting started.
            </p>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className={`group border rounded-2xl transition-all duration-300 ${
                  openIndex === index 
                  ? "border-blue-200 bg-white shadow-md" 
                  : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-lg ${openIndex === index ? "text-blue-600" : "text-slate-800"}`}>
                    {index + 1}. {item.question}
                  </span>
                  <ChevronDown size={20} className={`transform transition-transform ${openIndex === index ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      
    </section>
  );
}

export default Stay;
