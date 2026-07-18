type BookingData = {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  role_title?: string;
  industry?: string;
  team_size?: string;
  current_tools?: string;
  pain_points: string[];
  goals: string[];
  project_types: string[];
  features_needed: string[];
  budget_range?: string;
  timeline?: string;
  project_description?: string;
  additional_notes?: string;
};

function formatList(items: string[]): string {
  return items.length ? items.map((i) => `  • ${i}`).join("\n") : "  (none selected)";
}

function buildEmailBody(data: BookingData): string {
  return `
New Strategy Session Request
${"=".repeat(40)}

CONTACT
  Name:    ${data.full_name}
  Email:   ${data.email}
  Phone:   ${data.phone || "—"}
  Company: ${data.company_name || "—"}
  Role:    ${data.role_title || "—"}

BUSINESS PROFILE
  Industry:      ${data.industry || "—"}
  Team Size:     ${data.team_size || "—"}
  Current Tools: ${data.current_tools || "—"}

PAIN POINTS
${formatList(data.pain_points)}

GOALS
${formatList(data.goals)}

PROJECT TYPES
${formatList(data.project_types)}

FEATURES NEEDED
${formatList(data.features_needed)}

BUDGET & TIMELINE
  Budget:   ${data.budget_range || "—"}
  Timeline: ${data.timeline || "—"}

PROJECT DESCRIPTION
${data.project_description || "(not provided)"}

ADDITIONAL NOTES
${data.additional_notes || "(not provided)"}
`.trim();
}

/**
 * Sends a booking summary email via Resend.
 * Falls back to console.log if BOOKING_NOTIFICATION_EMAIL or RESEND_API_KEY
 * is not configured, so submissions are never silently lost in dev.
 */
export async function sendBookingEmail(data: BookingData): Promise<void> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const body = buildEmailBody(data);
  const subject = `Strategy Session: ${data.full_name} — ${data.company_name || "Individual"}`;

  if (!to || !apiKey) {
    console.warn(
      `[email] Missing ${!to ? "BOOKING_NOTIFICATION_EMAIL" : "RESEND_API_KEY"} — printing to console:\n\n` +
        body
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "KemisDigital <noreply@kemisdigital.com>",
    to,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend send error (booking):", error);
  }
}

export type ApplicationData = {
  business_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website_url: string;
  processor: string;
  why_choose: string;
  application_type?: string;
  source_url?: string;
};

const PROCESSOR_LABELS: Record<string, string> = {
  kanoo: "Kanoo (existing account)",
  suncash: "SunCash (existing account)",
  cashngo: "Cash N' Go (existing account)",
  none: "No account yet, ready to apply",
};

function buildApplicationEmailBody(data: ApplicationData): string {
  return `
New Get Paid Online Inquiry
${"=".repeat(40)}

BUSINESS
  Business:  ${data.business_name}
  Website:   ${data.website_url}
  Type:      ${data.application_type || "get_paid_online"}

CONTACT
  Name:      ${data.contact_name}
  Email:     ${data.email}
  Phone:     ${data.phone || "—"}

PROCESSOR
  ${PROCESSOR_LABELS[data.processor] || data.processor}

ABOUT THE BUSINESS
${data.why_choose}

SOURCE
  ${data.source_url || "—"}
`.trim();
}

/**
 * Sends a Get Paid Online inquiry summary email via Resend.
 * Reuses BOOKING_NOTIFICATION_EMAIL. Falls back to console.log if
 * BOOKING_NOTIFICATION_EMAIL or RESEND_API_KEY is not configured.
 */
export async function sendApplicationEmail(data: ApplicationData): Promise<void> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const body = buildApplicationEmailBody(data);
  const subject = `Payment Integration Inquiry: ${data.business_name} — ${data.contact_name}`;

  if (!to || !apiKey) {
    console.warn(
      `[email] Missing ${!to ? "BOOKING_NOTIFICATION_EMAIL" : "RESEND_API_KEY"} — printing to console:\n\n` +
        body
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "KemisDigital <noreply@kemisdigital.com>",
    to,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend send error (application):", error);
  }
}

export type ContactData = {
  contact_name: string;
  email: string;
  phone?: string;
  business_name: string;
  website_url?: string;
  message: string;
  source_url?: string;
};

function buildContactEmailBody(data: ContactData): string {
  return `
New Contact Inquiry
${"=".repeat(40)}

CONTACT
  Name:      ${data.contact_name}
  Email:     ${data.email}
  Phone:     ${data.phone || "—"}
  Business:  ${data.business_name}
  Website:   ${data.website_url || "—"}

MESSAGE
${data.message}

SOURCE
  ${data.source_url || "—"}
`.trim();
}

/**
 * Sends a general contact inquiry via Resend.
 * Reuses BOOKING_NOTIFICATION_EMAIL.
 */
export async function sendContactEmail(data: ContactData): Promise<void> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const body = buildContactEmailBody(data);
  const subject = `Contact Inquiry: ${data.business_name} — ${data.contact_name}`;

  if (!to || !apiKey) {
    console.warn(
      `[email] Missing ${!to ? "BOOKING_NOTIFICATION_EMAIL" : "RESEND_API_KEY"} — printing to console:\n\n` +
        body
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "KemisDigital <noreply@kemisdigital.com>",
    to,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend send error (contact):", error);
    throw new Error("Failed to send contact email");
  }
}
