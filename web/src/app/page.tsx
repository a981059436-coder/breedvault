import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PawPort — Breed-Specific Health Tracking for Dogs & Cats",
  description:
    "Track breed-specific health conditions, manage breeding records, and stay on top of vaccinations. French Bulldog, Golden Retriever, Cavalier, Ragdoll, Maine Coon and more.",
};

const breeds = [
  { emoji: "🐶", name: "French Bulldog", slug: "french-bulldog", conditions: "BOAS, IVDD, Hemivertebrae, Hip Dysplasia, Skin Fold Dermatitis, Cherry Eye, Corneal Ulcers, Allergies", highlight: "AKC #1 breed — 15+ genetic conditions to track" },
  { emoji: "🦮", name: "Golden Retriever", slug: "golden-retriever", conditions: "Hip/Elbow Dysplasia, Hemangiosarcoma, Lymphoma, PRA, GDV, Hypothyroidism, Atopy", highlight: "1 in 8 develop lymphoma. Early detection saves lives." },
  { emoji: "🐕", name: "Cavalier King Charles", slug: "cavalier-king-charles-spaniel", conditions: "Mitral Valve Disease, Syringomyelia, Patellar Luxation, Cataracts, Deafness", highlight: "Nearly 100% develop heart disease. Daily RRR tracking is critical." },
  { emoji: "🐱", name: "Ragdoll Cat", slug: "ragdoll", conditions: "HCM, Neonatal Isoerythrolysis, FLUTD", highlight: "30% carry the HCM gene. Annual echocardiograms essential." },
  { emoji: "🐈", name: "Maine Coon Cat", slug: "maine-coon", conditions: "HCM, SMA, Hip Dysplasia, FLUTD, PKD", highlight: "Breed-specific HCM mutation + SMA DNA testing available." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-indigo-600">Paw</span>Port
          </span>
          <div className="hidden items-center gap-6 text-sm font-medium sm:flex">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#breeds" className="hover:text-indigo-600">Breeds</a>
            <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link href="/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Sign In</Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
            🐾 5 breeds · 26 conditions · 44 daily care checklists
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Your breed&apos;s health, <span className="text-indigo-600">tracked like never before.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Every breed has unique health risks. PawPort gives you breed-specific daily checklists, condition tracking, vaccination schedules, and growth curves — all in one place.
          </p>
        </div>
      </section>

      <section id="breeds" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">Supported Breeds</h2>
          <p className="mt-3 text-center text-gray-500">Click a breed to see detailed health data.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {breeds.map((b) => (
              <Link key={b.slug} href={`/breeds/${b.slug}`} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-200">
                <div className="text-3xl">{b.emoji}</div>
                <h3 className="mt-3 text-lg font-bold">{b.name}</h3>
                <p className="mt-2 text-sm font-medium text-indigo-600">{b.highlight}</p>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-gray-700">Conditions tracked: </span>{b.conditions}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">Built for Breeders &amp; Pet Parents</h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🩺", title: "Breed-Specific Conditions", desc: "Each breed profile includes every known genetic condition, prevalence rate, screening test, and age of onset." },
              { icon: "📋", title: "Daily Care Checklists", desc: "Personalized daily, weekly, and monthly care reminders — from wrinkle cleaning to respiratory rate tracking." },
              { icon: "💉", title: "Vaccination Schedules", desc: "Core and non-core vaccine schedules for both dogs and cats. Push reminders before each due date." },
              { icon: "📈", title: "Growth Curves", desc: "Weight percentiles by breed, sex, and age. Know if your puppy or kitten is on track." },
              { icon: "🧬", title: "Breeding Records", desc: "Heat cycle tracker, pedigree trees, pregnancy timeline, litter management, and buyer-ready puppy passports." },
              { icon: "🔔", title: "Early Warning Alerts", desc: "Elevated resting respiratory rate? Sudden weight change? PawPort flags it before it becomes an emergency." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 p-6">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-gray-400 sm:flex-row">
          <span>© {new Date().getFullYear()} PawPort. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
