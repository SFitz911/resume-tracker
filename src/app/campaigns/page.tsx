import { sampleCampaigns } from '@/lib/sample-data';
import { StatusBadge } from '@/components/ui/Badge';

export default function CampaignsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track resume sends and generate pixel URLs
          </p>
        </div>
        <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
          + New Campaign
        </button>
      </div>

      <div className="space-y-4">
        {sampleCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <StatusBadge status={campaign.status} />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {campaign.company} &middot; {campaign.recipient} &middot; {campaign.resumeVersion}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-500">Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
                {campaign.lastOpenAt && (
                  <p className="text-gray-400">Last open: {new Date(campaign.lastOpenAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">{campaign.totalOpens}</p>
                <p className="text-xs text-gray-500">Total Opens</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{campaign.humanOpens}</p>
                <p className="text-xs text-gray-500">Human</p>
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{campaign.botOpens}</p>
                <p className="text-xs text-gray-500">Bot/Scanner</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Tracking Pixel URL:</p>
              <code className="block rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-700 break-all">
                {campaign.pixelUrl}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}