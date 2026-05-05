import AirtimeForm from "../AirtimeForm";

export default function AirtimePage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        
       
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Buy Airtime
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Recharge any phone number instantly.
          </p>
        </div>

       
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <AirtimeForm mode="airtime" />
        </div>

      </div>
    </div>
  );
}