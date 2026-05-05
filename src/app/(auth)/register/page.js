"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  PartyPopper,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { completeSignup } from "@/app/actions/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [signupToken, setSignupToken] = useState("");

  // State for dynamic countries
  const [marketCountries, setMarketCountries] = useState([{ code: "NG", name: "Nigeria (NG)" }]);
  const [fetchingCountries, setFetchingCountries] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    preferredCountry: "NG", 
  });

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // STRICT ISO-CODE FETCHING
  useEffect(() => {
    if (step === 3) {
      async function fetchCountries() {
        setFetchingCountries(true);
        try {
          const res = await fetch(`${API_BASE_URL}/billing/supported-countries`);
          const data = await res.json();
          
          if (res.ok) {
            const rawList = data.countries || data.supported_countries || data;
            
            if (Array.isArray(rawList) && rawList.length > 0) {
              // Strictly extract the 2-letter code, ignoring anything else
              const cleanCountries = rawList.map(c => {
                if (typeof c === 'string') return { code: c.trim().toUpperCase(), name: c };
                
                // Look for common keys that backend devs use for ISO codes
                const isoCode = c.code || c.iso2 || c.iso_alpha2 || c.country_code || "";
                return {
                  code: isoCode.trim().toUpperCase(),
                  name: c.name || c.country_name || isoCode
                };
              }).filter(c => c.code.length === 2); // ONLY keep exact 2-letter codes!

              if (cleanCountries.length > 0) {
                setMarketCountries(cleanCountries);
                setFormData((prev) => ({ ...prev, preferredCountry: cleanCountries[0].code }));
              }
            }
          }
        } catch (err) {
          console.error("Failed to load supported countries", err);
        } finally {
          setFetchingCountries(false);
        }
      }
      fetchCountries();
    }
  }, [step]);

  const getFormattedPhone = () => {
    let cleaned = formData.phone.replace(/\D/g, "");
    if (cleaned.startsWith("234")) cleaned = cleaned.substring(3);
    if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    return `+234${cleaned}`;
  };

  const nextStep = async () => {
    setError("");

    if (step === 1) {
      if (!formData.fullName.trim()) return setError("Full name is required.");
      if (formData.phone.length < 10) return setError("Enter a valid phone number.");

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup/verify-phone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName,
            phone_number: getFormattedPhone(),
          }),
        });

        const data = await res.json();

        toast.info(
          data.mock_otp
            ? `Your OTP is ${data.mock_otp}`
            : "The phone number has been used!",
          { duration: 6000 }
        );
        if (!data.mock_otp) return setStep(1);

        if (!res.ok) {
          throw new Error(data.error?.message || "Failed to send OTP.");
        }

        setTimer(30);
        setStep(2);
      } catch (err) {
        setError("Failed to fetch");
        toast.error("Failed to connect to server.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (step === 2) {
      if (otp.length < 6) return setError("Please enter the 6-digit code.");

      setLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp: otp,
            phone_number: getFormattedPhone(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "Invalid OTP code.");
        }

        setSignupToken(data.signup_token);
        setStep(3); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // STRICT VALIDATION CHECKS
    if (!formData.preferredCountry || formData.preferredCountry.length !== 2) {
      return setError("Invalid market country. Please select a valid country.");
    }
    if (!formData.password || !formData.confirmPassword)
      return setError("Please set your password.");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match!");
    if (!signupToken)
      return setError("Session expired. Please try registering again.");

    setLoading(true);
    
    const result = await completeSignup(formData.password, signupToken, formData.preferredCountry);

    if (result.error) {
      toast.error(result.error);
      setError(result.error);
      setLoading(false);
    } else {
      const firstName = formData.fullName.split(" ")[0];
      localStorage.setItem("userName", firstName);
      localStorage.setItem("userFullName", formData.fullName);
      localStorage.setItem("userPhone", getFormattedPhone());

      setStep(4);
      toast.success("Account created successfully!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
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

        {step < 4 && (
          <div className="flex justify-between mb-8 mt-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold text-sm transition-all duration-500 ${
                  step >= num ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > num ? <CheckCircle2 size={16} /> : num}
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
              <p className="text-slate-500 font-medium">Join thousands of users today.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none bg-slate-50/50 focus:border-blue-400 transition-all"
                  placeholder="Ayo John"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 font-bold text-slate-400">+234</span>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full p-4 pl-16 rounded-2xl border border-slate-200 outline-none bg-slate-50/50 focus:border-blue-400 transition-all"
                    placeholder="808 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={nextStep}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold p-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              {loading ? "Sending Code..." : "Continue"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <button
              onClick={prevStep}
              className="text-slate-400 flex items-center gap-1 text-sm hover:text-blue-600 transition-colors"
            >
              <ChevronLeft size={16} /> Change Number
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Verify Phone</h2>
              <p className="text-slate-500">
                Enter the 6-digit code sent to +234 {formData.phone}
              </p>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={6}
                className="w-52 text-center text-3xl font-black tracking-[0.5rem] p-4 rounded-2xl border-2 border-blue-100 outline-none bg-slate-50 focus:border-blue-600 transition-all"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-slate-400">
                  Resend code in <span className="text-blue-600 font-bold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={() => { setStep(1); nextStep(); }}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
            <button
              onClick={nextStep}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold p-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">Secure Account</h2>
              <p className="text-slate-500 font-medium">Set your market and create a password.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">
                  Market Country
                </label>
                <div className="relative">
                  <select
                    value={formData.preferredCountry}
                    onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                    disabled={fetchingCountries}
                    className="w-full p-4 pl-12 rounded-2xl border border-slate-200 outline-none bg-slate-50/50 focus:border-blue-400 transition-all appearance-none cursor-pointer font-bold text-slate-700"
                  >
                    {marketCountries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <Globe className="absolute left-4 top-4 text-slate-400" size={20} />
                  {fetchingCountries && (
                    <Loader2 size={16} className="absolute right-4 top-5 animate-spin text-slate-400" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none bg-slate-50/50 focus:border-blue-400 transition-all"
                    placeholder="Create Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-4 text-slate-400"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <input
                type="password"
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none bg-slate-50/50 focus:border-blue-400 transition-all"
                placeholder="Confirm Password"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            
            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold p-4 rounded-2xl shadow-lg active:scale-95 transition-all mt-4"
            >
              {loading ? "Creating Account..." : "Complete Sign Up"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <PartyPopper size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Welcome!</h2>
            <p className="text-slate-500 font-medium">
              YourSub account for {formData.fullName.split(" ")[0]} is ready.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-blue-600 text-white font-bold p-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              Start Using YourSub <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="mt-8 text-center animate-in fade-in duration-700">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}