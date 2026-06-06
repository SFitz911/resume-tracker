'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/campaigns', label: 'Campaigns', icon: '🎯' },
  { href: '/companies', label: 'Companies', icon: '🏢' },
  { href: '/events', label: 'Events', icon: '📋' },
  { href: '/resumes', label: 'Resumes', icon: '📄' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
  { href: '/login', label: 'Login', icon: '🔒' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <h1 className="text-xl font-bold text-gray-900">📍 Resume Tracker</h1>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-400">Resume Tracker MVP</p>
          <p className="text-xs text-gray-400">Signals, not proof.</p>
        </div>
      </div>
    </aside>
  );
}