import Reveal from "./Reveal";
import DashboardMockup from "./DashboardMockup";
import Link from "next/link";

function Hero() {
  return (
    <div id="home" className="pt-36 pb-12 px-8 md:px-20 overflow-hidden">
      <Reveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="text-left md:w-1/2 font-medium z-10">
            <div className="pb-2 text-blue-700 font-bold uppercase tracking-wider text-sm">
              Welcome to YourSub
            </div>

        
            <h1 className="text-4xl pb-6 md:text-6xl font-bold leading-tight">
              Pay Less. Pay Anywhere. <span className="text-blue-600">Pay with YourSub.</span>
            </h1>

          
            <div className="pb-8 text-slate-600 text-lg leading-relaxed">
              From airtime to subscriptions, enjoy discounted bill payments across Africa and beyond — fast, secure, and borderless.
            </div>

            <div className="flex space-x-4">
              <Link href="/login">
                <button className="relative shadow-xl overflow-hidden px-8 py-4 font-bold text-white bg-blue-600 rounded-2xl group transition-all hover:scale-105">
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-400 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
              </Link>

              <Link href="/register">
                <button className="relative shadow-xl overflow-hidden px-8 py-4 font-bold text-white bg-slate-900 rounded-2xl group transition-all hover:scale-105">
                  <span className="relative z-10">Register</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-400 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center items-center relative">
            <DashboardMockup />
          </div>

        </div>
      </Reveal>
    </div>
  );
}

export default Hero;
