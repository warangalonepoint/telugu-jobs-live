// app/api/jobs/route.js
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase"; // use alias

export async function GET(request) {
  try {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { data: [], note: "Supabase env not configured" },
        { status: 200 }
      );
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    let query = supabase
      .from("jobs")
      .select("*")
      .order("posted_at", { ascending: false })
      .limit(50);

    if (q) query = query.ilike("title", `%${q}%`);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { data: [], error: String(err?.message || err) },
      { status: 200 }
    );
  }
}

