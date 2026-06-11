import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PawPort — Breed-Specific Health Tracking for Dogs & Cats",
  description:
    "Track breed-specific health conditions, manage breeding records, and stay on top of vaccinations. French Bulldog, Golden Retriever, Cavalier, Ragdoll, Maine Coon and more.",
};

const breeds = [
  { emoji: "🐶", name: "French Bulldog", slug: "french-bulldog", conditions: "BOAS, IVDD, Hemivertebrae, Hip Dysplasia, Skin Fold Dermatitis, Cherry Eye", highlight: "AKC #1 breed — 15+ genetic conditions to track" },
  { emoji: "🦮", name: "Golden Retriever", slug: "golden-retriever", conditions: "Hip/Elbow Dysplasia, Hemangiosarcoma, Lymphoma, PRA, GDV, Atopy", highlight: "1 in 8 develop lymphoma. Early detection saves lives." },
  { emoji: "🐕", name: "Cavalier King Charles", slug: "cavalier-king-charles-spaniel", conditions: "Mitral Valve Disease, Syringomyelia, Patellar Luxation, Cataracts, Deafness", highlight: "Nearly 100% develop heart disease." },
  { emoji: "🐱", name: "Ragdoll Cat", slug: "ragdoll", conditions: "HCM, Neonatal Isoerythrolysis, FLUTD", highlight: "30% carry the HCM gene" },
  { emoji: "🐈", name: "Maine Coon Cat", slug: "maine-coon", conditions: "HCM, SMA, Hip Dysplasia, FLUTD, PKD", highlight: "Breed-specific HCM mutation" },
  { emoji: "🦴", name: "Labrador Retriever", slug: "labrador-retriever", conditions: "Hip/Elbow Dysplasia, EIC, Obesity, PRA", highlight: "World's most popular breed" },
  { emoji: "🐺", name: "German Shepherd", slug: "german-shepherd-dog", conditions: "Hip Dysplasia, DM, Bloat, Elbow Dysplasia", highlight: "Versatile working dog" },
  { emoji: "🌭", name: "Dachshund", slug: "dachshund", conditions: "IVDD, Obesity, Patellar Luxation, Dental", highlight: "25% affected by IVDD" },
  { emoji: "🐩", name: "Poodle", slug: "poodle", conditions: "Addison's, SA, Hip Dysplasia, PRA, Bloat", highlight: "3 sizes, shared health concerns" },
  { emoji: "🐷", name: "English Bulldog", slug: "english-bulldog", conditions: "BOAS, Skin Fold Dermatitis, Cherry Eye, Hip Dysplasia", highlight: "Daily wrinkle care essential" },
  { emoji: "🥊", name: "Boxer", slug: "boxer", conditions: "Lymphoma, DCM, Aortic Stenosis, Mast Cell Tumors", highlight: "Cancer is #1 cause of death" },
  { emoji: "🐰", name: "Beagle", slug: "beagle", conditions: "Epilepsy, Hypothyroidism, IVDD, Ear Infections", highlight: "Curious scent hound" },
  { emoji: "🛡️", name: "Rottweiler", slug: "rottweiler", conditions: "Osteosarcoma, Hip Dysplasia, Aortic Stenosis", highlight: "Bone cancer risk elevated" },
  { emoji: "👑", name: "Persian Cat", slug: "persian", conditions: "PKD, HCM, PRA, Brachycephalic Issues", highlight: "40% affected by PKD" },
  { emoji: "💎", name: "Siamese Cat", slug: "siamese", conditions: "PRA, Asthma, Amyloidosis, Dental Disease", highlight: "Vocal & social companion" },
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
            <Link href="/pricing" className="hover:text-indigo-600">Pricing</Link>
            <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link href="/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Sign In</Link>
