import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 dark:bg-zinc-900 p-4">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Golden Starter
      </h1>
      <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-md">
        Verity Application Framework — Next.js, FastAPI, Supabase. Start new projects by cloning this template.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
