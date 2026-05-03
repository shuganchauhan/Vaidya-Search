import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, LayoutGrid, List, ChevronDown } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { DOCTORS, SPECIALTIES } from '../data/doctors';

const LANGUAGES = ['Hindi', 'English', 'Punjabi', 'Tamil', 'Bengali', 'Telugu', 'Malayalam', 'Urdu'];
const EXP_RANGES = ['0–5 yrs', '5–10 yrs', '10+ yrs'];
const RATINGS = ['3★+', '4★+', '4.5★+'];
const GENDERS = ['Male', 'Female', 'Any'];

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1 rounded-pill text-xs font-semibold border transition-all ${
        active ? 'bg-[#1D9E75] text-white border-[#1D9E75]'
               : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#1D9E75] hover:text-[#1D9E75]'
      }`}>
      {label}
    </button>
  );
}

function Sidebar({ state, handlers }) {
  const { selSpecialties, feeRange, selRating, selExp, selLangs, teleconsult, selGender } = state;
  const { setSelSpecialties, setFeeRange, setSelRating, setSelExp, setSelLangs, setTeleconsult, setSelGender, resetFilters } = handlers;

  const toggleArr = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  return (
    <div className="bg-white rounded-card border border-[#E5E7EB] p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-[#1A1A2E]">Filters</h3>
        <button onClick={resetFilters} className="text-xs text-[#D85A30] font-semibold hover:underline">Reset</button>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Specialty</p>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(s => <Chip key={s.name} label={s.name} active={selSpecialties.includes(s.name)} onClick={() => toggleArr(selSpecialties, setSelSpecialties, s.name)} />)}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Fee Range: ₹0 – ₹{feeRange}</p>
        <input type="range" min={0} max={2000} step={100} value={feeRange} onChange={e => setFeeRange(Number(e.target.value))} style={{ accentColor: '#1D9E75' }} />
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Rating</p>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map(r => <Chip key={r} label={r} active={selRating === r} onClick={() => setSelRating(selRating === r ? '' : r)} />)}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Experience</p>
        <div className="flex flex-wrap gap-2">
          {EXP_RANGES.map(e => <Chip key={e} label={e} active={selExp === e} onClick={() => setSelExp(selExp === e ? '' : e)} />)}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Language</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(l => <Chip key={l} label={l} active={selLangs.includes(l)} onClick={() => toggleArr(selLangs, setSelLangs, l)} />)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#1A1A2E]">Teleconsultation</p>
        <button onClick={() => setTeleconsult(!teleconsult)}
          className={`w-12 h-6 rounded-full transition-all relative ${teleconsult ? 'bg-[#1D9E75]' : 'bg-[#E5E7EB]'}`}>
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${teleconsult ? 'left-6' : 'left-0.5'}`} />
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Gender</p>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map(g => <Chip key={g} label={g} active={selGender === g} onClick={() => setSelGender(g)} />)}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selSpecialties, setSelSpecialties] = useState(() => { const s = params.get('specialty'); return s ? [s] : []; });
  const [feeRange, setFeeRange] = useState(2000);
  const [selRating, setSelRating] = useState('');
  const [selExp, setSelExp] = useState('');
  const [selLangs, setSelLangs] = useState([]);
  const [teleconsult, setTeleconsult] = useState(false);
  const [selGender, setSelGender] = useState('Any');
  const [sortBy, setSortBy] = useState('Rating');
  const [viewMode, setViewMode] = useState('grid');
  const cityParam = params.get('city') || 'India';
  const resetFilters = () => { setSelSpecialties([]); setFeeRange(2000); setSelRating(''); setSelExp(''); setSelLangs([]); setTeleconsult(false); setSelGender('Any'); };

  const sidebarState = { selSpecialties, feeRange, selRating, selExp, selLangs, teleconsult, selGender };
  const sidebarHandlers = { setSelSpecialties, setFeeRange, setSelRating, setSelExp, setSelLangs, setTeleconsult, setSelGender, resetFilters };

  const filtered = useMemo(() => {
    let list = [...DOCTORS];
    if (selSpecialties.length) list = list.filter(d => selSpecialties.includes(d.specialty));
    if (feeRange < 2000) list = list.filter(d => d.fee <= feeRange);
    if (selRating === '3★+') list = list.filter(d => d.rating >= 3);
    else if (selRating === '4★+') list = list.filter(d => d.rating >= 4);
    else if (selRating === '4.5★+') list = list.filter(d => d.rating >= 4.5);
    if (selExp === '0–5 yrs') list = list.filter(d => d.experience <= 5);
    else if (selExp === '5–10 yrs') list = list.filter(d => d.experience > 5 && d.experience <= 10);
    else if (selExp === '10+ yrs') list = list.filter(d => d.experience > 10);
    if (selLangs.length) list = list.filter(d => selLangs.every(l => d.languages.includes(l)));
    if (teleconsult) list = list.filter(d => d.teleconsult);
    if (selGender !== 'Any') list = list.filter(d => d.gender === selGender);
    if (sortBy === 'Rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Fees ↑') list.sort((a, b) => a.fee - b.fee);
    else if (sortBy === 'Fees ↓') list.sort((a, b) => b.fee - a.fee);
    else if (sortBy === 'Experience') list.sort((a, b) => b.experience - a.experience);
    else if (sortBy === 'Distance') list.sort((a, b) => a.distance - b.distance);
    return list;
  }, [selSpecialties, feeRange, selRating, selExp, selLangs, teleconsult, selGender, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-[#6B7280] text-sm">
          <span className="font-bold text-[#1A1A2E]">{filtered.length} doctors</span> found in {cityParam}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="md:hidden flex items-center gap-2 border border-[#E5E7EB] rounded-pill px-3 py-1.5 text-sm font-medium" onClick={() => setSidebarOpen(true)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="border border-[#E5E7EB] rounded-input px-3 py-1.5 text-sm outline-none font-body appearance-none pr-7">
              {['Rating', 'Fees ↑', 'Fees ↓', 'Experience', 'Distance'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
          <div className="flex border border-[#E5E7EB] rounded-input overflow-hidden">
            {[{ m: 'grid', Icon: LayoutGrid }, { m: 'list', Icon: List }].map(({ m, Icon }) => (
              <button key={m} onClick={() => setViewMode(m)} className={`p-1.5 ${viewMode === m ? 'bg-[#1D9E75] text-white' : 'text-[#6B7280]'}`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="hidden md:block w-[260px] flex-shrink-0 sticky top-20 self-start">
          <Sidebar state={sidebarState} handlers={sidebarHandlers} />
        </aside>
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#6B7280]">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-heading font-bold text-xl text-[#1A1A2E]">No doctors found</p>
              <p className="mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {filtered.map(doc => <DoctorCard key={doc.id} doctor={doc} />)}
            </div>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[85vh] overflow-y-auto p-5 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button onClick={() => setSidebarOpen(false)}><X size={22} /></button>
            </div>
            <Sidebar state={sidebarState} handlers={sidebarHandlers} />
            <button onClick={() => setSidebarOpen(false)} className="w-full mt-4 bg-[#1D9E75] text-white py-3 rounded-card font-semibold">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
