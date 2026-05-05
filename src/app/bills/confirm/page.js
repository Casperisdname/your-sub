"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const type = params.get("type") || "";

  const network = params.get("network") || "";
  const phone = params.get("phone") || "";

  const provider = params.get("provider") || "";
  const meter = params.get("meter") || "";

  const plan = params.get("plan") || "";
  const price = params.get("price") || "";
  const amount = params.get("amount") || "";

  // SAFE NUMBER HANDLING (prevents NaN crash)
  const total = Number(amount || price || 0);

  const isAirtime = network || phone;
  const isUtility = provider || meter;

  return (
    <div className="min-h-screen bg-slate-50 px-6 pt-10 pb-20 flex justify-center">
      <div className="w-full max-w-md space-y-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            Checkout
          </span>
        </div>

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Confirm Payment
          </h1>
          <p className="text-sm text-slate-500 mt-1 capitalize">
            {type} summary
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">

          {/* AMOUNT */}
          <div className="text-center py-6 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Total Amount
            </p>

            <h2 className="text-4xl font-black text-slate-900 mt-2">
              ₦{total.toLocaleString()}
            </h2>

            <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
              <CheckCircle2 size={14} />
              Ready
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-6 space-y-4">

            {isAirtime && (
              <>
                <SectionTitle title="Airtime / Data" />
                {network && <Row label="Network" value={network} />}
                {phone && <Row label="Phone" value={phone} />}
                {plan && <Row label="Plan" value={plan} />}
              </>
            )}

            {isUtility && (
              <>
                <SectionTitle title="Utilities / TV" />
                {provider && <Row label="Provider" value={provider} />}
                {meter && <Row label="Meter / Smartcard" value={meter} />}
              </>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <span className="text-slate-400 text-sm">Service Fee</span>
              <span className="text-green-600 font-bold text-sm">FREE</span>
            </div>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl text-lg shadow-lg transition active:scale-[0.98]">
          Pay ₦{total.toLocaleString()}
        </button>

      </div>
    </div>
  );
}

/* ROW */
function Row({ label, value }) {
  if (!value) return null;

  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

/* SECTION TITLE */
function SectionTitle({ title }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
      {title}
    </p>
  );
}
