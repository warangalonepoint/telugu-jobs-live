// app/api/jobs/route.js
import { NextResponse } from "next/server";

// Optional: run on the Edge for snappy responses
export const runtime = "edge";

const REQUIRED = ["title", "company", "district", "employmentType", "description"];

// GET -> return an empty list (no DB yet, keeps UI happy)
export async function GET() {
  return NextResponse.json({ items: [], next: null }, { status: 200 });
}

// POST -> validate payload and echo back (no persistence in this build)
export async function POST(req) {
  try {
    const body = await req.json();

    const job = {
      title: (body.title || "").toString().trim(),
      company: (body.company || "").toString().trim(),
      district: (body.district || "").toString().trim(),
      city: (body.city || "").toString().trim(),
      employmentType: (body.employmentType || "").toString().trim(), // FULL_TIME, PART_TIME, etc.
      category: (body.category || "").toString().trim(),              // IT / Govt / Banking ...
      salaryMin: Number(body.salaryMin ?? "") || null,
      salaryMax: Number(body.salaryMax ?? "") || null,
      url: (body.url || "").toString().trim() || null,
      email: (body.email || "").toString().trim() || null,
      description: (body.description || "").toString().trim(),
    };

    for (const key of REQUIRED) {
      if (!job[key]) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${key}` },
          { status: 400 }
        );
      }
    }

    // No DB in this UI-only deploy. Echo back so the form can show success.
    return NextResponse.json(
      { ok: true, message: "Received. Storage disabled in this build.", job },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
