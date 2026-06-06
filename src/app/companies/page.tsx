import { sampleCompanies } from '@/lib/sample-data';

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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recruiter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Opens</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Human</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bot/Scanner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{company.recruiterName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{company.jobTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(company.lastActivity).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{company.totalOpens}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">{company.humanOpens}</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">{company.botOpens}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}