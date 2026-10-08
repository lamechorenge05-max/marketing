import React, { useState } from 'react';
import {
  Search,
  Filter,
  Play,
  Pause,
  Copy,
  Trash2,
  Plus,
  ArrowUpDown,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Campaign, MarketingChannel, CampaignStatus } from '../types/marketing';

interface CampaignsViewProps {
  campaigns: Campaign[];
  onToggleStatus: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenNewCampaign: () => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  onToggleStatus,
  onDuplicate,
  onDelete,
  onOpenNewCampaign,
}) => {
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<keyof Campaign>('revenue');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filter campaigns
  const filtered = campaigns.filter((c) => {
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesStatus && matchesSearch;
  });

  // Sort campaigns
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  const handleSort = (field: keyof Campaign) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false);
    }
  };

  const channelLabels: Record<MarketingChannel, string> = {
    google_ads: 'Google Ads',
    meta_ads: 'Meta (FB/IG)',
    linkedin: 'LinkedIn',
    tiktok: 'TikTok',
    email: 'Lifecycle Email',
    seo: 'Organic SEO',
  };

  // Aggregates of filtered set
  const filterSpend = filtered.reduce((acc, c) => acc + c.spentToDate, 0);
  const filterRevenue = filtered.reduce((acc, c) => acc + c.revenue, 0);
  const filterConversions = filtered.reduce((acc, c) => acc + c.conversions, 0);
  const filterRoas = filterSpend > 0 ? (filterRevenue / filterSpend).toFixed(2) : '0.00';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Campaign Operations
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor, optimize, and scale live marketing campaigns across multiple paid and organic acquisition channels.
          </p>
        </div>

        <button
          onClick={onOpenNewCampaign}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Aggregate Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400">Total Filtered Spend</span>
          <p className="mt-1 text-base font-bold text-white font-mono tabular-nums">
            ${filterSpend.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400">Attributed Revenue</span>
          <p className="mt-1 text-base font-bold text-emerald-400 font-mono tabular-nums">
            ${filterRevenue.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400">Filtered ROAS</span>
          <p className="mt-1 text-base font-bold text-white font-mono tabular-nums">
            {filterRoas}x
          </p>
        </div>
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400">Conversions</span>
          <p className="mt-1 text-base font-bold text-white font-mono tabular-nums">
            {filterConversions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900/70 p-3 rounded-lg border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns by name or target audience..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Channel selector */}
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Channels</option>
            <option value="google_ads">Google Ads</option>
            <option value="meta_ads">Meta Ads</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="email">Lifecycle Email</option>
            <option value="seo">Organic SEO</option>
          </select>

          {/* Status selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>

          <span className="text-xs text-slate-500 ml-2">
            {sorted.length} {sorted.length === 1 ? 'campaign' : 'campaigns'}
          </span>
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
            <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 tracking-wider">
              <tr>
                <th className="py-3 px-4">Campaign & Audience</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">Status</th>
                <th
                  onClick={() => handleSort('spentToDate')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Spent</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('clicks')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Clicks (CTR)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('conversions')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Conv (CPA)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('revenue')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Revenue</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('roas')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>ROAS</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 text-xs">
                    No campaigns found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((c) => {
                  const isPositiveRoas = c.roas >= 3.0;
                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Name & Target */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-white truncate" title={c.name}>
                          {c.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {c.targetAudience}
                        </div>
                      </td>

                      {/* Channel */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="text-slate-300 font-medium">
                          {channelLabels[c.channel]}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              c.status === 'active'
                                ? 'bg-emerald-400'
                                : c.status === 'paused'
                                ? 'bg-amber-400'
                                : c.status === 'scheduled'
                                ? 'bg-indigo-400'
                                : 'bg-slate-500'
                            }`}
                          />
                          <span className="text-[11px] capitalize text-slate-300">
                            {c.status}
                          </span>
                        </div>
                      </td>

                      {/* Spent to date */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                        <div className="text-white font-medium">
                          ${c.spentToDate.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          of ${c.budget.toLocaleString()}
                        </div>
                      </td>

                      {/* Clicks & CTR */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                        <div className="text-white">{c.clicks.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">{c.ctr.toFixed(1)}% CTR</div>
                      </td>

                      {/* Conversions & CPA */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                        <div className="text-white font-medium">{c.conversions}</div>
                        <div className="text-[10px] text-slate-500">
                          ${c.cpa > 0 ? c.cpa.toFixed(2) : '0.00'} CPA
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono tabular-nums font-semibold text-white">
                        ${c.revenue.toLocaleString()}
                      </td>

                      {/* ROAS */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                        <span
                          className={`font-bold ${
                            isPositiveRoas
                              ? 'text-emerald-400'
                              : c.roas > 0
                              ? 'text-amber-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {c.roas > 0 ? `${c.roas.toFixed(2)}x` : '—'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {c.status !== 'completed' && (
                            <button
                              onClick={() => onToggleStatus(c.id)}
                              title={c.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
                              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                            >
                              {c.status === 'active' ? (
                                <Pause className="w-3.5 h-3.5 text-amber-400" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => onDuplicate(c.id)}
                            title="Duplicate Campaign"
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDelete(c.id)}
                            title="Delete Campaign"
                            className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
