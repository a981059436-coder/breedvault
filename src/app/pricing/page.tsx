"use client";

import Link from "next/link";

const PAYPAL = "https://paypal.me/Ligb18";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold"><span className="text-indigo-600">Paw</span>Port</Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600">← Home</Link>
        </div>
      </header>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when your kennel grows.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                name: "Basic", price: "Free",
                features: ["1 pet", "Basic health tracking", "Vaccination reminders", "Growth curves", "Breed health guides"],
                cta: "Get Started", href: "/login",
              },
              {
                name: "Plus", price: "$4.99", period: "/month",
                features: ["Unlimited pets", "All Basic features", "Breed-specific alerts", "Export vet reports (PDF)", "Pet Passport", "Priority support"],
                cta: "Subscribe via PayPal", paypal: true, amount: "4.99",
                featured: true,
              },
              {
                name: "Breeder", price: "$14.99", period: "/month",
                features: ["Everything in Plus", "Breeding tracker", "Pregnancy timeline", "Litter management", "Puppy passports", "Buyer sharing links"],
                cta: "Subscribe via PayPal", paypal: true, amount: "14.99",
                featured: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-8 text-left ${plan.featured ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100 ring-2 ring-indigo-600" : "border-gray-100 bg-white"}`}>
                {plan.featured && <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Most Popular</span>}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-2"><span className="text-3xl font-extrabold">{plan.price}</span>{plan.period && <span className="text-gray-400">{plan.period}</span>}</div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-gray-600"><span className="mt-0.5 text-indigo-500">✓</span> {f}</li>))}
                </ul>
                {plan.paypal ? (
                  <div>
                    <a href={PAYPAL} target="_blank" rel="noopener" className={`mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${plan.featured ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-200 text-gray-700 hover:border-gray-400"}`}>{plan.cta}</a>
                    <p className="mt-3 text-xs text-gray-400 text-center">Include your email in the PayPal note for instant activation</p>
                  </div>
                ) : (
                  <Link href={plan.href} className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${plan.featured ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-200 text-gray-700 hover:border-gray-400"}`}>{plan.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400">
          <Link href="/" className="font-bold text-gray-700"><span className="text-indigo-600">Paw</span>Port</Link><span className="ml-4">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
