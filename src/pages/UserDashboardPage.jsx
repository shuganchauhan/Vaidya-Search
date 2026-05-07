import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { DOCTORS } from '../data/doctors';

const user = {
  name: 'Pranav Tyagi',
  city: 'Delhi',
  memberSince: '2025',
  avatar: 'PT',
};

const upcomingAppointments = [
  {
    id: 1,
    doctor: DOCTORS[0],
    date: '9 May 2026',
    time: '4:00 PM',
    type: 'Video consultation',
    status: 'Confirmed',
    reason: 'Cardiology follow-up',
  },
  {
    id: 2,
    doctor: DOCTORS[2],
    date: '15 May 2026',
    time: '10:00 AM',
    type: 'Clinic visit',
    status: 'Pending',
    reason: 'Child wellness check',
  },
];

const pastAppointments = [
  {
    id: 3,
    doctor: DOCTORS[3],
    date: '21 Apr 2026',
    time: '5:30 PM',
    type: 'Clinic visit',
    status: 'Completed',
    reason: 'Skin consultation',
  },
  {
    id: 4,
    doctor: DOCTORS[5],
    date: '3 Mar 2026',
    time: '11:00 AM',
    type: 'Clinic visit',
    status: 'Completed',
    reason: 'Knee pain review',
  },
];

function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
  const tones = {
    primary: 'bg-[#E1F5EE] dark:bg-[#1D9E75]/20 text-[#0F6E56] dark:text-[#1D9E75]',
    accent: 'bg-[#FAECE7] dark:bg-[#D85A30]/15 text-[#D85A30]',
    blue: 'bg-blue-50 dark:bg-blue-900/25 text-blue-600 dark:text-blue-300',
  };

  return (
    <div className="stat-card bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-4 transition-colors">
      <div className={`stat-icon w-10 h-10 rounded-input flex items-center justify-center ${tones[tone]}`}>
        <Icon size={19} />
      </div>
      <p className="mt-4 text-2xl font-heading font-extrabold text-[#1A1A2E] dark:text-slate-100">{value}</p>
      <p className="text-sm text-[#6B7280] dark:text-slate-400">{label}</p>
    </div>
  );
}

