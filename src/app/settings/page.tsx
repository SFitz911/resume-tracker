export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your resume tracker
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Owner Profile</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="owner-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="owner-email"
                defaultValue="owner@example.com"
                disabled
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-400">Set via OWNER_EMAIL environment variable</p>
            </div>
            <div>
              <label htmlFor="resume-version" className="block text-sm font-medium text-gray-700">Default Resume Version</label>
              <input
                type="text"
                id="resume-version"
                defaultValue="v2.1-frontend"
                disabled
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">App Configuration</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="app-url" className="block text-sm font-medium text-gray-700">App URL / Domain</label>
              <input
                type="url"
                id="app-url"
                defaultValue="https://your-app.vercel.app"
                disabled
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-400">Set via NEXT_PUBLIC_APP_URL environment variable</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm text-gray-500">Email on human open (coming soon)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm text-gray-500">Daily digest (coming soon)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm text-gray-500">Weekly summary (coming soon)</span>
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked disabled className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm text-gray-500">Anonymize IP addresses (last octet masked)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm text-gray-500">Auto-delete events older than 90 days</span>
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Database Status</h2>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="text-sm text-gray-600">Not configured</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Currently using sample data. Configure DATABASE_URL to enable persistence.
              Supported: Vercel Postgres, Supabase, Neon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}