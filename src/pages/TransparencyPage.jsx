/* Dark theme and Light theme mode implementation */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Target, Eye, AlertCircle, Layout, TrendingUp, CheckCircle } from 'lucide-react';

export default function TransparencyPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-[#1D9E75] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mt-4 mb-6 leading-tight">
            Bridging the Gap in Indian Healthcare
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
            At VaidyaSearch, we are revolutionizing how 1.4 billion people navigate the complexities of medical care with radical transparency and trust.
          </p>
          <button 
            onClick={() => navigate('/search')}
            className="bg-[#0A4EA3] hover:bg-[#083D82] text-white px-8 py-3 rounded-md font-bold transition-all flex items-center gap-2"
          >
            Start Searching <span>→</span>
          </button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
            alt="Healthcare professionals" 
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-slate-50 dark:bg-slate-800 p-10 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="w-12 h-12 bg-[#0A4EA3] text-white rounded-lg flex items-center justify-center mb-6">
            <Eye size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            To build a Bharat where high-quality healthcare is not a luxury but a transparent, accessible, and dignified right for every citizen, regardless of their location or language. We envision a system where trust is the primary currency.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-10 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="w-12 h-12 bg-[#17C3B2] text-white rounded-lg flex items-center justify-center mb-6">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Empowering patients through AI-driven insights and verified doctor registries. We are dismantling information silos and providing actionable data to bridge the massive gap between patient needs and professional care availability.
          </p>
        </div>
      </section>

      {/* The Broken State Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">The Broken State of Care</h2>
          <p className="text-slate-400 mb-16">Understanding the systemic challenges that VaidyaSearch is built to solve.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex justify-center text-[#1D9E75]"><Layout size={32} /></div>
              <h3 className="font-bold">Fragmentation</h3>
              <p className="text-sm text-slate-400">Disconnected records and scattered provider directories lead to patient confusion.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center text-[#1D9E75]"><TrendingUp size={32} /></div>
              <h3 className="font-bold">Language Barriers</h3>
              <p className="text-sm text-slate-400">Vital medical information is often locked behind English-only platforms.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center text-[#1D9E75]"><AlertCircle size={32} /></div>
              <h3 className="font-bold">Fee Opacity</h3>
              <p className="text-sm text-slate-400">Hidden costs and lack of standardized fee structures create financial anxiety.</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center text-[#1D9E75]"><Shield size={32} /></div>
              <h3 className="font-bold">Access Gap</h3>
              <p className="text-sm text-slate-400">Critical doctor shortages in Tier 2 and Tier 3 cities remain unaddressed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Zomato for Healthcare Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">The Zomato for Healthcare</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-16">We're applying world-class search and discovery principles to the most vital sector of all.</p>
        
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl">
            <div className="text-[#0A4EA3] mb-4"><Shield size={24} /></div>
            <h3 className="text-xl font-bold mb-2">Radical Trust & Verification</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Every doctor on VaidyaSearch undergoes a rigorous multi-step verification process. No ghost profiles, no unverified claims.</p>
          </div>
          <div className="bg-[#0A4EA3] text-white p-8 rounded-2xl">
            <div className="mb-4"><TrendingUp size={24} /></div>
            <h3 className="text-xl font-bold mb-2">AI-Driven Care</h3>
            <p className="text-slate-200 text-sm">Intelligent symptoms tracking that connects you to the right specialist based on real clinical outcomes.</p>
          </div>
          <div className="bg-[#006666] text-white p-8 rounded-2xl">
            <div className="mb-4"><CheckCircle size={24} /></div>
            <h3 className="text-xl font-bold mb-2">Inclusivity First</h3>
            <p className="text-slate-200 text-sm">Designed for Bharat. Built to be accessible for the digital-first urban professional and the first-time internet user.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl">
            <div className="text-[#17C3B2] mb-4"><TrendingUp size={24} /></div>
            <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Wait times, fee transparency, and patient advocacy metrics that let you choose with confidence.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#0A4EA3] rounded-[32px] p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Healthcare Revolution</h2>
          <p className="text-slate-200 mb-10 max-w-2xl mx-auto">Be part of the movement towards a more transparent, empathetic, and efficient Indian healthcare ecosystem.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/search')} className="bg-white text-[#0A4EA3] px-10 py-3 rounded-full font-bold">Find Doctor</button>
            <button className="border-2 border-white text-white px-10 py-3 rounded-full font-bold">Partner With Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}
