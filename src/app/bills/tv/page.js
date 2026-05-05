import UtilityForm from "../UtilityForm";

export default function TVPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        
       
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Pay Cable TV
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Renew your DSTV, GOTV, or StarTimes subscription.
          </p>
        </div>

      
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8">
          <UtilityForm mode="tv" />
        </div>

      </div>
    </div>
  );
}