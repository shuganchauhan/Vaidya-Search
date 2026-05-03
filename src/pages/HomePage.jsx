import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { DOCTORS, SPECIALTIES, NEWS_ITEMS } from '../data/doctors';

export default function HomePage() {
  const navigate = useNavigate();
  const [city, setCity] = React.useState('');
  const [specialty, setSpecialty] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?city=${city}&specialty=${specialty}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Tricolor top strip */}
        <div className="h-1 tricolor-bar" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Eyebrow */}
          <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Search Smart. Heal Better.
          </p>

          {/* H1 */}
          <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl mb-4">
            Find the Right Doctor Near You 🇮🇳
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-10 max-w-lg">
            50,000+ verified doctors across 500+ cities in India
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-card shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl"
          >
            <div className="flex items-center gap-2 flex-1 border border-[#E5E7EB] rounded-input px-3 py-2.5">
              <MapPin size={18} className="text-[#1D9E75] flex-shrink-0" />
              <input
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="📍 Your City"
                className="flex-1 outline-none text-[14px] font-body placeholder:text-[#6B7280]"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 border border-[#E5E7EB] rounded-input px-3 py-2.5">
              <span className="text-[#1D9E75] text-lg flex-shrink-0">🩺</span>
              <select
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                className="flex-1 outline-none text-[14px] font-body text-[#6B7280] bg-transparent"
              >
                <option value="">Specialty</option>
                {SPECIALTIES.map(s => <option key={s.name}>{s.name}</option>)}
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#D85A30] btn-press text-white px-6 py-2.5 rounded-input font-semibold text-[15px] hover:bg-[#c24e27] transition-colors flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate('/symptom-checker')}
            className="mt-4 border border-white/40 text-white/90 px-5 py-2 rounded-pill text-sm font-medium hover:bg-white/10 btn-press transition-all"
          >
            🤖 Try AI Symptom Checker
          </button>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center gap-4">
          {[
            '✓ 50,000+ Verified Doctors',
            '✓ 2M+ Reviews',
            '✓ 500+ Cities',
            '✓ AI Multilingual',
          ].map(t => (
            <span
              key={t}
              className="bg-[#E1F5EE] text-[#0F6E56] text-xs font-semibold px-4 py-1.5 rounded-pill"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Specialty Grid */}
        <section className="py-14">
          <h2 className="font-heading font-bold text-2xl text-[#1A1A2E] mb-8">Popular Specialties</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {SPECIALTIES.map(s => (
              <button
                key={s.name}
                onClick={() => navigate(`/search?specialty=${s.name}`)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-[#E5E7EB] rounded-card flex items-center justify-center text-2xl sm:text-3xl group-hover:border-[#1D9E75] group-hover:-translate-y-1 transition-all shadow-sm group-hover:shadow-md">
                  {s.emoji}
                </div>
                <span className="text-[11px] text-[#6B7280] group-hover:text-[#1D9E75] font-medium text-center leading-tight">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#1A1A2E]">Featured Doctors</h2>
              <p className="text-[#6B7280] text-sm mt-1">Hand-picked specialists with consistent patient satisfaction</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="hidden sm:flex items-center gap-1 text-[#1D9E75] font-semibold text-sm hover:underline"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
            {DOCTORS.map(doc => (
              <div key={doc.id} className="flex-shrink-0 w-[280px]">
                <DoctorCard doctor={doc} />
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14 my-8 bg-[#E1F5EE] rounded-[24px] px-6 sm:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-[#1A1A2E]">How It Works</h2>
            <p className="text-[#6B7280] mt-2">Getting quality care is now as simple as 1-2-3</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {[
              { step: '01', icon: '🔍', title: 'Search', desc: 'Browse verified doctors by specialty, city, language, or fee range.' },
              { step: '02', icon: '⚖️', title: 'Compare', desc: 'Side-by-side comparison of ratings, fees, experience, and availability.' },
              { step: '03', icon: '📅', title: 'Book', desc: 'Confirm your appointment instantly. Zero booking fee. No hassle.' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#1D9E75] text-white flex items-center justify-center text-2xl shadow-lg">
                  {s.icon}
                </div>
                <div className="text-[#0F6E56] font-heading font-bold text-xs tracking-widest">{s.step}</div>
                <h3 className="font-heading font-bold text-xl text-[#1A1A2E]">{s.title}</h3>
                <p className="text-[#6B7280] text-sm max-w-[220px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* News Strip */}
      <div className="bg-[#0F6E56] py-2.5 overflow-hidden select-none">
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((n, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {n.tag}
              </span>
              <span className="text-white/90 text-sm font-medium">{n.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
