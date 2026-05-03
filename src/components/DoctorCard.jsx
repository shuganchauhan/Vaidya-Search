import React from 'react';
import { Heart, Bookmark, CheckCircle, Video, BookOpen, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function DoctorCard({ doctor, compact = false }) {
  const navigate = useNavigate();
  const { toggleSave, isSaved, addToCompare, isInCompare } = useApp();
  const saved = isSaved(doctor.id);
  const inCompare = isInCompare(doctor.id);

  return (
    <div className="bg-white rounded-card border border-[#E5E7EB] card-hover relative flex flex-col group overflow-hidden">
      {/* Top bar */}
      <div className="flex items-start justify-between p-4 pb-2">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0 shadow-md"
            style={{ backgroundColor: doctor.avatarColor }}
          >
            {doctor.avatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-heading font-semibold text-[#1A1A2E] text-[15px] leading-tight">
                {doctor.name}
              </h3>
              {doctor.verified && (
                <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-pill border border-blue-200">
                  <CheckCircle size={10} /> Verified
                </span>
              )}
            </div>
            <span className="inline-block bg-[#E1F5EE] text-[#0F6E56] text-[10px] font-semibold px-2 py-0.5 rounded-pill mt-0.5">
              {doctor.specialty}
            </span>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => toggleSave(doctor)}
          className="p-1.5 rounded-full transition-all hover:bg-[#E1F5EE] flex-shrink-0"
          title={saved ? 'Remove bookmark' : 'Save doctor'}
        >
          <Heart
            size={18}
            className={saved ? 'fill-[#D85A30] text-[#D85A30]' : 'text-[#6B7280]'}
          />
        </button>
      </div>

      {/* Stats row */}
      <div className="px-4 pb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6B7280]">
        <span className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="font-semibold text-[#1A1A2E]">{doctor.rating}</span>
          <span>· {doctor.reviews} reviews</span>
        </span>
        <span>· {doctor.experience} yrs exp</span>
      </div>

      {/* Info rows */}
      <div className="px-4 pb-2 space-y-1">
        <p className="text-[12px] text-[#6B7280] flex items-center gap-1">
          🏥 <span>{doctor.hospital}</span>
        </p>
        <p className="text-[12px] text-[#6B7280] flex items-center gap-1">
          📍 <span>{doctor.distance} km away · ⏱ ~{doctor.waitTime} min wait</span>
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {doctor.languages.map(l => (
            <span key={l} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-pill border border-blue-100">
              🗣️ {l}
            </span>
          ))}
          {doctor.teleconsult && (
            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded-pill border border-emerald-200">
              <Video size={9} /> Online
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-[#E5E7EB] px-4 py-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#6B7280]">Consultation</p>
          <p className="font-heading font-bold text-[#1D9E75] text-[18px]">₹{doctor.fee}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCompare(doctor)}
            title="Add to compare"
            className={`p-2 rounded-input border transition-all ${inCompare ? 'bg-[#E1F5EE] border-[#1D9E75] text-[#1D9E75]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#1D9E75] hover:text-[#1D9E75]'}`}
          >
            <Scale size={15} />
          </button>
          <button
            onClick={() => navigate(`/doctor/${doctor.id}`)}
            className="bg-[#D85A30] btn-press text-white px-4 py-2 rounded-input text-[13px] font-semibold hover:bg-[#c24e27] transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
