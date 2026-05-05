"use client";
import React from "react";
import Reveal from "./Reveal";

function About() {
  return (
    <section id="about" className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
        
          <h2 className="text-4xl font-black text-slate-900 mb-8 md:text-left text-center">
            About Us
          </h2>

        
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>
              <span className="text-blue-600 font-bold">YOURSUB</span> is a fast and reliable platform that lets you buy airtime,
              subscribe to data, and pay bills in seconds — no stress, no delays. We
              understand how important these services are in your daily life, so
              we’ve created a system that is simple to use, secure, and always
              available.
            </p>
            
            <p>
              Our focus is on speed, convenience, and trust. With just a few clicks,
              you can complete transactions anytime, anywhere, without worrying
              about downtime or complications.
            </p>

            <p className="text-slate-900 font-semibold">
              We’re here to make digital payments effortless — so you can focus on
              what matters most.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;