import { ClassificationType } from '@/lib/types';

const classificationColors: Record<ClassificationType, string> = {
  likely_human: 'bg-green-100 text-green-800',
  likely_scanner: 'bg-yellow-100 text-yellow-800',
  likely_bot: 'bg-red-100 text-red-800',
  email_proxy: 'bg-blue-100 text-blue-800',
  ats_or_recruiting_software: 'bg-purple-100 text-purple-800',
  unknown: 'bg-gray-100 text-gray-800',
};

const classificationLabels: Record<ClassificationType, string> = {
  likely_human: 'Human',
  likely_scanner: 'Scanner',
  likely_bot: 'Bot',
  email_proxy: 'Email Proxy',
  ats_or_recruiting_software: 'ATS/Recruiting',
  unknown: 'Unknown',
};

interface BadgeProps {
  classification: ClassificationType;
}

export function Badge({ classification }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classificationColors[classification]}`}
    >
      {classificationLabels[classification]}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'paused' | 'completed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}