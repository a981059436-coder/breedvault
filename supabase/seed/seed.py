#!/usr/bin/env python3
"""
BreedVault Seed Script
Loads all breed data, conditions, checklists, vaccines, and growth curves
into a Supabase database.

Usage:
  1. Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars
  2. Run: python seed.py

Requirements: pip install supabase
"""

import json
import os
import sys
from pathlib import Path

SEED_DIR = Path(__file__).parent

# Mapping JSON fields to DB columns
FILES = [
    ("breeds.json",             "breeds"),
    ("conditions.json",         "conditions"),
    ("breed_conditions.json",   "breed_conditions"),
    ("breed_checklists.json",   "breed_checklists"),
    ("vaccination_schedules.json", "vaccination_schedules"),
    ("growth_curves.json",      "breed_growth_curves"),
]


def load_json(filename):
    path = SEED_DIR / filename
    if not path.exists():
        print(f"  SKIP: {filename} not found")
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def resolve_slugs(supabase, breed_conditions_data):
    """Replace breed_slug/condition_slug with actual IDs."""
    # Fetch all breed IDs
    breeds_resp = supabase.table("breeds").select("id,slug").execute()
    breed_map = {b["slug"]: b["id"] for b in breeds_resp.data}

    # Fetch all condition IDs
    conds_resp = supabase.table("conditions").select("id,slug").execute()
    cond_map = {c["slug"]: c["id"] for c in conds_resp.data}

    resolved = []
    for item in breed_conditions_data:
        bid = breed_map.get(item.pop("breed_slug"))
        cid = cond_map.get(item.pop("condition_slug"))
        if bid and cid:
            item["breed_id"] = bid
            item["condition_id"] = cid
            resolved.append(item)
        else:
            print(f"  WARN: unresolved {item}")

    return resolved


def resolve_breed_slug(supabase, data, slug_field="breed_slug"):
    """Replace breed_slug with breed_id."""
    breeds_resp = supabase.table("breeds").select("id,slug").execute()
    breed_map = {b["slug"]: b["id"] for b in breeds_resp.data}

    resolved = []
    for item in data:
        slug = item.pop(slug_field)
        bid = breed_map.get(slug)
        if bid:
            item["breed_id"] = bid
            resolved.append(item)
        else:
            print(f"  WARN: breed slug '{slug}' not found")
    return resolved


def seed():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")  # service_role key for admin writes

    if not url or not key:
        print("ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.")
        print("  SUPABASE_URL=https://xxxxx.supabase.co")
        print("  SUPABASE_SERVICE_KEY=eyJhbG...  (service_role key)")
        sys.exit(1)

    try:
        from supabase import create_client
    except ImportError:
        print("ERROR: pip install supabase")
        sys.exit(1)

    client = create_client(url, key)

    # ----- Step 1: Insert breeds, conditions, vaccines (no slug deps) -----
    for filename, table in FILES:
        data = load_json(filename)
        if not data:
            continue

        print(f"\nLoading {filename} -> {table} ({len(data)} rows)...")

        if table == "breed_conditions":
            data = resolve_slugs(client, data)
        elif table in ("breed_checklists", "breed_growth_curves"):
            data = resolve_breed_slug(client, data)

        if not data:
            print("  No data after resolution, skipping.")
            continue

        # Insert in batches of 50
        for i in range(0, len(data), 50):
            batch = data[i:i+50]
            try:
                resp = client.table(table).upsert(batch).execute()
                print(f"  Inserted batch {i//50 + 1} ({len(batch)} rows)")
            except Exception as e:
                print(f"  ERROR on batch {i//50 + 1}: {e}")

    print("\n✅ Seed complete!")
    print(f"   Run 'supabase db push' to deploy migrations first.")


if __name__ == "__main__":
    seed()
