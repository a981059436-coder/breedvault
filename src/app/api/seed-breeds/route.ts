import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const URL = "https://ysbivovfehxqccvbjgbv.supabase.co";
const KEY = "eyJhbG...fCsw";

const BREEDS = [
  {"name":"Labrador Retriever","slug":"labrador-retriever","species":"dog","description":"The Labrador Retriever is the most popular dog breed in the US, UK, and Canada.","akc_group":"Sporting","origin":"Canada/UK","weight_male_kg_low":29,"weight_male_kg_high":36,"weight_female_kg_low":25,"weight_female_kg_high":32,"height_cm_low":55,"height_cm_high":62,"life_expectancy_years_low":10,"life_expectancy_years_high":14,"litter_size_avg":7,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["black","yellow","chocolate"],"temperament":["friendly","active","outgoing"],"is_featured":true},
  {"name":"German Shepherd Dog","slug":"german-shepherd-dog","species":"dog","description":"The German Shepherd Dog is a large, agile working breed.","akc_group":"Herding","origin":"Germany","weight_male_kg_low":30,"weight_male_kg_high":40,"weight_female_kg_low":22,"weight_female_kg_high":32,"height_cm_low":55,"height_cm_high":65,"life_expectancy_years_low":9,"life_expectancy_years_high":13,"litter_size_avg":8,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["black and tan","sable"],"temperament":["intelligent","loyal","confident"],"is_featured":true},
  {"name":"Dachshund","slug":"dachshund","species":"dog","description":"The Dachshund is a small hound with a long body and short legs.","akc_group":"Hound","origin":"Germany","weight_male_kg_low":7,"weight_male_kg_high":15,"weight_female_kg_low":7,"weight_female_kg_high":15,"height_cm_low":13,"height_cm_high":23,"life_expectancy_years_low":12,"life_expectancy_years_high":16,"litter_size_avg":4,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["red","black and tan"],"temperament":["curious","devoted","playful"],"is_featured":true},
  {"name":"Poodle","slug":"poodle","species":"dog","description":"Poodles come in Standard, Miniature, and Toy varieties with a curly coat.","akc_group":"Non-Sporting","origin":"Germany/France","weight_male_kg_low":2,"weight_male_kg_high":32,"weight_female_kg_low":2,"weight_female_kg_high":27,"height_cm_low":25,"height_cm_high":60,"life_expectancy_years_low":10,"life_expectancy_years_high":18,"litter_size_avg":5,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["white","black","apricot"],"temperament":["intelligent","active","proud"],"is_featured":true},
  {"name":"English Bulldog","slug":"english-bulldog","species":"dog","description":"The English Bulldog is a muscular breed with distinctive wrinkles.","akc_group":"Non-Sporting","origin":"United Kingdom","weight_male_kg_low":23,"weight_male_kg_high":25,"weight_female_kg_low":18,"weight_female_kg_high":23,"height_cm_low":31,"height_cm_high":40,"life_expectancy_years_low":8,"life_expectancy_years_high":10,"litter_size_avg":4,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["red brindle","fawn","white"],"temperament":["gentle","courageous","affectionate"],"is_featured":true},
  {"name":"Boxer","slug":"boxer","species":"dog","description":"The Boxer is a medium-to-large working breed.","akc_group":"Working","origin":"Germany","weight_male_kg_low":30,"weight_male_kg_high":35,"weight_female_kg_low":25,"weight_female_kg_high":29,"height_cm_low":53,"height_cm_high":63,"life_expectancy_years_low":10,"life_expectancy_years_high":12,"litter_size_avg":6,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["fawn","brindle"],"temperament":["playful","loyal","energetic"],"is_featured":true},
  {"name":"Beagle","slug":"beagle","species":"dog","description":"The Beagle is a small-to-medium scent hound.","akc_group":"Hound","origin":"United Kingdom","weight_male_kg_low":10,"weight_male_kg_high":11,"weight_female_kg_low":9,"weight_female_kg_high":10,"height_cm_low":33,"height_cm_high":41,"life_expectancy_years_low":10,"life_expectancy_years_high":15,"litter_size_avg":6,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["tricolor","lemon"],"temperament":["curious","friendly","merry"],"is_featured":true},
  {"name":"Rottweiler","slug":"rottweiler","species":"dog","description":"The Rottweiler is a large, powerful working breed.","akc_group":"Working","origin":"Germany","weight_male_kg_low":50,"weight_male_kg_high":60,"weight_female_kg_low":35,"weight_female_kg_high":48,"height_cm_low":56,"height_cm_high":69,"life_expectancy_years_low":8,"life_expectancy_years_high":10,"litter_size_avg":8,"gestation_days":63,"heat_cycle_days":180,"coat_colors":["black and mahogany"],"temperament":["confident","loyal","courageous"],"is_featured":true},
  {"name":"Persian","slug":"persian","species":"cat","description":"The Persian is a long-haired cat with a round face and calm personality.","tica_group":"Persian","origin":"Iran","weight_male_kg_low":4,"weight_male_kg_high":5.5,"weight_female_kg_low":3.5,"weight_female_kg_high":5,"height_cm_low":25,"height_cm_high":38,"life_expectancy_years_low":12,"life_expectancy_years_high":17,"litter_size_avg":4,"gestation_days":65,"coat_colors":["white","black","blue"],"temperament":["calm","gentle","affectionate"],"is_featured":true},
  {"name":"Siamese","slug":"siamese","species":"cat","description":"The Siamese is known for blue eyes and a vocal personality.","tica_group":"Siamese","origin":"Thailand","weight_male_kg_low":3.5,"weight_male_kg_high":5.5,"weight_female_kg_low":3,"weight_female_kg_high":4.5,"height_cm_low":20,"height_cm_high":30,"life_expectancy_years_low":12,"life_expectancy_years_high":20,"litter_size_avg":5,"gestation_days":65,"coat_colors":["seal point","blue point"],"temperament":["vocal","affectionate","intelligent"],"is_featured":true}
];

