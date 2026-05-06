/* Dark theme and Light theme mode implementation */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Video, Heart, MapPin, Clock, Star, ArrowLeft, Calendar } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { useApp } from '../context/AppContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function ScoreBar({ label, score }) {
  const pct = (score / 5) * 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#6B7280] dark:text-slate-400">{label}</span>
        <span className="font-semibold text-[#1A1A2E] dark:text-slate-200">{score} / 5</span>
      </div>
      <div className="h-2 bg-[#E5E7EB] dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-[#1D9E75] rounded-full animate-barGrow" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function DoctorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useApp();
  const doc = DOCTORS.find(d => d.id === Number(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!doc) return (
    <div className="text-center py-24">
      <p className="text-5xl mb-4">🩺</p>
      <p className="font-heading font-bold text-xl">Doctor not found</p>
      <button onClick={() => navigate('/search')} className="mt-4 text-[#1D9E75] underline">Back to Search</button>
    </div>
  );

  const saved = isSaved(doc.id);
  const tabs = ['overview', 'reviews', 'location'];

  return (
    <div>
      {/* Hero */}
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-heading font-bold text-3xl flex-shrink-0"
              style={{ backgroundColor: doc.avatarColor }}>
              {doc.avatar}
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">{doc.name}</h1>
                {doc.verified && (
                  <span className="flex items-center gap-1 bg-blue-500/30 border border-blue-300/40 text-white text-xs px-2 py-0.5 rounded-pill">
                    <CheckCircle size={11} /> Verified
                  </span>
                )}
              </div>
              <p className="text-white/80 mt-0.5">{doc.specialty} · {doc.degree}</p>
              <div className="flex items-center flex-wrap gap-4 mt-2">
                <span className="flex items-center gap-1 text-sm"><Star size={14} className="text-yellow-300 fill-yellow-300" /> {doc.rating} · {doc.reviews} reviews</span>
                <span className="text-sm text-white/70">{doc.experience} yrs experience</span>
                {doc.teleconsult && (
                  <span className="flex items-center gap-1 bg-emerald-500/30 border border-emerald-300/40 text-white text-xs px-2 py-0.5 rounded-pill">
                    <Video size={10} /> Online
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {doc.languages.map(l => (
                  <span key={l} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-pill">🗣️ {l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex border-b border-[#E5E7EB] dark:border-slate-800 mb-6 gap-1">
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                    activeTab === t ? 'text-[#1D9E75] border-b-2 border-[#1D9E75]' : 'text-[#6B7280] dark:text-slate-400 hover:text-[#1D9E75]'
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                  <h2 className="font-heading font-bold text-lg dark:text-slate-100 mb-3">About</h2>
                  <p className="text-[#6B7280] dark:text-slate-400 text-sm leading-relaxed">{doc.bio}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                  <h2 className="font-heading font-bold text-lg dark:text-slate-100 mb-3">Qualifications</h2>
                  <div className="space-y-2">
                    {doc.qualifications.map((q, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#6B7280] dark:text-slate-400">
                        <CheckCircle size={15} className="text-[#1D9E75] flex-shrink-0 mt-0.5" />
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                  <h2 className="font-heading font-bold text-lg dark:text-slate-100 mb-1">Consulting Hours</h2>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400 flex items-center gap-1 mb-4">
                    <MapPin size={13} /> {doc.hospital}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DAYS.map(d => (
                      <div key={d} className={`rounded-input px-3 py-2 text-xs ${doc.hours[d] === 'Closed' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-[#E1F5EE] dark:bg-[#1D9E75]/20 text-[#0F6E56] dark:text-[#1D9E75]'}`}>
                        <p className="font-bold">{d}</p>
                        <p>{doc.hours[d]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                  <h2 className="font-heading font-bold text-lg dark:text-slate-100 mb-4">Score Breakdown</h2>
                  <div className="space-y-4">
                    {Object.entries(doc.scores).map(([k, v]) => <ScoreBar key={k} label={k} score={v} />)}
                  </div>
                </div>
                <div className="space-y-4">
                  {doc.reviewsList.map((r, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#E1F5EE] dark:bg-[#1D9E75]/20 flex items-center justify-center text-[#0F6E56] dark:text-[#1D9E75] font-heading font-bold text-sm">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#1A1A2E] dark:text-slate-100">{r.name}</p>
                          <p className="text-xs text-[#6B7280] dark:text-slate-500">{r.date}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-0.5">
                          {[...Array(r.rating)].map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
                        </div>
                      </div>
                      <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="h-[280px] bg-[#E1F5EE] dark:bg-slate-800/50 border-2 border-[#1D9E75] rounded-card flex flex-col items-center justify-center gap-3 text-[#0F6E56] dark:text-[#1D9E75] transition-colors">
                  <MapPin size={40} />
                  <p className="font-heading font-bold dark:text-slate-100">Map View</p>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">Interactive map coming soon</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 transition-colors">
                  <h3 className="font-heading font-bold mb-2 dark:text-slate-100">Address</h3>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">{doc.hospital}</p>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">{doc.city}</p>
                  <p className="text-sm text-[#1D9E75] mt-1">📍 {doc.distance} km from you</p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-[280px] flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-card border border-[#E5E7EB] dark:border-slate-700 p-5 lg:sticky lg:top-24 space-y-4 transition-colors">
              <div>
                <p className="text-xs text-[#6B7280] dark:text-slate-400">Consultation Fee</p>
                <p className="font-heading font-extrabold text-[#1D9E75] text-3xl">₹{doc.fee}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-input">
                <Clock size={14} /> Next: {doc.nextSlot}
              </div>
              <div className="text-xs text-[#6B7280] dark:text-slate-500">⏱ ~{doc.waitTime} min avg wait</div>
              <button className="w-full bg-[#D85A30] btn-press text-white py-3 rounded-card font-heading font-bold hover:bg-[#c24e27] transition-colors flex items-center justify-center gap-2">
                <Calendar size={16} /> Book Appointment
              </button>
              <button
                onClick={() => toggleSave(doc)}
                className={`w-full py-3 rounded-card font-heading font-bold border-2 transition-all btn-press flex items-center justify-center gap-2 ${
                  saved ? 'bg-[#E1F5EE] dark:bg-[#1D9E75]/20 border-[#1D9E75] text-[#1D9E75]' : 'border-[#1D9E75] text-[#1D9E75] hover:bg-[#E1F5EE] dark:hover:bg-[#1D9E75]/10'
                }`}>
                <Heart size={16} className={saved ? 'fill-[#1D9E75]' : ''} />
                {saved ? 'Saved' : 'Save Doctor'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
