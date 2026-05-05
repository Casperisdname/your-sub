import Dashboard from "@/component/protected_pages/Dashboard";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // Fetch User Profile
  const userRes = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const userData = await userRes.json();

  // NEW: Fetch ALL Balances
  const walletRes = await fetch(`${API_BASE_URL}/wallet/balances`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const walletData = await walletRes.json();
  return <Dashboard user={userData} wallets={walletData.balances || []} />;
}
