export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        Settings
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5">
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Profile</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Coming soon — update your profile and avatar.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-5">
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Notifications</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Coming soon — email and push preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
