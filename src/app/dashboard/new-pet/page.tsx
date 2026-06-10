"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewPetPage() {
  const [breeds, setBreeds] = useState<Array<{id:number;name:string;species:string}>>([]);
  const [form, setForm] = useState({ name:"", breed_id:0, species:"", sex:"", birth_date:"", weight_kg:"", color:"", is_neutered:false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import("@/lib/supabase").then(({ supabase }) => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) { window.location.href = "/login"; return; }
        setUserId(user.id);
      });
      supabase.from("breeds").select("id,name,species").order("species").order("name").then(({ data }) => setBreeds((data as any) ?? []));
    });
  }, []);

  const filtered = form.species ? breeds.filter(b => b.species === form.species) : breeds;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { supabase } = await import("@/lib/supabase");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Not logged in"); setLoading(false); return; }
    const { error: err } = await supabase.from("pets").insert({
      user_id: user.id, name: form.name, breed_id: form.breed_id || null,
      sex: form.sex || null, is_neutered: form.is_neutered,
      birth_date: form.birth_date || null,
      weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
      color: form.color || null,
    });
    if (err) setError(err.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  if (!mounted) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-indigo-600">← Back</Link>
          <Link href="/" className="font-bold"><span className="text-indigo-600">Paw</span>Port</Link>
        </div>
      </header>
      <main className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-2xl font-bold">Add a Pet</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div><label className="text-sm font-medium text-gray-700">Name *</label><input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" placeholder="Buddy" /></div>
          <div><label className="text-sm font-medium text-gray-700">Species</label><select value={form.species} onChange={e=>{setForm({...form,species:e.target.value,breed_id:0})}} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"><option value="">Select species</option><option value="dog">🐶 Dog</option><option value="cat">🐱 Cat</option></select></div>
          <div><label className="text-sm font-medium text-gray-700">Breed</label><select value={form.breed_id} onChange={e=>setForm({...form,breed_id:Number(e.target.value)})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"><option value={0}>Select breed</option>{filtered.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-700">Sex</label><select value={form.sex} onChange={e=>setForm({...form,sex:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"><option value="">—</option><option value="male">♂ Male</option><option value="female">♀ Female</option></select></div><div><label className="text-sm font-medium text-gray-700">Birth Date</label><input type="date" value={form.birth_date} onChange={e=>setForm({...form,birth_date:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" /></div></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-700">Weight (kg)</label><input type="number" step="0.1" value={form.weight_kg} onChange={e=>setForm({...form,weight_kg:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" placeholder="12.5" /></div><div><label className="text-sm font-medium text-gray-700">Color</label><input type="text" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm" placeholder="Brindle" /></div></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_neutered} onChange={e=>setForm({...form,is_neutered:e.target.checked})} className="rounded" />Neutered / Spayed</label>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{loading ? "Saving..." : "Add Pet"}</button>
        </form>
      </main>
    </div>
  );
}
