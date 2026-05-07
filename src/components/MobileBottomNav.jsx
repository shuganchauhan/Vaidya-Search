import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Brain, LayoutDashboard } from 'lucide-react';

const items = [
  { icon: Home,   label: 'Home',    to: '/' },
  { icon: Search, label: 'Search',  to: '/search' },
  { icon: Brain,  label: 'AI',      to: '/symptom-checker' },
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
];

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-[#E5E7EB] dark:border-slate-800 flex justify-around items-center px-2 py-2 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {items.map(({ icon: Icon, label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#1D9E75] bg-[#E1F5EE] dark:bg-[#1D9E75]/20'
                : 'text-[#6B7280] dark:text-slate-400 hover:text-[#1D9E75]'
            }`
          }
        >
          <Icon size={20} />
          <span className="text-[10px] font-semibold font-body">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
