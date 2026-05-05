"use client";
import React from "react";
import Reveal from "./Reveal";
import Image from "next/image"; 
import DashboardMockup from "./DashboardMockup";


const mainServices = [
  "Discounted Airtime Top-up",
  "Affordable Data Bundles",
  "Electricity Bill Payments",
  "Cable TV Subscriptions (DSTV, GOTV, Startimes)",
  "Exam Scratch Cards (WAEC, NECO, NABTEB)"
];

const secondaryServices = [
  "Bulk SMS Services",
  "Airtime to Cash Conversion",
  "Result Checker Pins",
  "24/7 Automated Delivery"
];

function Services() {
  return (
    <section id="services" className="py-10 bg-white overflow-hidden">
      <Reveal>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-black text-slate-900 mb-20 tracking-tight">
            OUR SERVICES
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-3xl -z-10" />
             <div className="relative w-full max-w-md lg:max-w-lg flex justify-center items-center">

 
  <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl rounded-full"></div>

 

  
    <div className="flex justify-between items-center mb-4">
     
<DashboardMockup />
   

   
   
    </div>

</div>
            </div>

           
            <div className="w-full max-w-xl">
              <div className="inline-block px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4 uppercase tracking-wider">
                What we do Best
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Bill Payments with <span className="text-blue-600">Absolute Ease</span>
              </h3>

              <div className="space-y-3 mb-10">
                {mainServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-blue-600">✓</span>
                    <span className="font-semibold text-slate-700">{service}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6">Other Payments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {secondaryServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold border border-transparent hover:border-slate-200 transition-all"
                  >
                    <span className="text-green-500">●</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Services;