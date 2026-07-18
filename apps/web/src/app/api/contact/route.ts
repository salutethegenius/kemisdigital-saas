import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { sendContactEmail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const ContactSchema = z.object({
  contact_name: z
    .string({ error: "Your name is required" })
    .min(2, "Your name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().optional(),
  business_name: z
    .string({ error: "Business name is required" })
    .min(2, "Business name is required"),
  website_url: z.string().optional(),
  message: z
    .string({ error: "Tell us a bit more about what you need" })
    .min(10, "Tell us a bit more about what you need"),
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

  const result = ContactSchema.safeParse(body);
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
    await sendContactEmail({
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      business_name: data.business_name,
      website_url: data.website_url,
      message: data.message,
      source_url: data.source_url,
    });
  } catch (err) {
    console.error("[contact] Email send error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Your message has been received. We will be in touch within 48 hours.",
  });
}
