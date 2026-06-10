import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Enable inserts for authenticated users
  const sql = `
    ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow inserts for authenticated" ON pets;
    CREATE POLICY "Allow inserts for authenticated" ON pets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
    DROP POLICY IF EXISTS "Allow select own pets" ON pets;
    CREATE POLICY "Allow select own pets" ON pets FOR SELECT TO authenticated USING (auth.uid() = user_id);
    DROP POLICY IF EXISTS "Allow update own pets" ON pets;
    CREATE POLICY "Allow update own pets" ON pets FOR UPDATE TO authenticated USING (auth.uid() = user_id);
    
    ALTER TABLE health_entries ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow own health entries" ON health_entries;
    CREATE POLICY "Allow own health entries" ON health_entries FOR ALL TO authenticated USING (pet_id IN (SELECT id FROM pets WHERE user_id = auth.uid()));
    
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow own profile" ON profiles;
    CREATE POLICY "Allow own profile" ON profiles FOR ALL TO authenticated USING (id = auth.uid());
  `;

  const { error } = await c.rpc("exec_sql", { sql });
  
  // Fallback: try direct SQL if RPC doesn't work
  if (error) {
    const { data: { session } } = await c.auth.getSession();
    // Try another approach
  }

  return NextResponse.json({ error: error?.message || "Policies applied" });
}
