/**
 * Shared config helpers — example of sharing across frontend/backend.
 * Use from apps/web (or other apps) to keep API URL and env in one place.
 */

const defaultApiUrl = "http://localhost:8000";

/** Base URL for the FastAPI backend. Set NEXT_PUBLIC_API_URL in .env to override. */
export function getApiUrl(): string {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return defaultApiUrl;
}

/** Build full API path (e.g. getApiPath("/health") => "http://localhost:8000/health") */
export function getApiPath(path: string): string {
  const base = getApiUrl();
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
