import { sampleEvents } from '@/lib/sample-data';
import { Badge } from '@/components/ui/Badge';

export default function EventsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          All tracked pixel fire events
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classification</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 font-medium max-w-[150px] truncate">
                    {event.campaignName}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{event.company}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    <div>{event.recipient}</div>
                    {event.recipientEmail && (
                      <div className="text-gray-400">{event.recipientEmail}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{event.resumeVersion}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">
                    {event.userAgent}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px] truncate">
                    {event.referrer || '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{event.visitorIp}</td>
                  <td className="px-4 py-3">
                    <Badge classification={event.classification} />
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
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
