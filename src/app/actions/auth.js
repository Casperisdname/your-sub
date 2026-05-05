"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(phone, password) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone, password: password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error?.message || "Invalid credentials" };
    }

    // 2. Set the token securely
    cookieStore.set({
      name: "accessToken",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.expires_in || 86400,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." };
  }
}


export async function logoutUser() {
  const cookieStore = await cookies();
  
  cookieStore.delete('accessToken');
  
  redirect('/login');
}



export async function completeSignup(password, signupToken, preferredCountryCode) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password,
        signup_token: signupToken,
        preferred_country_code: preferredCountryCode 
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error?.message || "Failed to complete signup." };
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'accessToken',
      value: data.access_token,
      httpOnly: true,     
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',    
      maxAge: data.expires_in || 86400, 
      path: '/',          
    });

    return { success: true };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." };
  }
}