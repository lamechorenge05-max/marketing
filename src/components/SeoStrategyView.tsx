import React, { useState } from 'react';
import {
  Search,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Globe,
  TrendingUp,
  FileText,
  Code
} from 'lucide-react';
import { SEO_KEYWORDS } from '../data/marketingData';
import { KeywordItem } from '../types/marketing';

export const SeoStrategyView: React.FC = () => {
  const [keywords, setKeywords] = useState<KeywordItem[]>(SEO_KEYWORDS);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedMeta, setCopiedMeta] = useState(false);

  // SERP Generator state
  const [pageTitle, setPageTitle] = useState('MarketPulse | Unified Online Marketing Platform & ROAS Engine');
  const [metaDesc, setMetaDesc] = useState('Scale multi-channel paid and organic marketing campaigns. Track real-time attribution, optimize CAC, and generate high-converting ad copy effortlessly.');
  const [canonicalUrl, setCanonicalUrl] = useState('https://www.marketpulse.app/features/online-marketing');

  // New Keyword input
  const [newKw, setNewKw] = useState('');
  const [newVolume, setNewVolume] = useState('5400');
  const [newKd, setNewKd] = useState('45');
  const [newCpc, setNewCpc] = useState('4.20');
  const [newIntent, setNewIntent] = useState<'informational' | 'commercial' | 'transactional'>('commercial');

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKw.trim()) return;
    const item: KeywordItem = {
      id: `kw-${Date.now()}`,
      keyword: newKw.trim(),
      searchVolume: Number(newVolume) || 1000,
      difficulty: Number(newKd) || 40,
      cpc: Number(newCpc) || 2.5,
      intent: newIntent,
      trafficPotential: Math.round((Number(newVolume) || 1000) * 0.35),
    };
    setKeywords([item, ...keywords]);
    setNewKw('');
  };

  const filteredKeywords = keywords.filter((k) =>
    k.keyword.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCopyMetaTags = () => {
    const code = `<title>${pageTitle}</title>\n<meta name="description" content="${metaDesc}" />\n<link rel="canonical" href="${canonicalUrl}" />\n<meta property="og:title" content="${pageTitle}" />\n<meta property="og:description" content="${metaDesc}" />\n<meta property="og:url" content="${canonicalUrl}" />`;
    navigator.clipboard.writeText(code);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  const titleLength = pageTitle.length;
  const descLength = metaDesc.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            SEO & Organic Content Strategy
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Target high-intent search queries, model organic traffic potential, and preview Google SERP snippets.
          </p>
        </div>

        <button
          onClick={handleCopyMetaTags}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors self-start sm:self-auto"
        >
          {copiedMeta ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Code className="w-3.5 h-3.5" />}
          <span>{copiedMeta ? 'Copied Head Tags' : 'Export HTML Meta Tags'}</span>
        </button>
      </div>

      {/* SERP Snippet Previewer and Meta Tag Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
            <h2 className="text-sm font-semibold text-white">
              Google SERP & Snippet Builder
            </h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Page Title Tag</label>
                <span
                  className={`font-mono text-[11px] ${
                    titleLength > 60 ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {titleLength}/60 chars optimal
                </span>
              </div>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Meta Description</label>
                <span
                  className={`font-mono text-[11px] ${
                    descLength > 160 ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {descLength}/160 chars optimal
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Canonical URL</label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live SERP Snippet Preview */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Live Search Engine Result Preview</h2>
          <div className="p-5 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 font-sans space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-600 font-bold">
                M
              </div>
              <div>
                <span className="text-xs text-slate-800 font-medium block">MarketPulse</span>
                <span className="text-[11px] text-slate-500 truncate block">
                  {canonicalUrl}
                </span>
              </div>
            </div>

            <a
              href="#serp"
              onClick={(e) => e.preventDefault()}
              className="text-base text-blue-800 font-medium hover:underline block leading-snug cursor-pointer"
            >
              {pageTitle}
            </a>

            <p className="text-xs text-slate-700 leading-relaxed">
              {metaDesc}
            </p>
          </div>

          {/* Quick On-page SEO Health Checks */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-white block">
              Snippet Optimization Metrics
            </span>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                {titleLength <= 60 && titleLength >= 30 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Title Length: {titleLength} characters ({titleLength <= 60 ? 'No truncation' : 'May truncate'})</span>
              </div>
              <div className="flex items-center gap-2">
                {descLength <= 160 && descLength >= 80 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Meta Description: {descLength} characters ({descLength <= 160 ? 'Optimal' : 'Exceeds 160'})</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Canonical Tag link defined properly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Explorer & Cluster Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">Target Keyword Portfolio</h2>
            <p className="text-xs text-slate-400">
              High-value keywords mapped with commercial intent, difficulty score, and search volume.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter keywords..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Add Keyword inline form */}
        <form
          onSubmit={handleAddKeyword}
          className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-wrap gap-2 items-center"
        >
          <input
            type="text"
            value={newKw}
            onChange={(e) => setNewKw(e.target.value)}
            placeholder="New target keyword (e.g. b2b marketing attribution software)"
            className="flex-1 min-w-[200px] px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            value={newVolume}
            onChange={(e) => setNewVolume(e.target.value)}
            placeholder="Volume"
            className="w-24 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-white font-mono focus:outline-none"
          />
          <input
            type="number"
            value={newKd}
            onChange={(e) => setNewKd(e.target.value)}
            placeholder="KD 0-100"
            className="w-20 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-white font-mono focus:outline-none"
          />
          <select
            value={newIntent}
            onChange={(e) => setNewIntent(e.target.value as any)}
            className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-slate-300 focus:outline-none"
          >
            <option value="commercial">Commercial</option>
            <option value="transactional">Transactional</option>
            <option value="informational">Informational</option>
          </select>
          <button
            type="submit"
            disabled={!newKw.trim()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            + Add Keyword
          </button>
        </form>

        {/* Keyword Table */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
              <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400">
                <tr>
                  <th className="py-3 px-4">Search Term</th>
                  <th className="py-3 px-3">Search Intent</th>
                  <th className="py-3 px-3 text-right">Monthly Volume</th>
                  <th className="py-3 px-3 text-right">Difficulty (KD)</th>
                  <th className="py-3 px-3 text-right">Avg CPC</th>
                  <th className="py-3 px-3 text-right">Rank Position</th>
                  <th className="py-3 px-4 text-right">Traffic Potential</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
                {filteredKeywords.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-white">
                      {k.keyword}
                    </td>
                    <td className="py-3 px-3 font-sans capitalize text-slate-400 text-[11px]">
                      {k.intent}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-200">
                      {k.searchVolume.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`font-semibold ${
                          k.difficulty < 40
                            ? 'text-emerald-400'
                            : k.difficulty < 60
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {k.difficulty}/100
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-300">
                      ${k.cpc.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right text-indigo-300">
                      {k.currentRank ? `#${k.currentRank}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                      +{k.trafficPotential.toLocaleString()}/mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