function AppointmentCard({ appointment, past = false }) {
  const { doctor } = appointment;

  return (
    <div className="appt-card bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-4 transition-colors">
      <div className="appt-head flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          to={`/doctor/${doctor.id}`}
          className="appt-doc flex items-center gap-3 text-left min-w-0"
        >
          <div
            className="appt-av w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold shadow-sm flex-shrink-0"
            style={{ backgroundColor: doctor.avatarColor }}
          >
            {doctor.avatar}
          </div>
          <div className="appt-info min-w-0">
            <p className="font-heading font-bold text-[#1A1A2E] dark:text-slate-100 truncate">{doctor.name}</p>
            <p className="text-sm text-[#6B7280] dark:text-slate-400">{doctor.specialty}</p>
          </div>
        </Link>

        <div className="appt-time sm:ml-auto grid grid-cols-2 sm:flex sm:items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-[#6B7280] dark:text-slate-400">
            <Calendar size={15} className="text-[#1D9E75]" /> {appointment.date}
          </span>
          <span className="flex items-center gap-1 text-[#6B7280] dark:text-slate-400">
            <Clock size={15} className="text-[#1D9E75]" /> {appointment.time}
          </span>
        </div>
      </div>

      <div className="appt-tags mt-4 flex flex-wrap items-center gap-2">
        <span className="bg-[#E1F5EE] dark:bg-[#1D9E75]/20 text-[#0F6E56] dark:text-[#1D9E75] text-xs font-semibold px-3 py-1 rounded-pill">
          {appointment.reason}
        </span>
        <span className="bg-blue-50 dark:bg-blue-900/25 text-blue-600 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-pill">
          {appointment.type}
        </span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-pill ${past ? 'bg-slate-100 dark:bg-slate-700 text-[#6B7280] dark:text-slate-300' : 'bg-[#FAECE7] dark:bg-[#D85A30]/15 text-[#D85A30]'}`}>
          {appointment.status}
        </span>
      </div>

      <div className="appt-actions mt-4 flex flex-wrap gap-2">
        <Link
          to={`/doctor/${doctor.id}`}
          className="border border-[#1D9E75] text-[#1D9E75] px-4 py-2 rounded-input text-sm font-semibold hover:bg-[#E1F5EE] dark:hover:bg-[#1D9E75]/10 transition-colors"
        >
          Doctor Profile
        </Link>
        {past ? (
          <button className="border border-[#E5E7EB] dark:border-slate-600 text-[#6B7280] dark:text-slate-300 px-4 py-2 rounded-input text-sm font-semibold hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors">
            Book Again
          </button>
        ) : (
          <button className="bg-[#D85A30] text-white px-4 py-2 rounded-input text-sm font-semibold hover:bg-[#c24e27] transition-colors flex items-center gap-2">
            <Video size={15} /> Join / Details
          </button>
        )}
      </div>
    </div>
  );
}

export default function UserDashboardPage() {
  const [apptTab, setApptTab] = useState('all');
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setToday(date);
  }, []);

  return (
    <div className="dash-page pb-24 md:pb-8">
      <section className="dash-hero hero-gradient">
        <div className="dash-wrap max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="dash-head flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="dash-copy text-white">
              <p className="text-white/70 text-xs font-semibold tracking-[0.18em] uppercase mb-3">Patient Dashboard</p>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-white/80 mt-2 max-w-xl">Manage appointments, saved doctors, health records, and your VaidyaSearch profile from one place.</p>
              {today && <p className="text-white/70 text-sm mt-3">Today: {today}</p>}
            </div>
            <div className="dash-actions flex gap-2">
              <Link
                to="/search"
                className="border border-white/40 text-white px-4 py-2.5 rounded-input font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Search size={17} /> Find Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="dash-main max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="stat-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Calendar} value={upcomingAppointments.length} label="Upcoming visits" />
          <StatCard icon={CheckCircle} value={pastAppointments.length} label="Past visits" tone="blue" />
          <StatCard icon={FileText} value="4" label="Health records" tone="accent" />
          <StatCard icon={ShieldCheck} value="92%" label="Profile complete" />
        </div>

        <div className="dash-grid grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="appt-col space-y-6">
            <div className="appt-tabs flex flex-wrap gap-2">
              <button
                onClick={() => setApptTab('all')}
                className={`px-4 py-2 rounded-pill text-sm font-semibold border transition-colors ${apptTab === 'all' ? 'bg-[#1D9E75] border-[#1D9E75] text-white' : 'bg-white dark:bg-slate-800 border-[#E5E7EB] dark:border-slate-700 text-[#6B7280] dark:text-slate-300'}`}
              >
                All
              </button>
              <button
                onClick={() => setApptTab('upcoming')}
                className={`px-4 py-2 rounded-pill text-sm font-semibold border transition-colors ${apptTab === 'upcoming' ? 'bg-[#1D9E75] border-[#1D9E75] text-white' : 'bg-white dark:bg-slate-800 border-[#E5E7EB] dark:border-slate-700 text-[#6B7280] dark:text-slate-300'}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setApptTab('past')}
                className={`px-4 py-2 rounded-pill text-sm font-semibold border transition-colors ${apptTab === 'past' ? 'bg-[#1D9E75] border-[#1D9E75] text-white' : 'bg-white dark:bg-slate-800 border-[#E5E7EB] dark:border-slate-700 text-[#6B7280] dark:text-slate-300'}`}
              >
                Past
              </button>
            </div>

            {(apptTab === 'all' || apptTab === 'upcoming') && (
              <section className="upcoming-sec">
              <div className="sec-head flex items-end justify-between mb-4">
                <div className="sec-title">
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A2E] dark:text-slate-100">Upcoming Appointments</h2>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">Your next confirmed and pending consultations.</p>
                </div>
                <Link to="/search" className="hidden sm:flex items-center gap-1 text-[#1D9E75] font-semibold text-sm hover:underline">
                  Book New <ArrowRight size={15} />
                </Link>
              </div>
              <div className="appt-list space-y-3">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </section>
            )}

            {(apptTab === 'all' || apptTab === 'past') && (
              <section className="past-sec">
              <div className="sec-head flex items-end justify-between mb-4">
                <div className="sec-title">
                  <h2 className="font-heading font-bold text-2xl text-[#1A1A2E] dark:text-slate-100">Past Appointments</h2>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">Review previous visits and book follow-ups quickly.</p>
                </div>
              </div>
              <div className="appt-list space-y-3">
                {pastAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} past />
                ))}
              </div>
            </section>
            )}
          </div>

          <aside className="dash-side space-y-4">
            <div className="user-box bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
              <div className="user-row flex items-start gap-3">
                <div className="user-av w-12 h-12 rounded-full bg-[#1D9E75] text-white flex items-center justify-center font-heading font-bold flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="user-info min-w-0">
                  <p className="font-heading font-bold text-[#1A1A2E] dark:text-slate-100 truncate">{user.name}</p>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400 flex items-center gap-1 flex-wrap">
                    <MapPin size={13} className="flex-shrink-0" /> {user.city} · Member since {user.memberSince}
                  </p>
                </div>
              </div>
            </div>

            <div className="care-box bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
              <h3 className="font-heading font-bold text-[#1A1A2E] dark:text-slate-100 mb-4">Care Shortcuts</h3>
              <div className="care-grid grid grid-cols-2 gap-3">
                {[
                  { icon: FileText, label: 'Records' },
                  { icon: Activity, label: 'Vitals' },
                  { icon: Bell, label: 'Reminders' },
                  { icon: MessageCircle, label: 'Support' },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="care-btn border border-[#E5E7EB] dark:border-slate-700 rounded-input p-3 text-left hover:border-[#1D9E75] hover:text-[#1D9E75] dark:text-slate-300 transition-colors">
                    <Icon size={18} />
                    <span className="block text-xs font-semibold mt-2">{label}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
