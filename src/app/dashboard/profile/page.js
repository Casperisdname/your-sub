import ProfilePage from "@/component/protected_pages/Profile";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const userRes = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const userData = await userRes.json();

  return <ProfilePage user={userData} />;
}
