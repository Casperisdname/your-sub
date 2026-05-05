"use client";

import React, { useState, useRef } from "react";
import { Phone, MapPin, HelpCircle, LogOut, Loader2, Camera } from "lucide-react";
import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";

export default function ProfilePage({ user }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
 
  const [profilePic, setProfilePic] = useState(null);
  
  
  const fileInputRef = useRef(null);

  const fullName = user?.full_name || "Your Name";
  const phone = user?.phone_number || "No phone provided";

  const nameParts = fullName.split(" ");
  const initials = nameParts.length > 1
    ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    : fullName.charAt(0).toUpperCase();

  
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      
    
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-12 pb-20">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        
       
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

       
        <div 
          onClick={handleAvatarClick}
          className="relative w-28 h-28 mx-auto mb-4 group cursor-pointer"
        >
          <div className="w-full h-full bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-100 overflow-hidden border-4 border-white">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          
        
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">{fullName}</h1>
        <p className="text-slate-500 font-medium text-sm">
          Verified YourSub Account
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        <ProfileItem
          icon={<Phone size={20} />}
          label="Phone Number"
          value={phone}
        />
        <ProfileItem
          icon={<MapPin size={20} />}
          label="Country"
          value="Nigeria (NGN)"
        />

        <Link
          href="/dashboard/support"
          className="block transition-all active:scale-[0.99] hover:bg-slate-50"
        >
          <ProfileItem
            icon={<HelpCircle size={20} />}
            label="Customer Support"
            value="Help Center →"
          />
        </Link>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`w-full font-bold p-4 rounded-2xl flex items-center justify-center gap-2 mt-8 transition-all active:scale-[0.98] ${
          isLoggingOut
            ? "bg-red-50 text-red-400 opacity-70 cursor-not-allowed"
            : "bg-red-50 text-red-600 hover:bg-red-100"
        }`}
      >
        {isLoggingOut ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
        {isLoggingOut ? "Signing out..." : "Sign Out"}
      </button>

      <p className="text-center text-slate-400 text-xs font-medium">
        Version 1.0.4 • YourSub Fintech
      </p>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-6 transition-colors">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
          {label}
        </p>
        <p className="text-slate-900 font-bold">{value}</p>
      </div>
    </div>
  );
}
