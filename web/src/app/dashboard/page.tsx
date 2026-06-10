"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type A=Record<string,any>;

export default function Dashboard(){
  const [pets,setP]=useState<A[]>([]);const [ld,setL]=useState(true);const [u,setU]=useState<A|null>(null);
  useEffect(()=>{import("@/lib/supabase").then(({supabase})=>{supabase.auth.getUser().then(({data:{user}})=>{if(!user){window.location.href="/login";return}setU(user);supabase.from("pets").select("*,breeds(name,slug,species)").eq("user_id",user.id).order("created_at",{ascending:false}).then(({data})=>{setP(data??[]);setL(false)})})})},[])
  if(ld)return<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"/></div>
  return(<div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/" className="text-xl font-bold"><span className="text-indigo-600">Paw</span>Port</Link><div className="flex items-center gap-4"><span className="text-sm text-gray-500">{u?.email}</span><button onClick={()=>import("@/lib/supabase").then(({supabase})=>supabase.auth.signOut().then(()=>window.location.href="/"))} className="text-sm text-gray-400 hover:text-red-600">Sign Out</button></div></div></header>
    <main className="mx-auto max-w-6xl px-6 py-12"><div className="flex items-center justify-between mb-8"><div><h1 className="text-2xl font-bold">My Pets</h1></div><Link href="/dashboard/new-pet" className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">+ Add Pet</Link></div>
    {pets.length===0?<div className="text-center py-20 bg-white rounded-2xl border border-gray-100"><div className="text-5xl mb-4">🐾</div><h2 className="text-lg font-bold">No pets yet</h2><Link href="/dashboard/new-pet" className="inline-block mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">+ Add Your First Pet</Link></div>:<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{pets.map((p:A)=><Link key={p.id} href={`/dashboard/pets/${p.id}`} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-200"><div className="flex items-start justify-between"><div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">{p.breeds?.species==="cat"?"🐱":"🐶"}</div>{p.sex?<span className={"text-xs font-medium px-2 py-1 rounded-full "+(p.sex==="male"?"bg-blue-50 text-blue-600":"bg-pink-50 text-pink-600")}>{p.sex==="male"?"♂":"♀"}</span>:null}</div><h3 className="mt-4 text-lg font-bold">{p.name}</h3><p className="text-sm text-gray-500">{p.breeds?.name||"Unknown"}</p></Link>)}</div>}
    </main></div>);
}
