"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Loader2, RefreshCcw } from "lucide-react";
import { getTransactionHistory } from "@/app/actions/wallet";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 10;

  const fetchHistory = async (currentOffset) => {
    setLoading(true);
    setError("");

    const result = await getTransactionHistory(LIMIT, currentOffset);

    if (result.error) {
      setError(result.error);
    } else {
      setTransactions(result.data.top_ups || []);
      setHasMore(result.data.has_more || false);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory(offset);
  }, [offset]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 pt-12 pb-20 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-slate-900">
          Transaction History
        </h1>
        <button 
          onClick={() => fetchHistory(offset)}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Refresh"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {loading && transactions.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="text-slate-400 font-medium">Loading your transactions...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button onClick={() => fetchHistory(offset)} className="text-blue-600 font-bold hover:underline">
              Try Again
            </button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <RefreshCcw size={24} />
            </div>
            <p className="text-slate-500 font-medium">
              No transactions found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Reference</th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Date</th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Amount</th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((tx, index) => (
                  <tr key={tx.tx_ref || index} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700 text-sm">
                      {tx.tx_ref}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                      {formatDate(tx.created_at)}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦{(tx.amount_minor / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        tx.status === "completed" || tx.status === "successful" ? "bg-green-100 text-green-600" :
                        tx.status === "failed" ? "bg-red-100 text-red-600" :
                        "bg-amber-100 text-amber-600"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PAGINATION CONTROLS --- */}
        {!loading && transactions.length > 0 && (
          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Showing {offset + 1} - {offset + transactions.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                disabled={offset === 0}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setOffset(offset + LIMIT)}
                disabled={!hasMore}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center shadow-sm"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}