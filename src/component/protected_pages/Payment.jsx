"use client";
import React, { useState, useEffect } from "react";
import { CreditCard, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { initiateTopUp, getWalletCurrencies } from "@/app/actions/wallet";
import { toast } from "sonner";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [availableCurrencies, setAvailableCurrencies] = useState(["NGN"]); // Default
  const [loading, setLoading] = useState(false);
  const [fetchingCurrencies, setFetchingCurrencies] = useState(true);
  const [error, setError] = useState("");

  // Fetch currencies when the page loads
  useEffect(() => {
    async function loadCurrencies() {
      const res = await getWalletCurrencies();
      if (res.success && res.data.currencies) {
        setAvailableCurrencies(res.data.currencies);
        if (res.data.default_currency) setCurrency(res.data.default_currency);
      }
      setFetchingCurrencies(false);
    }
    loadCurrencies();
  }, []);

  const handlePayment = async () => {
    setError("");
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount < 100) return setError("Please enter an amount of at least 100.");

    setLoading(true);
    // Notice we pass the selected currency now!
    const result = await initiateTopUp(parsedAmount, currency);

    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-12 space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">

        <div className="space-y-4">
          <div className="flex gap-4">
            {/* Currency Dropdown */}
            <div className="w-1/3">
              <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">Currency</label>
              <div className="relative">
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={fetchingCurrencies}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:ring-2 focus:ring-blue-600 outline-none text-lg font-bold appearance-none cursor-pointer"
                >
                  {availableCurrencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {fetchingCurrencies && <Loader2 size={16} className="absolute right-4 top-5 animate-spin text-slate-400" />}
              </div>
            </div>

            {/* Amount Input */}
            <div className="w-2/3">
              <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:ring-2 focus:ring-blue-600 outline-none text-xl font-bold transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

            <button 
              onClick={handlePayment}
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-bold p-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 shadow-lg shadow-blue-200'}`}
            >
              <CreditCard size={20} />
              {loading ? "Connecting to Flutterwave..." : "Proceed to Payment"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
          <ShieldCheck size={16} />
          <span>Secured by Flutterwave Encryption</span>
        </div>
      </div>
  );
}