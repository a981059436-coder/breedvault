"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type A=Record<string,any>;

export default function PassportPage({params}:{params:Promise<{id:string}>}){
  const [pet,setPet]=useState<A|null>(null);const [entries,setE]=useState<A[]>([]);const [ld,setL]=useState(true);
  const [id,setId]=useState("");

  useEffect(()=>{params.then(p=>setId(p.id))},[]);
  useEffect(()=>{if(!id)return;(async()=>{const {supabase}=await import("@/lib/supabase");const r=await supabase.from("pets").select("*,breeds(name,slug,species,origin,life_expectancy_years_low,life_expectancy_years_high,litter_size_avg)").eq("id",id).single();setPet(r.data);const e=await supabase.from("health_entries").select("*").eq("pet_id",id).order("entry_date",{ascending:false});setE(e.data??[]);setL(false)})()},[id]);

  if(ld)return<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"/></div>;
  if(!pet)return<div className="flex items-center justify-center min-h-screen text-gray-500">Pet not found.</div>;

  const vax=entries.filter((e:A)=>e.entry_type==="vaccination");
  const weights=entries.filter((e:A)=>e.entry_type==="weight");
  const vets=entries.filter((e:A)=>e.entry_type==="vet_visit");
  const lastWeight=weights[0];
  const age=pet.birth_date?Math.floor((new Date().getTime()-new Date(pet.birth_date).getTime())/(86400000*365.25)):null;

  return(<div className="min-h-screen bg-white text-gray-900 print:bg-white print:text-black">
    <style>{'@media print{body{font-size:11pt}.no-print{display:none!important}@page{margin:1.5cm}}'}</style>
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="no-print mb-6 flex items-center justify-between">
        <Link href={`/dashboard/pets/${pet.id}`} className="text-sm text-gray-500 hover:text-indigo-600">← Back to {pet.name}</Link>
        <button onClick={()=>window.print()} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">🖨 Print Passport</button>
      </div>

      <div className="border-4 border-indigo-200 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-indigo-100 pb-6 mb-6">
          <div className="text-4xl mb-2">{pet.breeds?.species==="cat"?"🐱":"🐶"}</div>
          <h1 className="text-3xl font-extrabold tracking-tight"><span className="text-indigo-600">Paw</span>Port</h1>
          <p className="text-sm text-gray-400 mt-1">Pet Health Passport</p>
        </div>

        {/* Pet Identity */}
        <h2 className="text-lg font-bold uppercase tracking-wide text-indigo-600 mb-4">Pet Identity</h2>
        <div className="grid grid-cols-2 gap-3 text-sm mb-8">
          <div><span className="text-gray-400">Name:</span> <span className="font-bold">{pet.name}</span></div>
          <div><span className="text-gray-400">Species:</span> {pet.breeds?.species==="cat"?"Feline":"Canine"}</div>
          <div><span className="text-gray-400">Breed:</span> {pet.breeds?.name||"—"}</div>
          <div><span className="text-gray-400">Sex:</span> {pet.sex==="male"?"Male":"Female"}{pet.is_neutered?" (Neutered)":""}</div>
          <div><span className="text-gray-400">Color:</span> {pet.color||"—"}</div>
          <div><span className="text-gray-400">Birth Date:</span> {pet.birth_date?new Date(pet.birth_date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"—"}</div>
          <div><span className="text-gray-400">Age:</span> {age!==null?`${age} years`:"—"}</div>
          <div><span className="text-gray-400">Weight:</span> {lastWeight?`${lastWeight.value_numeric} kg (as of ${new Date(lastWeight.entry_date).toLocaleDateString()})`:pet.weight_kg?`${pet.weight_kg} kg`:"—"}</div>
          {pet.microchip_id?<div className="col-span-2"><span className="text-gray-400">Microchip:</span> <span className="font-mono">{pet.microchip_id}</span></div>:null}
        </div>

        {/* Breed Info */}
        {pet.breeds?<div className="bg-indigo-50 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-indigo-800 text-sm">About {pet.breeds.name}</h3>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-indigo-700">
            <div>Origin: {pet.breeds.origin||"—"}</div>
            <div>Lifespan: {pet.breeds.life_expectancy_years_low}–{pet.breeds.life_expectancy_years_high}y</div>
            <div>Litter size: {pet.breeds.litter_size_avg} avg</div>
          </div>
        </div>:null}

        {/* Vaccinations */}
        <h2 className="text-lg font-bold uppercase tracking-wide text-indigo-600 mb-4">Vaccinations</h2>
        {vax.length===0?<p className="text-sm text-gray-400 mb-6">No vaccinations recorded.</p>:(
          <table className="w-full text-sm mb-8"><thead><tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-400"><th className="pb-2">Date</th><th className="pb-2">Vaccine</th><th className="pb-2">Notes</th></tr></thead>
            <tbody>{vax.map((v:A)=><tr key={v.id} className="border-b border-gray-50"><td className="py-2">{new Date(v.entry_date).toLocaleDateString()}</td><td className="py-2 font-medium">{v.value_text}</td><td className="py-2 text-gray-500">{v.notes}</td></tr>)}</tbody></table>
        )}

        {/* Health Timeline */}
        <h2 className="text-lg font-bold uppercase tracking-wide text-indigo-600 mb-4">Health History</h2>
        {entries.length===0?<p className="text-sm text-gray-400">No entries recorded.</p>:(
          <table className="w-full text-sm"><thead><tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-400"><th className="pb-2">Date</th><th className="pb-2">Type</th><th className="pb-2">Value</th></tr></thead>
            <tbody>{entries.slice(0,20).map((e:A)=><tr key={e.id} className="border-b border-gray-50"><td className="py-2">{new Date(e.entry_date).toLocaleDateString()}</td><td className="py-2 capitalize">{e.entry_type.replace("_"," ")}</td><td className="py-2 font-medium">{e.value_numeric!=null?e.value_numeric+(e.entry_type==="weight"?" kg":""):e.value_text||"—"}</td></tr>)}</tbody></table>
        )}

        {/* Footer */}
        <div className="border-t-2 border-indigo-100 pt-4 mt-8 text-center text-xs text-gray-400">
          Generated by PawPort · {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
        </div>
      </div>
    </div>
  </div>);
}
