import { KPICards } from '@/components/dashboard/KPICards';
import { Badge } from '@/components/ui/Badge';
import { computeKPIs } from '@/lib/analytics';
import { sampleEvents } from '@/lib/sample-data';

export default function DashboardPage() {
  const kpis = computeKPIs();
  const recentEvents = sampleEvents.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resume tracking overview and key metrics
        </p>
      </div>

      <KPICards data={kpis} />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{event.campaignName}</td>
                  <td className="px-6 py-4">
                    <Badge classification={event.classification} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {Math.round(event.confidenceScore * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}