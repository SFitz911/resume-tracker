import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Resume Tracker</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track when your resume gets opened. Get data-driven insight into your job search.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">How it works</h2>
        <ol className="mt-4 space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="font-bold text-blue-600">1.</span>
            Create a campaign for each job application
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-600">2.</span>
            Embed the tracking pixel in your resume email or hosted page
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-600">3.</span>
            View analytics on your dashboard when the pixel fires
          </li>
        </ol>

        <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Tracking signals are approximate. Opens may be triggered by
            email scanners, bots, ATS systems, or privacy proxies. Treat data as a signal, not proof
            that a human read your resume.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            View Dashboard
          </Link>
          <Link
            href="/campaigns"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Manage Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}