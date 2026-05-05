"use client";
import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";

function Partner() {
  return (
    <section 
      id="partnership" 
      className="bg-blue-500 py-24 px-6 md:px-24 lg:px-32"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-8">
      
        <Reveal>
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-blue-50 mb-6">
              Partnership
            </h2>
            <div className="space-y-2">
              <p className="text-white text-xl font-bold italic">
                Do you want your own VTU and data purchase platform?
              </p>
              <p className="text-white text-lg font-medium opacity-90">
                Lets help you get started. You could be making a minimum of 
                <span className="text-blue-50 font-black ml-1">₦100,000</span> a month.
              </p>
            </div>
          </div>
        </Reveal>

   
        <Reveal>
          <div className="flex-shrink-0">
            <Link 
              href="/login" 
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-xl hover:bg-vlue-50 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
            >
              Get Started Now
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default Partner;