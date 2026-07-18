import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { turnstileWidgetHtml } from "@/lib/turnstile";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "app", "payments.html");

  let html = await fs.promises.readFile(filePath, "utf8");

  html = html.replace(
    "<!--TURNSTILE_WIDGET-->",
    turnstileWidgetHtml(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  );

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
