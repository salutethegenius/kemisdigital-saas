import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { sendWebClinicEmail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  WEBSITE_CLINIC_DEMO_IDS,
  clinicDemoLabel,
} from "@/marketing/website-clinic-demos";

export const runtime = "nodejs";

const PackageValues = ["display", "commerce", "platform", "unsure"] as const;

const WebClinicSchema = z.object({
  contact_name: z
    .string({ error: "Your name is required" })
    .min(2, "Your name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().optional(),
  business_name: z
    .string({ error: "Business name is required" })
    .min(2, "Business name is required"),
  website_url: z.string().optional(),
  package: z.enum(PackageValues, "Select a package"),
  message: z
    .string({ error: "Tell us how your business currently works" })
    .min(10, "Tell us a bit more about how your business currently works"),
  terms_ack: z.literal(true, {
    error: "Please confirm you understand this is a review request, not a signed agreement.",
  }),
  concept_id: z.preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    z.enum(WEBSITE_CLINIC_DEMO_IDS).optional(),
  ),
  source_url: z.string().optional(),
  user_agent: z.string().optional(),
  turnstile_token: z.string().optional(),
});

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

  const result = WebClinicSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { ok: false, message: firstError?.message ?? "Invalid form data." },
      { status: 400 }
    );
  }

  const data = result.data;

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null;

  const captcha = await verifyTurnstile(data.turnstile_token, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { ok: false, message: captcha.message ?? "Verification failed." },
      { status: captcha.status ?? 400 }
    );
  }

  try {
    await sendWebClinicEmail({
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name,
      website_url: data.website_url,
      package: data.package,
      message: data.message,
      concept_id: data.concept_id,
      concept_label: clinicDemoLabel(data.concept_id),
      source_url: data.source_url,
    });
  } catch (err) {
    console.error("[web-clinic] Email send error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Your digital review request has been received. We will be in touch within 48 hours.",
  });
}
