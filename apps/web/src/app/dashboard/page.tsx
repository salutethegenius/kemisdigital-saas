import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        Quick Access
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Start from one of these areas.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/ai-playground"
          className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">AI Playground</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Chat and orchestration with the API
          </p>
        </Link>
        <Link
          href="/dashboard/data"
          className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Data Explorer</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Browse and query your data
          </p>
        </Link>
        <Link
          href="/dashboard/settings"
          className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Settings</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Profile and preferences
          </p>
        </Link>
      </div>
    </div>
  );
}
