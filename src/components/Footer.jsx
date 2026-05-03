import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1923] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Stethoscope size={20} className="text-[#1D9E75]" />
              <span className="font-heading font-extrabold text-lg">
                <span className="text-[#1D9E75]">Vaidya</span><span className="text-[#D85A30]">Search</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's premier healthcare discovery platform. Empowering patients with smart search and verified medical specialists across 500+ cities.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-gray-200">Platform</h4>
            <ul className="space-y-2.5">
              {['About Us', 'For Doctors', 'Find Doctors', 'Symptom Checker', 'Compare Doctors'].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#1D9E75] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-gray-200">Popular Cities</h4>
            <ul className="space-y-2.5">
              {['Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'].map(c => (
                <li key={c}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#1D9E75] transition-colors">{c}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-gray-200">Legal</h4>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Us'].map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-400 hover:text-[#1D9E75] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2025 VaidyaSearch India. All rights reserved.</p>
          <p className="text-xs text-gray-500">Built with ❤️ for Bharat 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
