
import Link from 'next/link';

export default function ForgotPasswordPage() {
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

     
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="text-center mb-8">
          
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-slate-500 mt-2">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              required
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50/50"
              placeholder="name@company.com"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link 
            href="/login" 
            className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
          >
            ← Back to Log In
          </Link>
        </div>
      </div>

      
      <p className="mt-8 text-xs text-slate-400 font-medium text-center">
        Having trouble? <Link href="#" className="text-blue-500 underline">Contact Support</Link>
      </p>
    </div>
  );
}