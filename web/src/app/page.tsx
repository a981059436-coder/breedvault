import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BreedVault — Breed-Specific Health Tracking for Dogs & Cats",
  description:
    "Track breed-specific health conditions, manage breeding records, and stay on top of vaccinations. French Bulldog, Golden Retriever, Cavalier, Ragdoll, Maine Coon and more.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-indigo-600">Breed</span>Vault
          </span>
          <div className="hidden items-center gap-6 text-sm font-medium sm:flex">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#breeds" className="hover:text-indigo-600">Breeds</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a
              href="#waitlist"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
            🐾 5 breeds · 26 conditions · 47 daily care checklists
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Your breed{"'"}s health,
            <br />
            <span className="text-indigo-600">tracked like never before.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Every breed has unique health risks. BreedVault gives you
            breed-specific daily checklists, condition tracking, vaccination
            schedules, and growth curves — all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#waitlist"
              className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Get Early Access — Free
            </a>
            <a
              href="#breeds"
              className="rounded-xl border border-gray-200 px-8 py-3.5 text-base font-semibold text-gray-700 transition hover:border-gray-400"
            >
              See Supported Breeds
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required.</p>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-100 pt-12">
            {[
              { value: "26", label: "Health Conditions Tracked" },
              { value: "5", label: "Breeds Supported (Growing)" },
              { value: "47", label: "Daily Care Checklists" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-indigo-600">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Breeds ─── */}
      <section id="breeds" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Supported Breeds
          </h2>
          <p className="mt-3 text-center text-gray-500">
            Starting with 5 breeds. More added every month.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                emoji: "🐶",
                name: "French Bulldog",
                conditions: "BOAS, IVDD, Hemivertebrae, Hip Dysplasia, Skin Fold Dermatitis, Cherry Eye, Corneal Ulcers, Allergies",
                highlight: "AKC #1 breed — 15+ genetic conditions to track",
              },
              {
                emoji: "🦮",
                name: "Golden Retriever",
                conditions: "Hip/Elbow Dysplasia, Hemangiosarcoma, Lymphoma, PRA, GDV, Hypothyroidism, Atopy",
                highlight: "1 in 8 develop lymphoma. Early detection saves lives.",
              },
              {
                emoji: "🐕",
                name: "Cavalier King Charles",
                conditions: "Mitral Valve Disease, Syringomyelia, Patellar Luxation, Cataracts, Deafness",
                highlight: "Nearly 100% develop heart disease. Daily RRR tracking is critical.",
              },
              {
                emoji: "🐱",
                name: "Ragdoll Cat",
                conditions: "HCM, Neonatal Isoerythrolysis, FLUTD",
                highlight: "30% carry the HCM gene. Annual echocardiograms essential.",
              },
              {
                emoji: "🐈",
                name: "Maine Coon Cat",
                conditions: "HCM, SMA, Hip Dysplasia, FLUTD, PKD",
                highlight: "Breed-specific HCM mutation + SMA DNA testing available.",
              },
            ].map((breed) => (
              <div
                key={breed.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="text-3xl">{breed.emoji}</div>
                <h3 className="mt-3 text-lg font-bold">{breed.name}</h3>
                <p className="mt-2 text-sm font-medium text-indigo-600">
                  {breed.highlight}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-gray-700">Conditions tracked: </span>
                  {breed.conditions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Built for Breeders &amp; Pet Parents
          </h2>
          <p className="mt-3 text-center text-gray-500">
            Everything you need to keep your dog or cat healthy.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🩺",
                title: "Breed-Specific Conditions",
                desc: "Each breed profile includes every known genetic condition, prevalence rate, screening test, and age of onset.",
              },
              {
                icon: "📋",
                title: "Daily Care Checklists",
                desc: "Personalized daily, weekly, and monthly care reminders — from wrinkle cleaning to respiratory rate tracking.",
              },
              {
                icon: "💉",
                title: "Vaccination Schedules",
                desc: "Core and non-core vaccine schedules for both dogs and cats. Push reminders before each due date.",
              },
              {
                icon: "📈",
                title: "Growth Curves",
                desc: "Weight percentiles by breed, sex, and age. Know if your puppy or kitten is on track.",
              },
              {
                icon: "🧬",
                title: "Breeding Records",
                desc: "Heat cycle tracker, pedigree trees, pregnancy timeline, litter management, and buyer-ready puppy passports.",
              },
              {
                icon: "🔔",
                title: "Early Warning Alerts",
                desc: "Elevated resting respiratory rate? Sudden weight change? BreedVault flags it before it becomes an emergency.",
              },
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

      {/* ─── Pricing ─── */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Simple Pricing</h2>
          <p className="mt-3 text-gray-500">
            Start free. Upgrade when you need more.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "Free",
                features: [
                  "1 pet",
                  "Basic health tracking",
                  "Vaccination reminders",
                  "Growth curves",
                ],
                cta: "Get Started",
                featured: false,
              },
              {
                name: "Plus",
                price: "$4.99/mo",
                features: [
                  "Unlimited pets",
                  "Breed-specific alerts",
                  "Export vet reports (PDF)",
                  "Data export",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                featured: true,
              },
              {
                name: "Breeder",
                price: "$14.99/mo",
                features: [
                  "Everything in Plus",
                  "Pedigree trees (5-gen)",
                  "Heat cycle tracker",
                  "Pregnancy & litter management",
                  "Puppy passports",
                  "Buyer sharing links",
                ],
                cta: "Start Free Trial",
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 text-left ${
                  plan.featured
                    ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100 ring-2 ring-indigo-600"
                    : "border-gray-100 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 text-indigo-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Waitlist ─── */}
      <section id="waitlist" className="py-20">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Join the Waitlist
          </h2>
          <p className="mt-3 text-gray-500">
            Be the first to know when BreedVault launches. Early access members
            get Plus free for 3 months.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Notify Me
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">
            No spam. One email when we launch.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-gray-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} BreedVault. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
