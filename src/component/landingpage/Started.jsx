"use client";
import React from "react";
import Reveal from "./Reveal";

function Started() {
  return (
    <section id="contact" className="px-6 py-20 md:py-32 bg-white">
      <Reveal>
       
        <div className="max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-800 rounded-[3rem] px-8 py-16 md:py-24 text-center shadow-2xl shadow-blue-200">
          
        
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mb-20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white pb-6 tracking-tight">
              Get started
            </h2>
            
            <p className="text-lg md:text-xl text-blue-100 font-medium pb-10 max-w-2xl mx-auto leading-relaxed">
              Start Enjoying All Of Our Services At The Best Affordable Prices
            </p>

            <div className="flex justify-center">
              <a 
                href="register" 
                className="w-full sm:w-auto px-12 py-5 bg-white text-blue-700 font-black text-xl rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 shadow-xl"
              >
                Register Now
              </a>
            </div>

        
            <div className="flex flex-row justify-center items-center gap-6 md:gap-12 pt-16 text-white/80">
              <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase">
                <span className="text-blue-100">✔</span> Trusted
              </div>
              <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase">
                <span className="text-blue-100">✔</span> Fast
              </div>
              <div className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase">
                <span className="text-blue-100">✔</span> Secure
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      
    </section>
  );
}

export default Started;