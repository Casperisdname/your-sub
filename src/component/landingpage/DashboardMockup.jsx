"use client";
import React from "react";

const DashboardMockup = () => {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg flex justify-center items-center">
   
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/30 via-indigo-400/20 to-purple-400/30 blur-3xl rounded-full" />

     
      <div className="relative backdrop-blur-2xl bg-white/90 border border-white/50 rounded-[2.5rem] shadow-[0_32px_64px_rgba(30,58,138,0.15)] p-4 w-full animate-float overflow-hidden">
        
   
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl shadow-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">YourSub Balance</p>
              <h3 className="text-xl font-black mt-1">₦1,245,800.00</h3>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold border border-white/10">NGN</div>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="bg-white text-blue-600 px-4 py-1.5 rounded-lg font-bold text-[10px]">Add Funds</div>
            <div className="bg-blue-500/30 text-white border border-blue-400/30 px-4 py-1.5 rounded-lg font-bold text-[10px]">Withdraw</div>
          </div>
        </div>

      
        <div className="mt-6 px-2">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Airtime', color: 'bg-orange-50 text-orange-600' },
              { label: 'Data', color: 'bg-blue-50 text-blue-600' },
              { label: 'Cable', color: 'bg-purple-50 text-purple-600' },
              { label: 'Utility', color: 'bg-yellow-50 text-yellow-600' }
            ].map((action, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                   {/* Placeholder for Icons */}
                   <div className="w-4 h-4 bg-current opacity-40 rounded-sm" />
                </div>
                <span className="text-[9px] font-bold text-slate-600">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Recent Transactions Table */}
        <div className="mt-6 px-2 pb-2">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Transactions</h4>
          <div className="space-y-2">
            {[
              { service: "MTN Airtime", amount: "₦5,000", status: "Success" },
              { service: "DSTV Sub", amount: "₦22,000", status: "Pending" }
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div>
                  <p className="text-[11px] font-bold text-slate-800">{tx.service}</p>
                  <p className="text-[9px] text-slate-400">May 02, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-black text-slate-900">{tx.amount}</p>
                  <span className={`text-[8px] font-black uppercase tracking-tighter ${tx.status === 'Success' ? 'text-green-500' : 'text-amber-500'}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;