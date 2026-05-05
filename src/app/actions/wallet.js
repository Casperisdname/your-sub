'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function initiateTopUp(amount, currency = "NGN") {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return { error: "Session expired." };

  const amountMinor = Math.round(amount * 100);
  const res = await fetch(`${API_BASE_URL}/wallet/top-ups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ amount_minor: amountMinor, currency: currency })
  });
  const data = await res.json();
  if (!res.ok) return { error: data.error?.message || "Failed to initialize payment." };
  
  redirect(data.checkout_url);
}



export async function getTransactionHistory(limit = 10, offset = 0) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) return { error: "Session expired. Please log in again." };

  try {
    const res = await fetch(`${API_BASE_URL}/wallet/top-ups?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error?.message || "Failed to fetch history." };
    }

    return { success: true, data };
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}



export async function getTopUpStatus(tx_ref) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return { error: "Session expired." };

  try {
    const res = await fetch(`${API_BASE_URL}/wallet/top-ups/${tx_ref}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error?.message || "Failed to verify payment." };
    return { success: true, data };
  } catch (err) {
    return { error: "An unexpected error occurred." };
  }
}

// 2. Get Available Currencies
export async function getWalletCurrencies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return { error: "Session expired." };

  const res = await fetch(`${API_BASE_URL}/wallet/currencies`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  return res.ok ? { success: true, data } : { error: "Failed to load currencies." };
}

// 3. Get All Balances (Multi-currency)
export async function getAllBalances() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return { error: "Session expired." };

  const res = await fetch(`${API_BASE_URL}/wallet/balances`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  return res.ok ? { success: true, data } : { error: "Failed to load balances." };
}