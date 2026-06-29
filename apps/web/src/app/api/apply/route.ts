import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { createClient } from "@supabase/supabase-js";
import { sendApplicationEmail } from "@/lib/email";

export const runtime = "nodejs";

const ProcessorValues = ["kanoo", "suncash", "cashngo", "none"] as const;

const ApplicationSchema = z.object({
  business_name: z.string().min(2, "Business name is required"),
  contact_name: z.string().min(2, "Your name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().optional(),
  website_url: z.string().min(4, "Website URL is required"),
  processor: z.enum(ProcessorValues, "Select a payment processor"),
  why_choose: z.string().min(10, "Tell us a bit more about your business"),
  source_url: z.string().optional(),
  user_agent: z.string().optional(),
});

const PLACEHOLDER_PATTERNS = ["your-project", "your-anon-key", "your-"];

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (PLACEHOLDER_PATTERNS.some((p) => url.includes(p) || anonKey.includes(p))) {
    return null;
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = ApplicationSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { ok: false, message: firstError?.message ?? "Invalid form data." },
      { status: 400 }
    );
  }

  const data = result.data;

  // Email first — it is the source of truth for the team inbox.
  let emailOk = true;
  try {
    await sendApplicationEmail(data);
  } catch (err) {
    console.error("Email send error:", err);
    emailOk = false;
  }

  // DB insert is best-effort. A failure here must not lose the submission,
  // since the email already went through (or failed independently).
  const supabase = supabaseAdmin();
  if (supabase) {
    try {
      const { error } = await supabase.from("payment_applications").insert({
        business_name: data.business_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone || null,
        website_url: data.website_url,
        processor: data.processor,
        why_choose: data.why_choose,
        source_url: data.source_url || null,
        user_agent: data.user_agent || null,
      });
      if (error) {
        console.error("Supabase insert error (non-blocking):", error);
      }
    } catch (err) {
      console.error("Supabase insert exception (non-blocking):", err);
    }
  } else {
    console.warn("[apply] Supabase not configured — email only.");
  }

  if (!emailOk) {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Your application has been received. We will be in touch within 48 hours.",
  });
}
