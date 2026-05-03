import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DOCTORS } from '../data/doctors';

export default function ComparePage() {
  const navigate = useNavigate();
  const { compareDoctors, removeFromCompare, addToCompare } = useApp();

  const attributes = [
    { label: 'Specialty', key: 'specialty' },
    { label: 'Consultation Fee', key: 'fee', prefix: '₹', highlightBest: (val, all) => val === Math.min(...all) },
    { label: 'Rating', key: 'rating', suffix: ' ⭐', highlightBest: (val, all) => val === Math.max(...all) },
    { label: 'Experience', key: 'experience', suffix: ' yrs', highlightBest: (val, all) => val === Math.max(...all) },
    { label: 'Languages', key: 'languages', format: (v) => v.join(', '), highlightBest: (v) => v.length > 2 },
    { label: 'Teleconsult', key: 'teleconsult', format: (v) => v ? '✓ Yes' : '✗ No' },
    { label: 'Wait Time', key: 'waitTime', prefix: '~', suffix: ' min', highlightBest: (val, all) => val === Math.min(...all) },
    { label: 'Hospital', key: 'hospital' },
  ];

  const handleAddClick = () => {
    navigate('/search');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-[#1A1A2E]">Compare Doctors</h1>
        <p className="text-[#6B7280] text-sm mt-1">Select 2–3 doctors to compare side by side</p>
      </div>

      {/* Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[0, 1, 2].map((i) => {
          const doc = compareDoctors[i];
          return (
            <div key={i} className="relative group">
              {doc ? (
                <div className="bg-[#E1F5EE] border-2 border-[#1D9E75] rounded-card p-4 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1D9E75] text-white flex items-center justify-center font-heading font-bold">
                      {doc.avatar}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-[#1A1A2E]">{doc.name}</p>
                      <p className="text-[10px] text-[#0F6E56] font-semibold uppercase">{doc.specialty}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCompare(doc.id)}
                    className="p-1 hover:bg-[#1D9E75]/10 rounded-full text-[#1D9E75] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAddClick}
                  className="w-full h-[68px] border-2 border-dashed border-[#E5E7EB] rounded-card flex items-center justify-center gap-2 text-[#6B7280] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all group"
                >
                  <Plus size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm">Add Doctor</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {compareDoctors.length < 2 ? (
        <div className="bg-white rounded-card border border-[#E5E7EB] p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#FAECE7] text-[#D85A30] rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="font-heading font-bold text-xl text-[#1A1A2E]">Need more doctors</h2>
          <p className="text-[#6B7280] max-w-sm mt-2 mb-6">
            Add at least 2 doctors from the search results to see a side-by-side comparison.
          </p>
          <button 
            onClick={() => navigate('/search')}
            className="bg-[#1D9E75] text-white px-8 py-3 rounded-card font-heading font-bold hover:bg-[#0F6E56] transition-colors btn-press"
          >
            Go to Search
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-card border border-[#E5E7EB] overflow-hidden shadow-sm animate-fadeIn">
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 border-b border-[#E5E7EB] bg-[#F9FAFB] w-[200px] text-xs font-bold text-[#6B7280] uppercase tracking-widest">
                    Attribute
                  </th>
                  {compareDoctors.map(doc => (
                    <th key={doc.id} className="p-5 border-b border-[#E5E7EB] min-w-[200px]">
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold shadow-md"
                          style={{ backgroundColor: doc.avatarColor }}>
                          {doc.avatar}
                        </div>
                        <p className="font-heading font-bold text-[#1A1A2E]">{doc.name}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, idx) => {
                  const allValues = compareDoctors.map(d => d[attr.key]);
                  return (
                    <tr key={idx} className="group hover:bg-[#F9FAFB]/50 transition-colors">
                      <td className="p-5 border-b border-[#E5E7EB] font-semibold text-sm text-[#6B7280]">
                        {attr.label}
                      </td>
                      {compareDoctors.map(doc => {
                        const val = doc[attr.key];
                        const isHighlighted = attr.highlightBest ? attr.highlightBest(val, allValues) : false;
                        return (
                          <td key={doc.id} className={`p-5 border-b border-[#E5E7EB] text-center transition-all ${isHighlighted ? 'bg-[#E1F5EE]' : ''}`}>
                            <div className="flex items-center justify-center gap-1.5">
                              {isHighlighted && <CheckCircle2 size={14} className="text-[#1D9E75]" />}
                              <span className={`text-sm ${isHighlighted ? 'font-bold text-[#0F6E56]' : 'text-[#1A1A2E]'}`}>
                                {attr.prefix}{attr.format ? attr.format(val) : val}{attr.suffix}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Book Row */}
                <tr>
                  <td className="p-5 border-b border-[#E5E7EB] bg-[#F9FAFB]"></td>
                  {compareDoctors.map(doc => (
                    <td key={doc.id} className="p-5 border-b border-[#E5E7EB] text-center">
                      <button 
                        onClick={() => navigate(`/doctor/${doc.id}`)}
                        className="bg-[#D85A30] text-white px-6 py-2 rounded-input font-bold text-sm hover:bg-[#c24e27] transition-all btn-press w-full"
                      >
                        Book
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
