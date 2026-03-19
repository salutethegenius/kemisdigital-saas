import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "kemisdigital.html",
  );

  const html = await fs.promises.readFile(filePath, "utf8");

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

