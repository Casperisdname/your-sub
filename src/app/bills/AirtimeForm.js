"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AirtimeForm({ mode }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("Daily");
    const router = useRouter();

  const isDataMode = mode === "data";

  const networks = ["MTN", "Airtel", "Glo", "9Mobile"];

  const networkLogos = {
    MTN: "/logos/mtn.svg",
    Airtel: "/logos/airtel.svg",
    Glo: "/logos/glo.png",
    "9Mobile": "/logos/9mobile.png",
  };

  const plans = {
    Daily: [
      { id: 1, name: "500MB", price: 200, validity: "1 day" },
      { id: 2, name: "1GB", price: 300, validity: "1 day" },
    ],
    Weekly: [
      { id: 3, name: "2.5GB", price: 800, validity: "7 days" },
       { id: 4, name: "20GB", price: 5000, validity: "7 days" },
    ],
    Monthly: [
      { id: 5, name: "10GB", price: 3000, validity: "30 days" },
       { id: 6, name: "480GB", price: 90000, validity: "30 days" },
    ],
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) return;
    setPhoneNumber(value);
  };

  return (
    <div className="space-y-8">

       <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
      >
        <ChevronRight className="rotate-180" size={18} />
        Bills
      </button>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 capitalize">
          {mode} Purchase
        </h2>

        <div className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase">
          Instant
        </div>
      </div>

      <form className="space-y-6">

        
        <div>
          <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 ml-1">
            Select Network
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {networks.map((network) => {
              const isActive = selectedNetwork === network;

              return (
                <button
                  key={network}
                  type="button"
                  onClick={() => {
                    setSelectedNetwork(network);
                    setSelectedPlan(null);
                  }}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all
                    ${
                      isActive
                        ? "border-blue-600 bg-blue-50 shadow-md scale-[1.03]"
                        : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  <img
                    src={networkLogos[network]}
                    alt={network}
                    className="w-10 h-10 object-contain"
                  />

                  <span className="font-bold text-sm text-slate-700">
                    {network}
                  </span>

                  {isActive && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      
        {isDataMode && (
          <>
          
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all
                    ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-blue-50"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans[activeTab].map((plan) => {
                const isActive = selectedPlan?.id === plan.id;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all
                      ${
                        isActive
                          ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                          : "border-slate-200 bg-white hover:border-blue-400"
                      }
                    `}
                  >
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-sm font-medium text-slate-500">{plan.validity}</div>
                    <div className="mt-2 font-bold text-blue-600">
                      ₦{plan.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

       
        <div>
          <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2 ml-1">
            Phone Number
          </label>

          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="080 1234 5678"
            className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600 outline-none transition-all"
          />

          <p className="text-xs text-slate-400 mt-1 ml-1">
            {phoneNumber.length}/11 digits
          </p>
        </div>

        {!isDataMode && (
          <div>
            <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2 ml-1">
              Amount (NGN)
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600 outline-none transition-all"
            />
          </div>
        )}

       
      <button
  type="button"
  onClick={() => {
    const planData = selectedPlan
      ? `plan=${selectedPlan.name}&price=${selectedPlan.price}`
      : "";

    router.push(
      `/bills/confirm?type=${mode}&network=${selectedNetwork}&phone=${phoneNumber}&amount=${amount || selectedPlan?.price}&${planData}`
    );
  }}
  disabled={
    !selectedNetwork ||
    !phoneNumber ||
    (isDataMode ? !selectedPlan : !amount)
  }
  className="w-full py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-2 bg-blue-600 text-white"
>
  Pay with Wallet <ChevronRight size={20} />
</button>

      </form>
    </div>
  );
}