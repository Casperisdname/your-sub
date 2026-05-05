"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "./Reveal";

const slides = [
  {
    title: "The best partner",
    text: "YourSub is the best technical partner you can have. Their API integration was seamless for our business.",
    author: "Ayomikun",
  },
  {
    title: "Fast and reliable service",
    text: "Transactions are processed instantly without delays. I haven't had a failed transaction in months.",
    author: "Daniel",
  },
  {
    title: "Super easy to use",
    text: "Clean and simple interface anyone can use. My customers find it very intuitive to navigate.",
    author: "Sarah",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="bg-gray-50 py-24 px-6 overflow-hidden">
      <Reveal>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">What People Say</h2>
          </div>

          <div className="relative flex items-center justify-center">
         
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute -left-4 md:-left-12 p-3 bg-white shadow-lg rounded-full z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>

       
            <div className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm min-h-[300px] flex flex-col justify-center relative">
              <Quote className="absolute top-6 left-6 text-blue-100" size={60} />
              
              <div key={index} className="animate-in fade-in slide-in-from-right-4 duration-500 text-center relative z-10">
                <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">
                  {slides[index].author}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  {slides[index].title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  {slides[index].text}
                </p>
              </div>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute -right-4 md:-right-12 p-3 bg-white shadow-lg rounded-full z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

        
          <div className="grid grid-cols-2 gap-8 mt-20 border-t border-gray-200 pt-12">
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-slate-900">10k+</span>
              <p className="text-slate-500 font-medium">Happy Clients</p>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-slate-900">200</span>
              <p className="text-slate-500 font-medium">Project Completed</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}