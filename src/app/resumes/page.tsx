import Link from 'next/link';
import { sampleResumeVersions } from '@/lib/sample-data';

export default function ResumesPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Versions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Compare performance across resume versions
          </p>
        </div>
        <Link
          href="/generator"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          + New Version
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleResumeVersions.map((version) => (
          <div
            key={version.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900">{version.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{version.description}</p>
            <p className="mt-2 text-xs text-gray-400">
              Created: {new Date(version.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{version.campaignCount}</p>
                <p className="text-xs text-gray-500">Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{version.totalOpens}</p>
                <p className="text-xs text-gray-500">Opens</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-green-600">{version.humanOpens}</p>
                <p className="text-xs text-gray-500">Human</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}