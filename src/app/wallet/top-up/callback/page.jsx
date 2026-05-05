"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTopUpStatus } from "@/app/actions/wallet";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");

  // Status can be: "verifying", "successful", "failed", or "pending"
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    async function verifyPayment() {
      if (!tx_ref) {
        setStatus("failed");
        return;
      }

      let attempts = 0;
      const maxAttempts = 6; // Check 6 times

      while (attempts < maxAttempts) {
        const result = await getTopUpStatus(tx_ref);

        if (result.success) {
          const currentStatus = result.data.status;

          if (currentStatus === "successful" || currentStatus === "completed") {
            setStatus("successful");
            setTimeout(() => router.push("/dashboard"), 3000);
            return;
          }

          if (currentStatus === "failed") {
            setStatus("failed");
            return;
          }
        }

        // Wait 3 seconds before checking again (total ~18 seconds of waiting)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        attempts++;
      }

      // If we exit the loop and it hasn't succeeded OR explicitly failed, it's pending.
      setStatus("pending");
    }

    verifyPayment();
  }, [tx_ref, router]);

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">Verifying payment securely...</p>
      </div>
    );
  }

  if (status === "successful") {
    return (
      <div className="text-center space-y-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100/50">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Payment Successful!</h1>
        <p className="text-slate-500 font-medium">
          Your wallet has been funded. <br />
          <span className="text-xs text-slate-400">Ref: {tx_ref}</span>
        </p>

        <p className="text-sm font-bold text-blue-600 animate-pulse pt-4">
          Redirecting to your dashboard...
        </p>

        <Link
          href="/dashboard"
          className="mt-8 w-full bg-slate-900 text-white font-bold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
        >
          Go to Dashboard Now <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="text-center space-y-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100/50">
          <Clock size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Payment Processing</h1>
        <p className="text-slate-500 font-medium">
          Your bank is taking a little longer than usual to confirm this transfer. 
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl text-sm text-slate-600">
          You can safely leave this page. Your balance will automatically update once the network clears the transaction.
          <br /><br />
          <span className="text-xs text-slate-400 font-mono tracking-tighter">Ref: {tx_ref}</span>
        </div>

        <Link
          href="/dashboard"
          className="mt-8 w-full bg-blue-600 text-white font-bold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <XCircle size={48} />
      </div>
      <h1 className="text-3xl font-black text-slate-900">Payment Failed</h1>
      <p className="text-slate-500 font-medium">
        We could not process your payment. You have not been charged.
      </p>

      <Link
        href="/dashboard/payment"
        className="mt-8 w-full bg-blue-600 text-white font-bold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
      >
        Try Again
      </Link>
      <Link
        href="/dashboard"
        className="block text-slate-500 font-bold text-sm hover:underline"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-500 font-bold animate-pulse">Checking connection...</p>
          </div>
        }>
          <CallbackContent />
        </Suspense>
      </div>
    </div>
  );
}