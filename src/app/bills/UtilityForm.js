"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ShieldCheck,
  ChevronRight,
  Loader2,
  ChevronDown,
  Check,
} from "lucide-react";

export default function UtilityForm({ mode }) {
  const [provider, setProvider] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();

  const isTv = mode === "tv";
  const maxLength = isTv ? 10 : 11;

  const providerData = {
    DSTV: { label: "DSTV", logo: "/logos/dstv.png" },
    GOTV: { label: "GOTV", logo: "/logos/gotv.jpg" },
    StarTimes: { label: "StarTimes", logo: "/logos/startimes.jpg" },
    "Ikeja Electric PLC (IKEDC)": {
      label: "Ikeja Electric PLC (IKEDC)",
      logo: "/logos/ikedc.jpg",
    },
    "Eko Electric (EKEDC)": {
      label: "Eko Electric (EKEDC)",
      logo: "/logos/ekedc.jpg",
    },
    "JMG Abuja": { label: "JMG Abuja", logo: "/logos/jmg.png" },
  };

  const providers = isTv
    ? ["DSTV", "GOTV", "StarTimes"]
    : ["Ikeja Electric PLC (IKEDC)", "Eko Electric (EKEDC)", "JMG Abuja"];

  const handleValidate = () => {
    if (meterNumber.length !== maxLength) {
      return alert(
        `${isTv ? "Smartcard" : "Meter"} number must be ${maxLength} digits`
      );
    }

    setIsValidating(true);

    setTimeout(() => {
      setCustomerName("Mr Ayomide");
      setIsValidating(false);
    }, 900);
  };

  return (
    <div className="space-y-8">

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition"
      >
        <ChevronRight className="rotate-180" size={18} />
        Utilities
      </button>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 capitalize">
          {mode} Payment
        </h2>

        <div className="text-xs font-bold bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full uppercase">
          Verification
        </div>
      </div>

      {/* PROVIDER */}
      <div className="relative">
        <label className="block text-[10px] uppercase font-black text-slate-400 mb-3 ml-1">
          Select Provider
        </label>

        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl flex justify-between items-center font-bold hover:border-blue-500 transition"
        >
          {provider ? (
            <div className="flex items-center gap-3">
              <img
                src={providerData[provider]?.logo}
                alt={provider}
                className="w-6 h-6 object-contain"
              />
              <span>{providerData[provider]?.label}</span>
            </div>
          ) : (
            <span className="text-slate-400">Choose provider...</span>
          )}

          <ChevronDown size={18} />
        </button>

        {dropdownOpen && (
          <div className="absolute z-50 w-full bg-white border rounded-2xl mt-2 shadow-lg overflow-hidden">
            {providers.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setProvider(item);
                  setDropdownOpen(false);
                }}
                className="w-full flex justify-between items-center p-4 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={providerData[item].logo}
                    alt={item}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-semibold text-slate-700">
                    {providerData[item].label}
                  </span>
                </div>

                {provider === item && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* METER INPUT */}
      <div>
        <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 ml-1">
          {isTv ? "Smartcard Number" : "Meter Number"}
        </label>

        <input
          type="tel"
          value={meterNumber}
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, "");
            if (val.length <= maxLength) setMeterNumber(val);
          }}
          placeholder={`Enter ${isTv ? "smartcard" : "meter"} number`}
          className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600 outline-none transition-all"
        />
      </div>

      {/* VERIFY */}
      <button
        type="button"
        onClick={handleValidate}
        disabled={isValidating}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
      >
        {isValidating ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Search />
        )}
        Verify
      </button>

      {/* SUCCESS */}
      {customerName && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex gap-3">
          <ShieldCheck className="text-green-600" />
          <div>
            <p className="text-green-600 font-bold text-xs">
              Customer Found
            </p>
            <p className="font-bold">{customerName}</p>
          </div>
        </div>
      )}

      {/* AMOUNT */}
      <div>
        <label className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 ml-1">
          Amount (NGN)
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          disabled={!customerName}
          className="w-full p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600 outline-none transition-all disabled:opacity-40"
        />
      </div>

      {/* PAY */}
      <button
        type="button"
        onClick={() =>
          router.push(
            `/bills/confirm?type=${mode}&provider=${provider}&meter=${meterNumber}&amount=${amount}`
          )
        }
        disabled={!customerName || !amount}
        className="w-full py-5 rounded-2xl text-lg font-black flex items-center justify-center gap-2 bg-blue-600 text-white disabled:opacity-40 active:scale-[0.98]"
      >
        Complete Payment <ChevronRight size={20} />
      </button>
    </div>
  );
}