import React, { useState } from 'react';
import { X, Sparkles, DollarSign } from 'lucide-react';
import { Campaign, MarketingChannel, CampaignObjective } from '../types/marketing';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [channel, setChannel] = useState<MarketingChannel>('google_ads');
  const [objective, setObjective] = useState<CampaignObjective>('conversions');
  const [budget, setBudget] = useState('10000');
  const [dailySpend, setDailySpend] = useState('350');
  const [targetAudience, setTargetAudience] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numBudget = Number(budget) || 5000;
    const numDaily = Number(dailySpend) || 200;

    const newCampaign: Campaign = {
      id: `cmp-${Date.now()}`,
      name: name.trim(),
      channel,
      status: 'active',
      objective,
      budget: numBudget,
      dailySpend: numDaily,
      spentToDate: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      roas: 0,
      cpc: 0,
      cpa: 0,
      ctr: 0,
      startDate,
      endDate,
      targetAudience: targetAudience.trim() || 'Target Segment',
    };

    onSave(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-white">
              Launch Marketing Campaign
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure parameters, channel attribution, and budget pacing.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Campaign Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q4 Black Friday High-Intent Search Scale"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Marketing Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as MarketingChannel)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="google_ads">Google Ads</option>
                <option value="meta_ads">Meta Ads (FB/IG)</option>
                <option value="linkedin">LinkedIn Ads</option>
                <option value="tiktok">TikTok Ads</option>
                <option value="email">Lifecycle Email</option>
                <option value="seo">Organic SEO Cluster</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Primary Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as CampaignObjective)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="conversions">Conversions & Sales</option>
                <option value="lead_generation">Lead Generation</option>
                <option value="brand_awareness">Brand Awareness</option>
                <option value="website_traffic">Website Traffic</option>
                <option value="customer_retention">Customer Retention</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Total Budget ($)</label>
              <input
                type="number"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="10000"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Target Daily Spend ($)</label>
              <input
                type="number"
                required
                value={dailySpend}
                onChange={(e) => setDailySpend(e.target.value)}
                placeholder="350"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Target Audience Description</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. In-market B2B software buyers & ecommerce executives"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
            >
              Deploy Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
