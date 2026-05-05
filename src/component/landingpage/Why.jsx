"use client";
import React from "react";
import Reveal from "./Reveal";

const features = [
  {
    emoji: "⚡️",
    title: "Instant Transactions",
    description: "Get your airtime, data, and bill payments processed in seconds. No delays, no waiting."
  },
  {
    emoji: "🔒",
    title: "Secure Payments",
    description: "Your transactions are protected with advanced security systems for total peace of mind."
  },
  {
    emoji: "📱",
    title: "All-in-One Platform",
    description: "Manage all your utility bills, data subscriptions, and cable TV from a single dashboard."
  },
  {
    emoji: "💰",
    title: "Affordable Rates",
    description: "Enjoy competitive pricing and value for money. More data for less cost."
  },
  {
    emoji: "🌍",
    title: "24/7 Availability",
    description: "Our platform is always online. Midnight or public holidays, we are here for you."
  },
  {
    emoji: "🤝",
    title: "Reliable Service",
    description: "We prioritize consistency and uptime. Trust us to deliver every single time."
  }
];

function Why() {
  return (
    <section id="why" className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Why Choose <span className="text-blue-600">YourSub?</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              We provide the fastest and most secure way to handle your digital utility needs across Nigeria.
            </p>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative p-8 transition-all duration-500 ease-out 
                           rounded-2xl bg-blue-100 border border-blue-100/50
                           shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                           hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] 
                           hover:-translate-y-2 hover:bg-white hover:border-blue-300"
              >
           
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-6 
                                shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {feature.emoji}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

            
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {feature.description}
                </p>

              
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-500 rounded-full 
                                group-hover:w-1/3 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Why;