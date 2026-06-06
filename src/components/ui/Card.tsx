interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export function Card({ title, value, subtitle, color = 'text-gray-900' }: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}