const CONDITIONS = [
  {"breed_slug":"labrador-retriever","condition_slug":"hip-dysplasia","prevalence_rate":12,"severity_score":4,"screening_test":"OFA hip radiograph","screening_freq":"Once at 2 years","age_of_onset":"Puppy to adult"},
  {"breed_slug":"labrador-retriever","condition_slug":"elbow-dysplasia","prevalence_rate":10,"severity_score":4,"screening_test":"OFA elbow radiograph","screening_freq":"Once at 2 years","age_of_onset":"Puppy"},
  {"breed_slug":"labrador-retriever","condition_slug":"gdv-bloat","prevalence_rate":5,"severity_score":5,"screening_test":"Gastropexy recommended","screening_freq":"At spay/neuter","age_of_onset":"Adult"},
  {"breed_slug":"german-shepherd-dog","condition_slug":"hip-dysplasia","prevalence_rate":20,"severity_score":5,"screening_test":"OFA hip radiograph","screening_freq":"Once at 2 years","age_of_onset":"Puppy to adult"},
  {"breed_slug":"german-shepherd-dog","condition_slug":"elbow-dysplasia","prevalence_rate":12,"severity_score":4,"screening_test":"OFA elbow radiograph","screening_freq":"Once at 2 years","age_of_onset":"Puppy"},
  {"breed_slug":"german-shepherd-dog","condition_slug":"gdv-bloat","prevalence_rate":7,"severity_score":5,"screening_test":"Gastropexy","screening_freq":"At spay/neuter","age_of_onset":"Adult"},
  {"breed_slug":"dachshund","condition_slug":"intervertebral-disc-disease","prevalence_rate":25,"severity_score":5,"screening_test":"MRI if symptomatic","screening_freq":"Monitor daily","age_of_onset":"Adult (3-6 years)"},
  {"breed_slug":"persian","condition_slug":"polycystic-kidney-disease","prevalence_rate":40,"severity_score":5,"screening_test":"Renal ultrasound + DNA","screening_freq":"Once, annually if affected","age_of_onset":"Adult"},
];

const CHECKLISTS = [
  {"breed_slug":"labrador-retriever","task_name":"Weight check","frequency":"weekly","category":"health","description":"Keep lean — obesity worsens hip/elbow dysplasia.","sort_order":1},
  {"breed_slug":"labrador-retriever","task_name":"Ear cleaning","frequency":"weekly","category":"grooming","description":"Floppy ears trap moisture. Clean weekly.","sort_order":2},
  {"breed_slug":"german-shepherd-dog","task_name":"Joint mobility check","frequency":"weekly","category":"health","description":"Watch gait and rising ability.","sort_order":1},
  {"breed_slug":"german-shepherd-dog","task_name":"Coat brushing","frequency":"daily","category":"grooming","description":"Heavy shedder — daily brushing.","sort_order":2},
  {"breed_slug":"dachshund","task_name":"Back safety","frequency":"daily","category":"health","description":"No jumping off furniture. Use ramps.","sort_order":1},
  {"breed_slug":"persian","task_name":"Eye cleaning","frequency":"daily","category":"grooming","description":"Wipe eye discharge daily.","sort_order":1},
  {"breed_slug":"persian","task_name":"Hydration check","frequency":"daily","category":"health","description":"Monitor water intake — PKD early sign.","sort_order":2},
];

export async function GET() {
  try {
    const c = createClient(URL, KEY);
    
    // Insert breeds
    const {error:e1} = await c.from("breeds").upsert(BREEDS, {onConflict:"slug"});
    if(e1) return NextResponse.json({error:"breeds: "+e1.message}, {status:500});
    
    // Map slugs to IDs
    const {data:breedsDb} = await c.from("breeds").select("id,slug");
    const slugMap:Record<string,number> = {};
    (breedsDb??[]).forEach((b:any)=>{slugMap[b.slug]=b.id});
    
    // Map condition slugs to IDs
    const {data:condsDb} = await c.from("conditions").select("id,slug");
    const condMap:Record<string,number> = {};
    (condsDb??[]).forEach((c:any)=>{condMap[c.slug]=c.id});
    
    // Insert breed_conditions
    const bcData = CONDITIONS.map(r=>{const {breed_slug,condition_slug,...rest}=r;return{breed_id:slugMap[breed_slug],condition_id:condMap[condition_slug],...rest}}).filter((r:any)=>r.breed_id&&r.condition_id);
    if(bcData.length>0){const {error:e2}=await c.from("breed_conditions").upsert(bcData);if(e2)return NextResponse.json({error:"conditions: "+e2.message},{status:500})}
    
    // Insert checklists
    const clData = CHECKLISTS.map(r=>{const {breed_slug,...rest}=r;return{breed_id:slugMap[breed_slug],...rest}}).filter((r:any)=>r.breed_id);
    if(clData.length>0){const {error:e3}=await c.from("breed_checklists").upsert(clData);if(e3)return NextResponse.json({error:"checklists: "+e3.message},{status:500})}
    
    return NextResponse.json({message:`Seeded ${BREEDS.length} breeds, ${bcData.length} conditions, ${clData.length} checklists`});
  } catch(e:any) {
    return NextResponse.json({error:e.message}, {status:500});
  }
}
