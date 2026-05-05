"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, History, CreditCard, Settings } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Payments", href: "/dashboard/payment", icon: CreditCard },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl bg-white border-t border-slate-100 px-6 py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`p-2 rounded-xl transition-all ${isActive(item.href) ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}
                >
                  <Icon size={24} strokeWidth={isActive(item.href) ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${isActive(item.href) ? "text-blue-600" : "text-slate-400"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 p-6 z-50">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            Y
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            YourSub
          </span>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <Link
            href="/dashboard/setting"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 font-semibold hover:text-slate-900"
          >
            <Settings size={20} />
            Settings
          </Link>
        </div>
      </nav>
    </>
  );
}
