"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/app/actions/auth";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFormattedPhone = (phone) => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("234")) cleaned = cleaned.substring(3);
    if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    return `+234${cleaned}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      return setError("Please enter both phone number and password.");
    }

    setLoading(true);

    try {
      const result = await loginUser(getFormattedPhone(phone), password);
      console.log(result);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // The HttpOnly cookie is set! Now we just redirect.
        router.push("/dashboard");
        toast.success("You are successfully logged in!");
      }
    } catch (err) {
      setError("Failed to fetch");
      toast.error("Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
          Y
        </div>
        <span className="text-3xl font-black tracking-tight text-slate-900">
          YourSub
        </span>
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
        {error && (
          <div className="absolute top-0 left-0 w-full bg-red-50 p-3 flex items-center gap-2 text-red-600 text-xs font-bold z-50">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="text-center mb-8 mt-2">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-1">
            Manage your African & global bills
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              maxLength={11}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50/50"
              placeholder="08032903214"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="block text-xs uppercase tracking-widest font-bold text-slate-500">
                Password
              </label>
              <p className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Forgot?
              </p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pr-12 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50/50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            New to YourSub?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-400 font-medium uppercase tracking-widest text-center">
        Securely powered by Flutterwave & Reloadly
      </p>
    </div>
  );
}
