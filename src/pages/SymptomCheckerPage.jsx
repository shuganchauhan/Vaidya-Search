import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Languages, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const CONDITIONS = [
  { emoji: '🤧', name: 'Common Cold / Flu', match: 78 },
  { emoji: '🦠', name: 'Viral Infection', match: 65 },
  { emoji: '💊', name: 'Tension Headache', match: 52 },
];

const LANG_CHIPS = ['हिंदी', 'English', 'Hinglish', 'தமிழ்', 'বাংলা'];

function UrgencyBadge({ level }) {
  const map = {
    Low:      { bg: 'bg-emerald-100 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500', label: '🟢 Low Urgency' },
    Moderate: { bg: 'bg-amber-100 text-amber-700 border-amber-300',       dot: 'bg-amber-500',   label: '🟡 Moderate' },
    Urgent:   { bg: 'bg-red-100 text-red-700 border-red-300',             dot: 'bg-red-500',     label: '🔴 Urgent' },
  };
  const s = map[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill border text-sm font-semibold ${s.bg}`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
    </span>
  );
}

export default function SymptomCheckerPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('English');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [recording, setRecording] = useState(false);

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setLoading(false);
      setResults({
        conditions: CONDITIONS,
        doctorType: 'General Physician',
        urgency: 'Moderate',
        advice: 'Rest well, stay hydrated, and monitor your temperature. If fever exceeds 102°F for more than 2 days, visit a doctor.',
      });
    }, 2000);
  };

  const detectLang = (val) => {
    if (/[\u0900-\u097F]/.test(val)) setLang('हिंदी');
    else if (/[\u0B80-\u0BFF]/.test(val)) setLang('தமிழ்');
    else if (/[\u0980-\u09FF]/.test(val)) setLang('বাংলা');
    else setLang('English');
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F6E56] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-pill mb-4">
            ✨ Powered by AI
          </span>
          <h1 className="font-heading font-extrabold text-white text-3xl sm:text-5xl mb-3">
            What symptoms are you feeling?
          </h1>
          <p className="text-white/70 text-base max-w-lg mx-auto">
            Type in Hindi, English, Hinglish, or any Indian language
          </p>
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-10 pb-24 md:pb-10 relative z-10">
        {/* Input Card */}
        <div className="bg-white rounded-card shadow-2xl border border-[#E5E7EB] p-5 mb-8">
          {/* Lang badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-pill border border-amber-200">
              🇮🇳 {lang} detected
            </span>
            <div className="flex gap-2 flex-wrap justify-end">
              {LANG_CHIPS.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`text-[10px] px-2 py-0.5 rounded-pill border font-semibold transition-all ${
                    lang === l ? 'bg-[#1D9E75] text-white border-[#1D9E75]' : 'text-[#6B7280] border-[#E5E7EB] hover:border-[#1D9E75]'
                  }`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); detectLang(e.target.value); }}
            placeholder="e.g. सिर में दर्द, बुखार है... or I have a headache and fever..."
            className="w-full border border-[#E5E7EB] rounded-input p-4 text-[15px] font-body min-h-[120px] resize-none outline-none focus:border-[#1D9E75] transition-colors placeholder:text-[#6B7280]"
          />

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setRecording(!recording)}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                recording ? 'bg-[#1D9E75] border-[#1D9E75] text-white animate-pulse_slow' : 'border-[#1D9E75] text-[#1D9E75] hover:bg-[#E1F5EE]'
              }`}>
              <Mic size={18} />
            </button>
            <button
              onClick={analyze}
              disabled={!input.trim() || loading}
              className="flex-1 bg-[#D85A30] btn-press text-white py-3 rounded-input font-heading font-bold hover:bg-[#c24e27] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center gap-2 py-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-3 h-3 rounded-full bg-[#1D9E75] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6 animate-fadeIn">
            {/* Conditions */}
            <div>
              <h2 className="font-heading font-bold text-lg text-[#1A1A2E] mb-4">Possible Conditions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {results.conditions.map((c, i) => (
                  <div key={i} className="bg-white border border-[#E5E7EB] rounded-card p-4 card-hover text-center">
                    <p className="text-3xl mb-2">{c.emoji}</p>
                    <p className="font-semibold text-[#1A1A2E] text-sm mb-2">{c.name}</p>
                    <span className="inline-block bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold px-2 py-0.5 rounded-pill">
                      {c.match}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-[#E1F5EE] border border-[#1D9E75]/30 rounded-card p-5">
              <p className="text-xs font-semibold text-[#0F6E56] uppercase tracking-widest mb-1">Recommended Specialist</p>
              <p className="font-heading font-bold text-xl text-[#0F6E56]">👨‍⚕️ {results.doctorType}</p>
            </div>

            {/* Urgency + Advice */}
            <div className="bg-white border border-[#E5E7EB] rounded-card p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-heading font-bold">Urgency Level</h3>
                <UrgencyBadge level={results.urgency} />
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <Info size={15} className="flex-shrink-0 mt-0.5 text-[#1D9E75]" />
                <p className="leading-relaxed">{results.advice}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/search?specialty=${results.doctorType}`)}
              className="w-full bg-[#D85A30] btn-press text-white py-3.5 rounded-card font-heading font-bold hover:bg-[#c24e27] transition-colors">
              Find {results.doctorType} →
            </button>

            <p className="text-center text-xs text-[#6B7280] leading-relaxed">
              ⚠️ This is not a medical diagnosis. Always consult a qualified healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
