"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Phone,
  Wifi,
  Tv,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getTransactionHistory } from "@/app/actions/wallet";

export default function DashboardPage({ user, wallets = [] }) {
  const [showBalance, setShowBalance] = useState(true);

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(true);

  const fullName = user?.full_name || "User";
  const firstName = fullName.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();
  const phoneNumber = user?.phone_number || "No phone linked";


  // Find the NGN wallet as the primary, or default to 0 if they have no wallets yet
  const primaryWallet = wallets?.find((w) => w.currency === "NGN") ||
    wallets?.[0] || { balance_minor: 0, currency: "NGN" };
  const formattedBalance = (primaryWallet.balance_minor / 100).toLocaleString(
    "en-NG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  useEffect(() => {
    async function fetchRecent() {
      setLoadingTx(true);
      const result = await getTransactionHistory(5, 0);

      if (!result.error && result.data?.top_ups) {
        setRecentTransactions(result.data.top_ups);
      }
      setLoadingTx(false);
    }

    fetchRecent();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* --- HEADER: USER INFO --- */}
      <div className="flex justify-between items-center pt-12">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome Back, {firstName}! 👋
          </h1>
          <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm font-medium">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
              <User size={14} /> {fullName}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
              <Phone size={14} /> {phoneNumber}
            </span>
          </div>
        </div>

        {/* User Avatar Circle */}
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-2xl border-4 border-white shadow-md">
          {initial}
        </div>
      </div>

      {/* --- WALLET CARD --- */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
              YourSub Balance
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-2xl font-black transition-all">
                {showBalance ? `₦${formattedBalance}` : "••••••••"}
              </span>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {showBalance ? (
                  <EyeOff size={20} className="text-blue-200" />
                ) : (
                  <Eye size={20} className="text-blue-200" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold border border-white/10">
            {primaryWallet.currency}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/dashboard/payment"
            prefetch={false}
            className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
          >
            Add Funds
          </Link>
          <Link
            href="/dashboard/withdraw"
            prefetch={false}
            className="bg-blue-500/30 text-white border border-blue-400/30 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500/50 transition-colors active:scale-95"
          >
            Withdraw
          </Link>
        </div>
      </div>

      {/* --- QUICK ACTIONS --- */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionItem
            href="/bills/airtime"
            icon={<Phone size={24} />}
            label="Airtime"
            color="bg-orange-50 text-orange-600"
          />
          <QuickActionItem
            href="/bills/data"
            icon={<Wifi size={24} />}
            label="Data"
            color="bg-blue-50 text-blue-600"
          />
          <QuickActionItem
            href="/bills/tv"
            icon={<Tv size={24} />}
            label="Cable TV"
            color="bg-purple-50 text-purple-600"
          />
          <QuickActionItem
            href="/bills/utility"
            icon={<Zap size={24} />}
            label="Utility"
            color="bg-yellow-50 text-yellow-600"
          />
        </div>
      </section>

      {/* --- RECENT TRANSACTIONS --- */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Transactions
          </h2>
          <Link
            href="/dashboard/history"
            className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loadingTx ? (
            <div className="p-8 flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-600" size={24} />
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No recent transactions found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">
                    Service
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentTransactions.map((tx, index) => (
                  <tr
                    key={tx.tx_ref || index}
                    className="hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      Wallet Top-up
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {tx.tx_ref
                          ? `${tx.tx_ref.substring(0, 15)}...`
                          : "Ref processing"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {formatDate(tx.created_at)}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦
                      {(tx.amount_minor / 100).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          tx.status === "completed" ||
                          tx.status === "successful"
                            ? "bg-green-100 text-green-600"
                            : tx.status === "failed"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

function QuickActionItem({ icon, label, color, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-95 group text-center"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${color}`}
      >
        {icon}
      </div>
      <span className="font-bold text-slate-700 text-sm">{label}</span>
    </Link>
  );
}
