import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, HeartPulse, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react';

const details = [
  { label: 'Full name', value: 'Pranav Tyagi', icon: User },
  { label: 'Email', value: 'pranav.tyagi@example.com', icon: Mail },
  { label: 'Phone', value: '+91 98765 43210', icon: Phone },
  { label: 'Location', value: 'Delhi, India', icon: MapPin },
];

const healthInfo = [
  { label: 'Blood group', value: 'B+' },
  { label: 'Age', value: '24' },
  { label: 'Allergies', value: 'None added' },
  { label: 'Emergency contact', value: '+91 91234 56789' },
];

export default function UserProfilePage() {
  return (
    <div className="prof-page max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-10">
      <Link to="/dashboard" className="prof-back flex items-center gap-2 text-[#6B7280] dark:text-slate-400 hover:text-[#1D9E75] text-sm mb-5">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="prof-card bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 overflow-hidden transition-colors">
        <div className="prof-hero hero-gradient p-6 sm:p-8">
          <div className="prof-head flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="prof-av w-20 h-20 rounded-full bg-white text-[#0F6E56] flex items-center justify-center font-heading font-extrabold text-2xl shadow-lg">
              PT
            </div>
            <div className="prof-copy text-white">
              <h1 className="font-heading font-extrabold text-3xl">Pranav Tyagi</h1>
              <p className="text-white/80 mt-1">Patient profile · Delhi, India</p>
              <span className="inline-flex items-center gap-1 mt-3 bg-white/20 border border-white/30 px-3 py-1 rounded-pill text-xs font-semibold">
                <ShieldCheck size={13} /> Verified Account
              </span>
            </div>
          </div>
        </div>

        <div className="prof-grid p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="prof-main space-y-6">
            <section className="info-sec">
              <h2 className="font-heading font-bold text-xl text-[#1A1A2E] dark:text-slate-100 mb-4">Personal Details</h2>
              <div className="info-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="info-card border border-[#E5E7EB] dark:border-slate-700 rounded-input p-4">
                    <Icon size={18} className="text-[#1D9E75] mb-3" />
                    <p className="text-xs uppercase tracking-widest text-[#6B7280] dark:text-slate-400 font-semibold">{label}</p>
                    <p className="mt-1 font-semibold text-[#1A1A2E] dark:text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="health-sec">
              <h2 className="font-heading font-bold text-xl text-[#1A1A2E] dark:text-slate-100 mb-4">Health Information</h2>
              <div className="health-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
                {healthInfo.map(item => (
                  <div key={item.label} className="health-card bg-[#F9FAFB] dark:bg-slate-900/50 border border-[#E5E7EB] dark:border-slate-700 rounded-input p-4">
                    <p className="text-xs uppercase tracking-widest text-[#6B7280] dark:text-slate-400 font-semibold">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#1A1A2E] dark:text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="prof-side space-y-4">
            <div className="sum-card border border-[#E5E7EB] dark:border-slate-700 rounded-card p-5">
              <HeartPulse size={22} className="text-[#D85A30]" />
              <h3 className="font-heading font-bold text-[#1A1A2E] dark:text-slate-100 mt-3">Health Summary</h3>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-1">Keep medical details updated for faster appointment booking.</p>
              <button className="mt-4 w-full bg-[#D85A30] text-white py-2.5 rounded-input font-semibold hover:bg-[#c24e27] transition-colors">
                Update Health Info
              </button>
            </div>

            <div className="alert-card border border-[#E5E7EB] dark:border-slate-700 rounded-card p-5">
              <Bell size={22} className="text-[#1D9E75]" />
              <h3 className="font-heading font-bold text-[#1A1A2E] dark:text-slate-100 mt-3">Notifications</h3>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-1">Appointment reminders are enabled through SMS and email.</p>
              <button className="mt-4 w-full border border-[#1D9E75] text-[#1D9E75] py-2.5 rounded-input font-semibold hover:bg-[#E1F5EE] dark:hover:bg-[#1D9E75]/10 transition-colors">
                Manage Alerts
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
