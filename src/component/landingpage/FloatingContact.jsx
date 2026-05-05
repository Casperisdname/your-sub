"use client";
import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'; 

function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  if (pathname !== "/") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const subject = encodeURIComponent(`YourSub Support: ${name}`);
    
   
    const body = encodeURIComponent(message);

    window.location.href = `mailto:support@yoursub.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40, transition: { duration: 0.1 } }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
           
            className="mb-4 w-[90vw] max-w-[380px] max-h-[80vh] flex flex-col bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
          >
           
            <div className="bg-blue-600 p-5 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold text-lg">Contact Support</h3>
                <p className="text-blue-100 text-xs">Typically replies in minutes</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

           
            <form 
              className="p-5 space-y-4 overflow-y-auto custom-scrollbar" 
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message</label>
                <textarea 
                  rows="3" 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?" 
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-colors shrink-0"
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-500 ${
          isOpen ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
        }`}
      >
        <motion.div
          key={isOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}

export default FloatingContact;
