"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type A=Record<string,any>;

const types=[
  {v:"weight",l:"Weight",p:"Weight (kg)",i:"⚖️",n:true},
  {v:"vet_visit",l:"Vet Visit",p:"Reason / Details",i:"🏥",n:false},
  {v:"vaccination",l:"Vaccination",p:"Vaccine name",i:"💉",n:false},
  {v:"medication",l:"Medication",p:"Medicine & dosage",i:"💊",n:false},
  {v:"symptom",l:"Symptom",p:"Describe symptom",i:"🤒",n:false},
  {v:"boas_score",l:"BOAS Score",p:"Score (0=normal, 3=severe)",i:"🫁",n:true},
  {v:"resting_rr",l:"Resting RR",p:"Breaths per minute",i:"💨",n:true},
  {v:"note",l:"General Note",p:"What happened?",i:"📝",n:false},
];

const breedFields=[
  {key:"heat_start",label:"Last Heat Started",type:"date"},
  {key:"mating_date",label:"Mating Date",type:"date"},
  {key:"pregnancy_due",label:"Due Date (63 days)",type:"date"},
  {key:"litter_size",label:"Expected Litter Size",type:"number"},
];

export default function PetDetail({params}:{params:Promise<{id:string}>}){
  const [id,setId]=useState("");const [pet,setPet]=useState<A|null>(null);const [entries,setE]=useState<A[]>([]);const [ld,setL]=useState(true);const [show,setShow]=useState(false);const [showBreed,setShowBreed]=useState(false);
  const [f,setF]=useState({type:"weight",num:"",txt:"",notes:"",date:new Date().toISOString().slice(0,10)});
  const [bf,setBf]=useState<A>({});

  useEffect(()=>{params.then(p=>setId(p.id))},[]);
  const load=async(pid:string)=>{const {supabase}=await import("@/lib/supabase");const r=await supabase.from("pets").select("*,breeds(name,slug,species)").eq("id",pid).single();setPet(r.data);setBf(r.data?.breeding_data||{});const e=await supabase.from("health_entries").select("*").eq("pet_id",pid).order("entry_date",{ascending:false}).limit(80);setE(e.data??[]);setL(false)};
  useEffect(()=>{if(id)load(id)},[id]);
  const add=async(e:React.FormEvent)=>{e.preventDefault();const {supabase}=await import("@/lib/supabase");await supabase.from("health_entries").insert({pet_id:Number(id),entry_type:f.type,entry_date:f.date,value_numeric:f.num?parseFloat(f.num):null,value_text:f.txt||null,notes:f.notes||null});setF({type:"weight",num:"",txt:"",notes:"",date:new Date().toISOString().slice(0,10)});setShow(false);load(id)};
  const saveBreeding=async()=>{const {supabase}=await import("@/lib/supabase");await supabase.from("pets").update({breeding_data:bf}).eq("id",Number(id));setShowBreed(false);load(id)};

  // Calculate pregnancy progress
  const isPregnant=bf.mating_date&&!bf.litter_born;
  const dueDate=bf.mating_date?new Date(new Date(bf.mating_date).getTime()+63*86400000).toISOString().slice(0,10):null;
  const today=new Date().toISOString().slice(0,10);
  const pregDay=bf.mating_date?Math.floor((new Date().getTime()-new Date(bf.mating_date).getTime())/86400000):0;

  if(ld)return<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"/></div>
  if(!pet)return<div className="flex items-center justify-center min-h-screen text-gray-500">Pet not found.</div>
  const sel=types.find(t=>t.v===f.type);
  const isFemale=pet.sex==="female";

  return(<div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="border-b border-gray-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/dashboard" className="text-sm text-gray-500 hover:text-indigo-600">← My Pets</Link><Link href="/" className="font-bold"><span className="text-indigo-600">Paw</span>Port</Link></div></header>
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="rounded-2xl bg-white border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">{pet.breeds?.species==="cat"?"🐱":"🐶"}</div>
          <div><h1 className="text-2xl font-bold">{pet.name}</h1>
          <p className="text-gray-500">{pet.breeds?.name}{pet.sex?` · ${pet.sex==="male"?"Male":"Female"}`:""}{pet.is_neutered?" · Neutered":""}</p>
          </div>
        </div>
      </div>

      {/* Breeding Section — only for female intact pets */}
      {isFemale&&!pet.is_neutered?<div className="rounded-2xl bg-white border border-rose-100 p-6 mb-8">
        <div className="flex items-center justify-between"><h2 className="font-bold text-rose-700">🧬 Breeding Tracker</h2><button onClick={()=>setShowBreed(!showBreed)} className="text-sm text-rose-600 hover:underline">{showBreed?"Done":"Edit"}</button></div>
        {isPregnant?<div className="mt-4 p-4 bg-rose-50 rounded-xl"><div className="flex items-center justify-between"><span className="font-bold text-rose-800">🤰 Pregnant — Day {pregDay}/63</span><span className="text-sm text-rose-600">Due: {dueDate}</span></div><div className="mt-2 w-full bg-rose-200 rounded-full h-2"><div className="bg-rose-500 h-2 rounded-full" style={{width:Math.min(100,Math.round(pregDay/63*100))+"%"}}/></div></div>:null}
        {showBreed?<div className="mt-4 space-y-3">{breedFields.map((bf2)=><div key={bf2.key}><label className="text-sm font-medium text-gray-700">{bf2.label}</label><input type={bf2.type} value={bf[bf2.key]||""} onChange={e=>setBf({...bf,[bf2.key]:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"/></div>)}<button onClick={saveBreeding} className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 mt-3">Save Breeding Data</button></div>:(
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">{breedFields.map((bf2)=><div key={bf2.key} className="text-gray-600"><span className="text-gray-400">{bf2.label}:</span> <span className="font-medium">{bf[bf2.key]||"—"}</span></div>)}</div>
        )}
      </div>:null}

      <div className="mb-8">
        {!show?<button onClick={()=>setShow(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">+ Add Health Entry</button>:(
        <form onSubmit={add} className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between"><h2 className="font-bold">New Health Entry</h2><button type="button" onClick={()=>setShow(false)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button></div>
          <div className="grid grid-cols-2 gap-2">{types.slice(0,4).map(t=><button key={t.v} type="button" onClick={()=>setF({...f,type:t.v,num:"",txt:""})} className={"rounded-lg border px-3 py-2 text-sm text-left "+(f.type===t.v?"border-indigo-300 bg-indigo-50":"border-gray-200")}>{t.i} {t.l}</button>)}</div>
          <div className="grid grid-cols-2 gap-2">{types.slice(4).map(t=><button key={t.v} type="button" onClick={()=>setF({...f,type:t.v,num:"",txt:""})} className={"rounded-lg border px-3 py-2 text-sm text-left "+(f.type===t.v?"border-indigo-300 bg-indigo-50":"border-gray-200")}>{t.i} {t.l}</button>)}</div>
          <div><label className="text-sm font-medium text-gray-700">Date</label><input type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"/></div>
          {sel?.n?<div><label className="text-sm font-medium text-gray-700">{sel.p}</label><input type="number" step="0.1" value={f.num} onChange={e=>setF({...f,num:e.target.value})} placeholder={sel.p} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"/></div>:<div><label className="text-sm font-medium text-gray-700">{sel?.p||"Description"}</label><input type="text" value={f.txt} onChange={e=>setF({...f,txt:e.target.value})} placeholder={sel?.p||"Description"} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"/></div>}
          <div><label className="text-sm font-medium text-gray-700">Additional Notes</label><textarea value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} rows={2} placeholder="Any extra details..." className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"/></div>
          <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Save Entry</button>
        </form>)}
      </div>

      <div><h2 className="text-lg font-bold mb-4">Health Timeline</h2>
        {entries.length===0?<p className="text-gray-400 text-sm">No entries yet.</p>:<div className="space-y-3">{entries.map((e:A)=>{const t=types.find(x=>x.v===e.entry_type);return(
          <div key={e.id} className="rounded-xl bg-white border border-gray-100 p-4 flex items-start gap-3"><span className="text-lg mt-0.5">{t?.i||"📌"}</span><div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="font-medium text-sm">{t?.l||e.entry_type}</span><span className="text-xs text-gray-400">{new Date(e.entry_date).toLocaleDateString()}</span></div>{(e.value_numeric!=null||e.value_text)&&<p className="text-sm font-semibold mt-0.5">{e.value_numeric!=null?`${e.value_numeric}${e.entry_type==="weight"?" kg":""}${e.entry_type==="resting_rr"?" breaths/min":""}`:e.value_text}</p>}{e.notes&&<p className="text-xs text-gray-500 mt-1">{e.notes}</p>}</div></div>
        )})}</div>}
      </div>
    </main></div>);
}
