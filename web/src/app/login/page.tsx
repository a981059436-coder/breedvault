"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    const { supabase } = await import("@/lib/supabase");

    if (isSignUp) {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) setError(err.message);
      else setMessage("Check your email for the confirmation link!");
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="text-xl font-bold tracking-tight block mb-8 text-center"><span className="text-indigo-600">Paw</span>Port</Link>
        <h1 className="text-2xl font-bold text-center">{isSignUp ? "Create Account" : "Sign In"}</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div><label className="text-sm font-medium text-gray-700">Email</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="you@email.com" /></div>
          <div><label className="text-sm font-medium text-gray-700">Password</label><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="••••••" /></div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
          {message && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{message}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{loading?"Loading...":isSignUp?"Create Account":"Sign In"}</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">{isSignUp?"Already have an account?":"Don't have an account?"} <button onClick={()=>{setIsSignUp(!isSignUp);setError("");setMessage("")}} className="font-medium text-indigo-600 hover:underline">{isSignUp?"Sign In":"Sign Up"}</button></p>
      </div>
    </div>
  );
}
