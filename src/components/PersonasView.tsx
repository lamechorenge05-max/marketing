import React, { useState } from 'react';
import {
  Users,
  Plus,
  Target,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { BUYER_PERSONAS } from '../data/marketingData';
import { BuyerPersona, MarketingChannel } from '../types/marketing';

export const PersonasView: React.FC = () => {
  const [personas, setPersonas] = useState<BuyerPersona[]>(BUYER_PERSONAS);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [aov, setAov] = useState('150');
  const [ltv, setLtv] = useState('1200');
  const [painPoints, setPainPoints] = useState('');
  const [buyingTriggers, setBuyingTriggers] = useState('');

  const handleCreatePersona = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newP: BuyerPersona = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Decision Maker',
      industry: industry.trim() || 'General Business',
      avgOrderValue: Number(aov) || 100,
      projectedLtv: Number(ltv) || 1000,
      painPoints: painPoints.split('\n').filter((p) => p.trim().length > 0),
      buyingTriggers: buyingTriggers.split('\n').filter((t) => t.trim().length > 0),
      preferredChannels: ['google_ads', 'meta_ads', 'email'],
      demographics: {
        ageRange: '28 - 48',
        location: 'Global',
        incomeBracket: '$100k+',
      },
    };

    setPersonas([...personas, newP]);
    setName('');
    setRole('');
    setIndustry('');
    setPainPoints('');
    setBuyingTriggers('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Audience Segments & Buyer Personas
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Define high-value customer profiles to calibrate campaign messaging, channel allocation, and offer psychology.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Cancel' : 'New Persona'}</span>
        </button>
      </div>

      {/* Add Persona Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreatePersona}
          className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 max-w-2xl"
        >
          <h2 className="text-sm font-semibold text-white">Create Target Customer Persona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Persona Name (e.g. Scaling DTC Brand Founder)"
              className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Job Title (e.g. Chief Marketing Officer)"
              className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry (e.g. SaaS / E-commerce)"
              className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={aov}
                onChange={(e) => setAov(e.target.value)}
                placeholder="AOV ($)"
                className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <input
                type="number"
                value={ltv}
                onChange={(e) => setLtv(e.target.value)}
                placeholder="LTV ($)"
                className="px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Pain Points (One per line)</label>
            <textarea
              rows={2}
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
              placeholder="Rising customer acquisition costs&#10;Inability to attribute touchpoints accurately"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Buying Triggers (One per line)</label>
            <textarea
              rows={2}
              value={buyingTriggers}
              onChange={(e) => setBuyingTriggers(e.target.value)}
              placeholder="Proof of 3x+ ROAS within 30 days&#10;Seamless integration with existing CRM"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
          >
            Save Persona Profile
          </button>
        </form>
      )}

      {/* Personas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-indigo-400 font-medium block">
                  {p.industry}
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">{p.name}</h2>
                <p className="text-xs text-slate-400">{p.role}</p>
              </div>

              {/* Financial Profile */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Avg Order Value</span>
                  <span className="font-bold text-white">${p.avgOrderValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Projected LTV</span>
                  <span className="font-bold text-emerald-400">${p.projectedLtv.toLocaleString()}</span>
                </div>
              </div>

              {/* Pain points */}
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  Primary Pain Points:
                </span>
                <ul className="space-y-1 text-slate-300 pl-2">
                  {p.painPoints.map((pt, i) => (
                    <li key={i} className="text-[11px] leading-snug">
                      • {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buying triggers */}
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Buying Triggers:
                </span>
                <ul className="space-y-1 text-slate-300 pl-2">
                  {p.buyingTriggers.map((trg, i) => (
                    <li key={i} className="text-[11px] leading-snug">
                      • {trg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Demographics & Channels */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div>
                Demographics: {p.demographics.ageRange} · {p.demographics.location}
              </div>
              <div className="text-indigo-300">
                Channels: {p.preferredChannels.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
