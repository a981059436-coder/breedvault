"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
type A=Record<string,any>;

// Hardcoded breed data — ensures all 15 breeds have detail pages even before DB seeding
const EXTRA:Record<string,A> = {
  "labrador-retriever":{name:"Labrador Retriever",species:"dog",akc_group:"Sporting",origin:"Canada/UK",weight_male_kg_low:29,weight_male_kg_high:36,weight_female_kg_low:25,weight_female_kg_high:32,height_cm_low:55,height_cm_high:62,life_expectancy_years_low:10,life_expectancy_years_high:14,litter_size_avg:7,gestation_days:63,heat_cycle_days:180,coat_colors:["black","yellow","chocolate","fox red"],temperament:["friendly","active","outgoing","gentle","intelligent"],description:"The Labrador Retriever is the most popular dog breed in the US, UK, and Canada. Friendly, active, and outgoing, Labs excel as family companions and working dogs. As a large breed, they are prone to hip and elbow dysplasia, obesity, and exercise-induced collapse (EIC). Routine orthopedic screening and weight management are essential.",
  conditions:[
    {name:"Hip Dysplasia",category:"orthopedic",severity_score:4,prevalence_rate:12,description:"Abnormal hip joint development causing pain and arthritis. Labs are heavily screened for this.",symptoms:["hind limb lameness","bunny-hopping","difficulty rising","muscle atrophy"],screening_test:"OFA hip radiograph or PennHIP",screening_freq:"Once at 2 years",age_of_onset:"Puppy to adult",notes:"Keep lean — obesity dramatically worsens HD."},
    {name:"Elbow Dysplasia",category:"orthopedic",severity_score:4,prevalence_rate:10,description:"Developmental elbow abnormality causing forelimb lameness.",symptoms:["forelimb lameness","elbow swelling","reduced range of motion"],screening_test:"OFA elbow radiograph",screening_freq:"Once at 2 years",age_of_onset:"Puppy (4-10 months)",notes:"Often concurrent with hip dysplasia."},
    {name:"GDV / Bloat",category:"other",severity_score:5,prevalence_rate:5,description:"Life-threatening stomach twisting. Deep-chested breeds at highest risk.",symptoms:["distended abdomen","unproductive retching","collapse","pale gums"],screening_test:"None; prophylactic gastropexy recommended",screening_freq:"Consider at spay/neuter",age_of_onset:"Adult"},
    {name:"Progressive Retinal Atrophy",category:"ocular",severity_score:4,prevalence_rate:2,description:"Inherited retinal degeneration causing blindness.",symptoms:["night blindness","dilated pupils","bumping into objects"],screening_test:"DNA test + OFA CAER",screening_freq:"DNA once; eye exam annually",age_of_onset:"Adult (3-6 years)"},
    {name:"Allergic Dermatitis",category:"dermatological",severity_score:3,prevalence_rate:15,description:"Chronic allergic skin disease from environmental or food triggers.",symptoms:["intense itching","ear infections","paw licking","skin redness"],screening_test:"Allergy testing + elimination diet",age_of_onset:"1-3 years"}
  ],
  checklists:[
    {task_name:"Weight check & body condition",frequency:"weekly",category:"health",description:"Labs gain weight easily. Keep lean — you should feel ribs. Obesity accelerates joint disease.",warning_signs:["weight gain >5%/month","loss of waist","lethargy"]},
    {task_name:"Joint mobility check",frequency:"monthly",category:"health",description:"Monitor stiffness, limping, or reluctance to exercise. Early detection preserves joint health.",warning_signs:["morning stiffness","bunny-hopping","limping"]},
    {task_name:"Ear cleaning & inspection",frequency:"weekly",category:"grooming",description:"Floppy ears trap moisture. Clean weekly, especially after swimming.",warning_signs:["head shaking","foul odor","dark discharge"]},
    {task_name:"Coat brushing",frequency:"weekly",category:"grooming",description:"Double coat sheds heavily. Weekly brushing reduces fur.",warning_signs:["bald patches","excessive dandruff"]},
    {task_name:"Bloat prevention",frequency:"daily",category:"health",description:"Feed 2-3 small meals. No exercise 1hr before/after eating.","warning_signs":["distended abdomen","unproductive retching","restlessness"]}
  ],
  growth_male:[{age_weeks:8,weight_kg_p5:4.5,weight_kg_p50:6.4,weight_kg_p95:8.2},{age_weeks:16,weight_kg_p5:11,weight_kg_p50:14.5,weight_kg_p95:18},{age_weeks:24,weight_kg_p5:18,weight_kg_p50:22,weight_kg_p95:26},{age_weeks:52,weight_kg_p5:25,weight_kg_p50:29,weight_kg_p95:34}],
  growth_female:[{age_weeks:8,weight_kg_p5:4,weight_kg_p50:5.5,weight_kg_p95:7},{age_weeks:16,weight_kg_p5:10,weight_kg_p50:13,weight_kg_p95:16},{age_weeks:24,weight_kg_p5:16,weight_kg_p50:20,weight_kg_p95:23},{age_weeks:52,weight_kg_p5:22,weight_kg_p50:27,weight_kg_p95:30}]},
  "german-shepherd-dog":{name:"German Shepherd Dog",species:"dog",akc_group:"Herding",origin:"Germany",weight_male_kg_low:30,weight_male_kg_high:40,weight_female_kg_low:22,weight_female_kg_high:32,height_cm_low:55,height_cm_high:65,life_expectancy_years_low:9,life_expectancy_years_high:13,litter_size_avg:8,gestation_days:63,heat_cycle_days:180,coat_colors:["black and tan","sable","black"],temperament:["intelligent","loyal","confident","courageous"],description:"The German Shepherd Dog is a large, agile, and muscular working breed known for intelligence, loyalty, and versatility. GSDs serve as police, military, guide, and search-and-rescue dogs worldwide. Health concerns center on hip and elbow dysplasia, degenerative myelopathy, and bloat.",
  conditions:[
    {name:"Hip Dysplasia",category:"orthopedic",severity_score:5,prevalence_rate:20,description:"GSDs have one of the highest HD rates of all breeds.",symptoms:["hind limb lameness","bunny-hopping","difficulty rising"],screening_test:"OFA hip radiograph or PennHIP",screening_freq:"Once at 2 years",age_of_onset:"Puppy to adult",notes:"PennHIP at 16 weeks can predict risk."},
    {name:"Elbow Dysplasia",category:"orthopedic",severity_score:4,prevalence_rate:12,description:"Developmental elbow abnormality.",symptoms:["forelimb lameness","elbow swelling"],screening_test:"OFA elbow radiograph",screening_freq:"Once at 2 years",age_of_onset:"Puppy"},
    {name:"GDV / Bloat",category:"other",severity_score:5,prevalence_rate:7,description:"Life-threatening stomach twisting in deep-chested breeds.",symptoms:["distended abdomen","unproductive retching","collapse"],screening_test:"Gastropexy recommended",screening_freq:"At spay/neuter",age_of_onset:"Adult",notes:"Prophylactic gastropexy saves lives."},
    {name:"Allergic Dermatitis",category:"dermatological",severity_score:3,prevalence_rate:20,description:"GSDs are poster dogs for atopy.",symptoms:["paw licking","ear infections","skin redness","hot spots"],screening_test:"Allergy testing",age_of_onset:"1-4 years"}
  ],
  checklists:[
    {task_name:"Joint mobility check",frequency:"weekly",category:"health",description:"Watch gait, stair-climbing ability, rising from rest. Keep lean.",warning_signs:["bunny-hopping","slowness rising","limping","muscle atrophy"]},
    {task_name:"Coat brushing",frequency:"daily",category:"grooming",description:"Heavy double coat — known as 'German Shedders'. Daily brushing essential.",warning_signs:["bald patches","matted undercoat"]},
    {task_name:"Weight monitoring",frequency:"weekly",category:"health",description:"Excess weight dramatically worsens joint outcomes.",warning_signs:["weight gain","loss of waist"]},
    {task_name:"Bloat prevention",frequency:"daily",category:"health",description:"Deep chest = high GDV risk. Small meals, limit activity around meals.","warning_signs:["distended abdomen","unproductive retching","pale gums"]}
  ],
  growth_male:[{age_weeks:8,weight_kg_p5:5.5,weight_kg_p50:7.5,weight_kg_p95:9},{age_weeks:16,weight_kg_p5:13,weight_kg_p50:17,weight_kg_p95:22},{age_weeks:52,weight_kg_p5:28,weight_kg_p50:35,weight_kg_p95:40}],
  growth_female:[{age_weeks:8,weight_kg_p5:4.5,weight_kg_p50:6.5,weight_kg_p95:8},{age_weeks:16,weight_kg_p5:11,weight_kg_p50:15,weight_kg_p95:19},{age_weeks:52,weight_kg_p5:22,weight_kg_p50:29,weight_kg_p95:32}]},
  "dachshund":{name:"Dachshund",species:"dog",akc_group:"Hound",origin:"Germany",weight_male_kg_low:7,weight_male_kg_high:15,weight_female_kg_low:7,weight_female_kg_high:15,height_cm_low:13,height_cm_high:23,life_expectancy_years_low:12,life_expectancy_years_high:16,litter_size_avg:4,gestation_days:63,heat_cycle_days:180,coat_colors:["red","black and tan","chocolate","cream","dapple"],temperament:["curious","devoted","playful","brave"],description:"The Dachshund is a small hound with a long body and short legs. The breed's elongated spine makes Intervertebral Disc Disease (IVDD) the primary health crisis — approximately 25% are affected. Weight control and avoiding jumping/stairs are critical.",
  conditions:[
    {name:"Intervertebral Disc Disease",category:"neurological",severity_score:5,prevalence_rate:25,description:"Degeneration and herniation of spinal discs. THE #1 concern for this breed.",symptoms:["reluctance to move","flinching when back touched","hind limb weakness","paralysis","loss of bladder control"],screening_test:"Neurological exam + MRI if symptomatic",screening_freq:"Monitor daily for signs",age_of_onset:"Adult (3-6 years)",notes:"No jumping off furniture. No stairs. Use ramps. Weight control is critical."},
    {name:"Patellar Luxation",category:"orthopedic",severity_score:3,prevalence_rate:10,description:"Dislocating kneecap, common in small breeds.",symptoms:["skip-hopping gait","hind limb lameness"],screening_test:"Physical exam",screening_freq:"Annually"},
    {name:"Cataracts",category:"ocular",severity_score:3,prevalence_rate:5,description:"Lens opacity causing vision loss.",symptoms:["cloudy eye","bumping into objects"],screening_test:"OFA CAER eye exam",screening_freq:"Annually"}
  ],
  checklists:[
    {task_name:"Back safety — NO jumping",frequency:"daily",category:"health",description:"No jumping off furniture. No stairs without gate. Use ramps. 25% get IVDD.",warning_signs:["flinching","dragging paws","loss of bladder control","crying"]},
    {task_name:"Weight control",frequency:"weekly",category:"health",description:"Extra weight = extra pressure on spine. The single best thing you can do.",warning_signs:["weight gain","rounded belly"]},
    {task_name:"Ear inspection",frequency:"weekly",category:"grooming",description:"Long floppy ears limit airflow. Check weekly.",warning_signs:["head shaking","dark discharge","foul smell"]}
  ],
  growth_male:[{age_weeks:8,weight_kg_p5:1.8,weight_kg_p50:2.5,weight_kg_p95:3.2},{age_weeks:52,weight_kg_p5:7,weight_kg_p50:9,weight_kg_p95:12}],
  growth_female:[{age_weeks:8,weight_kg_p5:1.5,weight_kg_p50:2.2,weight_kg_p95:3},{age_weeks:52,weight_kg_p5:6,weight_kg_p50:8,weight_kg_p95:11}]},
  "persian":{name:"Persian",species:"cat",tica_group:"Persian",origin:"Iran",weight_male_kg_low:4,weight_male_kg_high:5.5,weight_female_kg_low:3.5,weight_female_kg_high:5,height_cm_low:25,height_cm_high:38,life_expectancy_years_low:12,life_expectancy_years_high:17,litter_size_avg:4,gestation_days:65,coat_colors:["white","black","blue","cream","silver","golden"],temperament:["calm","gentle","affectionate","quiet"],description:"The Persian is a long-haired cat breed with a distinctive round face, short muzzle, and calm personality. Up to 40% are affected by Polycystic Kidney Disease (PKD). Brachycephalic facial structure causes respiratory and dental issues.",
  conditions:[
    {name:"Polycystic Kidney Disease",category:"urinary",severity_score:5,prevalence_rate:40,description:"Fluid-filled cysts replacing kidney tissue. Autosomal dominant — one gene copy = disease.",symptoms:["increased thirst","increased urination","weight loss","lethargy","vomiting"],screening_test:"Renal ultrasound + DNA test",screening_freq:"Once for breeding; annually if affected",age_of_onset:"Adult",notes:"Up to 40% affected. DNA test all breeding cats."},
    {name:"Hypertrophic Cardiomyopathy",category:"cardiac",severity_score:5,prevalence_rate:15,description:"Heart muscle thickening, the most common heart disease in cats.",symptoms:["often asymptomatic","rapid breathing","hind limb paralysis","sudden death"],screening_test:"Echocardiogram",screening_freq:"Annually from age 1",age_of_onset:"Adult"},
    {name:"Progressive Retinal Atrophy",category:"ocular",severity_score:4,prevalence_rate:5,description:"Inherited retinal degeneration. Night blindness is first sign.",symptoms:["night blindness","dilated pupils"],screening_test:"DNA test + eye exam",screening_freq:"DNA once; exam annually",age_of_onset:"Young adult"}
  ],
  checklists:[
    {task_name:"Eye cleaning",frequency:"daily",category:"grooming",description:"Flat face causes tear overflow. Wipe gently with damp cloth daily.",warning_signs:["excessive tearing","brown staining","squinting","redness"]},
    {task_name:"Coat grooming",frequency:"daily",category:"grooming",description:"Long dense coat mats without daily brushing. Focus on armpits and belly.",warning_signs:["matted fur","hairballs","bald spots"]},
    {task_name:"Hydration monitoring",frequency:"daily",category:"health",description:"PKD affects 40%. Increased thirst is earliest sign of kidney decline.",warning_signs:["drinking more than usual","urinating more","weight loss","lethargy"]},
    {task_name:"Respiratory check",frequency:"weekly",category:"health",description:"Flat face = brachycephalic airway. Watch for noisy breathing.",warning_signs:["open-mouth breathing","noisy breathing","exercise intolerance"]}
  ],
  growth_male:[{age_weeks:8,weight_kg_p5:0.7,weight_kg_p50:1,weight_kg_p95:1.3},{age_weeks:52,weight_kg_p5:3.5,weight_kg_p50:4.5,weight_kg_p95:5.5}],
  growth_female:[{age_weeks:8,weight_kg_p5:0.6,weight_kg_p50:0.9,weight_kg_p95:1.2},{age_weeks:52,weight_kg_p5:3.2,weight_kg_p50:4,weight_kg_p95:5}]},
  "siamese":{name:"Siamese",species:"cat",tica_group:"Siamese",origin:"Thailand",weight_male_kg_low:3.5,weight_male_kg_high:5.5,weight_female_kg_low:3,weight_female_kg_high:4.5,height_cm_low:20,height_cm_high:30,life_expectancy_years_low:12,life_expectancy_years_high:20,litter_size_avg:5,gestation_days:65,coat_colors:["seal point","blue point","chocolate point","lilac point"],temperament:["vocal","affectionate","intelligent","social"],description:"The Siamese is one of the most recognizable cat breeds, known for striking blue almond-shaped eyes, color-pointed coat, and extremely vocal, social personality. Common concerns include PRA, asthma, and dental disease.",
  conditions:[
    {name:"Progressive Retinal Atrophy",category:"ocular",severity_score:4,prevalence_rate:5,description:"Inherited retinal degeneration. Night blindness is first sign.",symptoms:["night blindness","dilated pupils","reluctance in darkness"],screening_test:"DNA test + eye exam",screening_freq:"DNA once; exam annually",age_of_onset:"Young adult"},
    {name:"Dental Disease",category:"dental",severity_score:3,prevalence_rate:30,description:"Siamese are prone to periodontal disease and tooth resorption.",symptoms:["bad breath","red gums","drooling","reluctance to eat"],screening_test:"Dental exam",screening_freq:"Every 6-12 months"},
    {name:"Amyloidosis",category:"other",severity_score:4,prevalence_rate:3,description:"Abnormal protein deposits in liver, causing organ failure.",symptoms:["lethargy","weight loss","jaundice","vomiting"],screening_test:"Liver biopsy",age_of_onset:"Adult"}
  ],
  checklists:[
    {task_name:"Dental care",frequency:"weekly",category:"health",description:"Brush teeth regularly. Siamese prone to dental disease.",warning_signs:["bad breath","red gums","drooling"]},
    {task_name:"Eye check",frequency:"monthly",category:"health",description:"Watch for night vision issues — first sign of PRA.",warning_signs:["bumping into objects in dim light","dilated pupils"]},
    {task_name:"Coat care",frequency:"weekly",category:"grooming",description:"Short coat, minimal grooming needed. Weekly brushing removes loose fur.",warning_signs:["bald patches","excessive dandruff"]}
  ],
  growth_male:[{age_weeks:8,weight_kg_p5:0.7,weight_kg_p50:1,weight_kg_p95:1.3},{age_weeks:52,weight_kg_p5:3.5,weight_kg_p50:4.5,weight_kg_p95:5.5}],
  growth_female:[{age_weeks:8,weight_kg_p5:0.6,weight_kg_p50:0.9,weight_kg_p95:1.2},{age_weeks:52,weight_kg_p5:3,weight_kg_p50:3.8,weight_kg_p95:4.5}]},
};

const cc:Record<string,string>={hereditary:"bg-red-500",orthopedic:"bg-amber-500",cardiac:"bg-pink-500",ocular:"bg-blue-500",respiratory:"bg-cyan-500",dermatological:"bg-orange-500",neurological:"bg-purple-500",endocrine:"bg-teal-500",urinary:"bg-indigo-500",reproductive:"bg-rose-500",dental:"bg-emerald-500",other:"bg-gray-500"};
const fq:Record<string,A>={daily:{c:"bg-red-100 text-red-700",l:"Daily"},weekly:{c:"bg-amber-100 text-amber-700",l:"Weekly"},monthly:{c:"bg-blue-100 text-blue-700",l:"Monthly"},quarterly:{c:"bg-purple-100 text-purple-700",l:"Quarterly"},annually:{c:"bg-green-100 text-green-700",l:"Annually"}};

function BreedPageInner({b,conds,cl,gr}:{b:A;conds:A[];cl:A[];gr:A[]}){
  const male=gr.filter((g:A)=>g.sex==="male"),female=gr.filter((g:A)=>g.sex==="female");
  return(<div className="min-h-screen bg-white text-gray-900">
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-50"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/" className="text-xl font-bold"><span className="text-indigo-600">Paw</span>Port</Link><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600">← All Breeds</Link></div></header>
    <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50 py-16"><div className="mx-auto max-w-6xl px-6"><div className="flex flex-wrap gap-3 mb-4"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{b.species==="dog"?"🐶 Dog":"🐱 Cat"}</span>{b.akc_group?<span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">AKC: {b.akc_group}</span>:null}{b.tica_group?<span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">TICA: {b.tica_group}</span>:null}<span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{b.origin}</span></div><h1 className="text-4xl font-extrabold">{b.name}</h1><p className="mt-4 max-w-2xl text-gray-600">{b.description}</p></div></section>
    <section className="border-b border-gray-100"><div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">{[["Weight (Male)",b.weight_male_kg_low+"–"+b.weight_male_kg_high+" kg"],["Weight (Female)",b.weight_female_kg_low+"–"+b.weight_female_kg_high+" kg"],["Height",b.height_cm_low+"–"+b.height_cm_high+" cm"],["Lifespan",b.life_expectancy_years_low+"–"+b.life_expectancy_years_high+" years"]].map(([l,v]:string[])=><div key={l} className="px-6 py-4 text-center"><div className="text-xs text-gray-400 uppercase tracking-wider">{l}</div><div className="mt-1 text-sm font-bold">{v}</div></div>)}</div></section>
    <div className="mx-auto max-w-6xl px-6 py-12"><div className="grid gap-12 lg:grid-cols-3"><div className="lg:col-span-2 space-y-12">
      <section><h2 className="text-2xl font-bold">🩺 Health Conditions</h2><p className="mt-1 text-sm text-gray-500">{conds.length} conditions tracked.</p><div className="mt-6 space-y-4">{conds.map((c:A)=>{const sev=Number(c.severity_score)||0;const cat=cc[c.category]||"bg-gray-500";return(<details key={c.name} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><summary className="flex cursor-pointer items-start justify-between list-none"><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{c.name}</h3><span className={"rounded-full px-2 py-0.5 text-xs text-white "+cat}>{c.category}</span>{sev>0?<span className="text-xs text-gray-400">{"★".repeat(sev)}{"☆".repeat(5-sev)}</span>:null}</div>{c.prevalence_rate?<p className="mt-1 text-sm text-indigo-600 font-medium">~{c.prevalence_rate}% affected</p>:null}</div><span className="text-gray-300 group-open:rotate-180">▼</span></summary><div className="mt-4 space-y-3 border-t border-gray-50 pt-4 text-sm"><p className="text-gray-600">{c.description}</p>{c.age_of_onset?<p><b>Onset:</b> {c.age_of_onset}</p>:null}{c.screening_test?<p><b>Screening:</b> {c.screening_test}</p>:null}{c.screening_freq?<p><b>Frequency:</b> {c.screening_freq}</p>:null}{Array.isArray(c.symptoms)&&c.symptoms.length>0?<div><b>Symptoms:</b><div className="mt-1 flex flex-wrap gap-1">{c.symptoms.map((s:string,i:number)=><span key={i} className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700">{s}</span>)}</div></div>:null}{c.notes?<p className="rounded-lg bg-amber-50 p-3 text-amber-800">💡 {c.notes}</p>:null}</div></details>)})}</div></section>
      {male.length>0?<section><h2 className="text-2xl font-bold">📈 Growth Curve</h2><div className="mt-6 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-400"><th className="pb-2">Weeks</th><th className="pb-2">♂P5</th><th className="pb-2">♂P50</th><th className="pb-2">♂P95</th><th className="pb-2">♀P5</th><th className="pb-2">♀P50</th><th className="pb-2">♀P95</th></tr></thead><tbody>{male.map((m:A)=>{const f=female.find((x:A)=>x.age_weeks===m.age_weeks);return(<tr key={m.age_weeks} className="border-b border-gray-50"><td className="py-2 font-medium">{m.age_weeks}</td><td className="py-2">{m.weight_kg_p5}</td><td className="py-2 font-semibold">{m.weight_kg_p50}</td><td className="py-2">{m.weight_kg_p95}</td><td className="py-2">{f?f.weight_kg_p5:"—"}</td><td className="py-2 font-semibold">{f?f.weight_kg_p50:"—"}</td><td className="py-2">{f?f.weight_kg_p95:"—"}</td></tr>)})}</tbody></table></div></section>:null}
    </div>
    <aside className="space-y-8"><div className="rounded-2xl border border-gray-100 bg-gray-50 p-6"><h3 className="font-bold">Quick Facts</h3><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-gray-500">Litter</dt><dd className="font-medium">{b.litter_size_avg} avg</dd></div><div className="flex justify-between"><dt className="text-gray-500">Gestation</dt><dd className="font-medium">{b.gestation_days}d</dd></div>{b.heat_cycle_days?<div className="flex justify-between"><dt className="text-gray-500">Heat Cycle</dt><dd className="font-medium">~{b.heat_cycle_days}d</dd></div>:null}</dl></div><div className="rounded-2xl border border-gray-100 p-6"><h3 className="font-bold">Temperament</h3><div className="mt-3 flex flex-wrap gap-2">{(Array.isArray(b.temperament)?b.temperament:[]).map((t:string)=><span key={t} className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">{t}</span>)}</div></div><div className="rounded-2xl border border-gray-100 p-6"><h3 className="font-bold">Coat Colors</h3><div className="mt-3 flex flex-wrap gap-2">{(Array.isArray(b.coat_colors)?b.coat_colors:[]).map((c:string)=><span key={c} className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">{c}</span>)}</div></div></aside></div></div>
    <section className="bg-gray-50 py-12"><div className="mx-auto max-w-6xl px-6"><h2 className="text-2xl font-bold">📋 Daily Care Checklist</h2><div className="mt-6 space-y-3">{cl.map((i:A)=>{const f=fq[i.frequency]||{c:"bg-gray-100 text-gray-600",l:i.frequency};return(<details key={i.task_name} className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm"><summary className="flex cursor-pointer items-center justify-between list-none"><div className="flex items-center gap-3"><span className={"rounded-full px-2.5 py-0.5 text-xs font-semibold "+f.c}>{f.l}</span><span className="font-medium">{i.task_name}</span></div><span className="text-gray-300 group-open:rotate-180">▼</span></summary><div className="mt-3 border-t border-gray-50 pt-3 text-sm text-gray-600"><p>{i.description}</p>{Array.isArray(i.warning_signs)&&i.warning_signs.length>0?<div className="mt-2"><span className="font-semibold text-red-600">⚠ </span><div className="mt-1 flex flex-wrap gap-1">{i.warning_signs.map((w:string,j:number)=><span key={j} className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700">{w}</span>)}</div></div>:null}</div></details>)})}</div></div></section>
    <footer className="border-t border-gray-100 bg-white py-8"><div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-400"><Link href="/" className="font-bold text-gray-700"><span className="text-indigo-600">Paw</span>Port</Link><span className="ml-4">© 2026</span></div></footer>
  </div>);
}

export default function BreedDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [s, setS] = useState("");
  const [data, setData] = useState<A|null>(null);
  const [ld, setLd] = useState(true);

  useEffect(()=>{params.then(p=>setS(p.slug))},[]);
  useEffect(()=>{
    if(!s)return;
    // Check hardcoded extra breeds first
    if(EXTRA[s]){
      const ex = EXTRA[s];
      setData({
        ...ex,
        growth: [...(ex.growth_male||[]).map((g:A)=>({...g,sex:"male"})), ...(ex.growth_female||[]).map((g:A)=>({...g,sex:"female"}))]
      });
      setLd(false);
      return;
    }
    // Fallback to Supabase
    (async()=>{
      const {supabase}=await import("@/lib/supabase");
      const r=await supabase.from("breeds").select("*").eq("slug",s).single();
      if(!r.data){setLd(false);return}
      const b=r.data;
      const [a1,a2,a3]=await Promise.all([
        supabase.from("breed_conditions").select("*,conditions(*)").eq("breed_id",b.id),
        supabase.from("breed_checklists").select("*").eq("breed_id",b.id).order("sort_order"),
        supabase.from("breed_growth_curves").select("*").eq("breed_id",b.id).order("age_weeks")
      ]);
      setData({...b, conds:((a1.data??[])as A[]).map(x=>({...x.conditions,...x})), checklists:(a2.data??[])as A[], growth:(a3.data??[])as A[]});
      setLd(false);
    })();
  },[s]);

  if(ld)return<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"/></div>;
  if(!data)return<div className="flex items-center justify-center min-h-screen text-gray-500">Breed not found.</div>;

  const conds = data.conds || data.conditions || [];
  const cl = data.checklists || [];
  const gr = data.growth || [];

  return <BreedPageInner b={data} conds={conds} cl={cl} gr={gr} />;
}
