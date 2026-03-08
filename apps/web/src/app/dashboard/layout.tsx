import Link from "next/link";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link href="/dashboard" className="font-semibold text-zinc-900 dark:text-zinc-100">
            Dashboard
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/dashboard" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              Home
            </Link>
            <Link href="/dashboard/settings" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              Settings
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}
