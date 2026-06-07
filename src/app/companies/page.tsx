import { sampleCompanies } from '@/lib/sample-data';

// Color mapping for follow-up status badges
const statusColors: Record<string, string> = {
  none: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-800',
  followed_up: 'bg-blue-100 text-blue-800',
  replied: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  offer: 'bg-purple-100 text-purple-800',
};

export default function CompaniesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Companies / Recipients</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track activity by company and recruiter
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Open</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Follow-up</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{company.recruiterName}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{company.recruiterEmail}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{company.jobTitle}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(company.sentAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(company.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[company.followUpStatus] || 'bg-gray-100 text-gray-700'}`}>
                      {company.followUpStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 max-w-[200px] truncate">
                    {company.notes || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{company.totalOpens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}