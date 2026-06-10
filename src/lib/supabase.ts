import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ysbivovfehxqccvbjgbv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_znnJV108w3fxcDnMIqJTmA_ykXypPQs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
