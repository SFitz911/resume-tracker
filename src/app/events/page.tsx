'use client';

import { useState, useMemo } from 'react';
import { sampleEvents } from '@/lib/sample-data';
import { Badge } from '@/components/ui/Badge';
import { ClassificationType } from '@/lib/types';

// Dropdown options for the classification filter
const classificationOptions: { value: ClassificationType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Classifications' },
  { value: 'likely_human', label: 'Human' },
  { value: 'likely_scanner', label: 'Scanner' },
  { value: 'likely_bot', label: 'Bot' },
  { value: 'email_proxy', label: 'Email Proxy' },
  { value: 'ats_or_recruiting_software', label: 'ATS/Recruiting' },
  { value: 'unknown', label: 'Unknown' },
];

export default function EventsPage() {
  // Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<ClassificationType | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Compute filtered events only when filter inputs change
  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      // Search filter: case-insensitive across multiple fields
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          event.company.toLowerCase().includes(query) ||
          event.campaignName.toLowerCase().includes(query) ||
          event.userAgent.toLowerCase().includes(query) ||
          event.recipient.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Classification filter
      if (classificationFilter !== 'all' && event.classification !== classificationFilter) {
        return false;
      }

      // Date range filter
      if (dateFrom) {
        const eventDate = new Date(event.timestamp);
        const fromDate = new Date(dateFrom);
        if (eventDate < fromDate) return false;
      }
      if (dateTo) {
        const eventDate = new Date(event.timestamp);
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (eventDate > toDate) return false;
      }

      return true;
    });
  }, [searchQuery, classificationFilter, dateFrom, dateTo]);

  // Count how many filters are currently active
  const activeFilterCount = [
    searchQuery,
    classificationFilter !== 'all' ? classificationFilter : '',
    dateFrom,
    dateTo,
  ].filter(Boolean).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          All tracked pixel fire events
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by company, campaign, or user agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
              />
              {activeFilterCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {activeFilterCount}
                </span>
              )}
            </div>
          </div>
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value as ClassificationType | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          >
            {classificationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Agent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classification</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-500">
                    No results found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900 font-medium max-w-[150px] truncate">
                      {event.campaignName}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{event.company}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        Showing {filteredEvents.length} of {sampleEvents.length} events
      </p>
    </div>
  );
}