import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, LogIn } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: 'Find Doctors', to: '/search' },
    { label: 'Symptom AI', to: '/symptom-checker' },
    { label: 'Compare', to: '/compare' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <Stethoscope size={24} className="text-[#1D9E75]" />
          <span className="font-heading font-extrabold text-xl">
            <span className="text-[#1D9E75]">Vaidya</span><span className="text-[#D85A30]">Search</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-pill text-[14px] font-medium transition-colors ${
                pathname === l.to
                  ? 'text-[#1D9E75] bg-[#E1F5EE]'
                  : 'text-[#6B7280] hover:text-[#1D9E75] hover:bg-[#E1F5EE]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/search')}
            className="hidden md:flex items-center gap-2 border border-[#1D9E75] text-[#1D9E75] px-4 py-2 rounded-pill text-[14px] font-semibold hover:bg-[#E1F5EE] btn-press transition-all"
          >
            <LogIn size={16} /> Login
          </button>
          <button
            className="md:hidden p-2 text-[#6B7280] hover:text-[#1D9E75]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 pb-4 flex flex-col gap-2 animate-fadeIn">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-card text-[15px] font-medium text-[#1A1A2E] hover:bg-[#E1F5EE] hover:text-[#1D9E75] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button className="mt-2 border border-[#1D9E75] text-[#1D9E75] py-2.5 rounded-pill font-semibold hover:bg-[#E1F5EE]">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
