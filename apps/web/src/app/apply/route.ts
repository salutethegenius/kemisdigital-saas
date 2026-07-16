import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'payments.html');

  let html = await fs.promises.readFile(filePath, 'utf8');

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const widget = siteKey
    ? `<div class="cf-turnstile" data-sitekey="${siteKey}" data-theme="dark"></div>`
    : '<!-- Turnstile not configured: set NEXT_PUBLIC_TURNSTILE_SITE_KEY -->';

  html = html.replace('<!--TURNSTILE_WIDGET-->', widget);

  return new NextResponse(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
