export type TurnstileResult = {
  ok: boolean;
  message?: string;
  /** HTTP status hint for API routes */
  status?: number;
};

/**
 * Verify a Cloudflare Turnstile token.
 * Production: fail closed if secret is missing or token is invalid.
 * Development: skip only when secret is unset (with a warning).
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | null
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const isProd = process.env.NODE_ENV === "production";

  if (!secret) {
    if (isProd) {
      console.error(
        "[turnstile] TURNSTILE_SECRET_KEY not set — rejecting submission in production."
      );
      return {
        ok: false,
        status: 503,
        message: "Verification unavailable. Please try again later.",
      };
    }
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not set — skipping CAPTCHA verification (dev only)."
    );
    return { ok: true };
  }

  if (!token) {
    return {
      ok: false,
      status: 400,
      message: "Please complete the verification challenge.",
    };
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    const data = (await res.json()) as { success?: boolean };

    if (!data.success) {
      return {
        ok: false,
        status: 400,
        message: "Verification failed. Please try again.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("[turnstile] verify error:", err);
    return {
      ok: false,
      status: 503,
      message: "Verification unavailable. Please try again.",
    };
  }
}

export function turnstileWidgetHtml(siteKey: string | undefined): string {
  const key = siteKey?.trim();
  if (!key) {
    return "<!-- Turnstile not configured: set NEXT_PUBLIC_TURNSTILE_SITE_KEY -->";
  }
  return `<div class="cf-turnstile" data-sitekey="${key}" data-theme="dark"></div>`;
}
