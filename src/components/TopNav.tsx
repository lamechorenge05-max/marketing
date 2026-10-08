import React from 'react';
import { GitBranch, Plus, ExternalLink } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewCampaign: () => void;
  repoName: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewCampaign,
  repoName,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'ad-studio', label: 'Ad Studio' },
    { id: 'seo-strategy', label: 'SEO Strategy' },
    { id: 'personas', label: 'Personas' },
    { id: 'github-sync', label: 'GitHub Sync' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('overview')}
          className="text-left font-bold text-xl tracking-tight text-white transition-opacity hover:opacity-90"
        >
          MarketPulse
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap transition-colors py-1 ${
                  isActive
                    ? 'text-white border-b-2 border-indigo-500 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('github-sync')}
            title="Connected to lamechorenge05-max/online-marketing"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-800/70 rounded-md hover:bg-emerald-900/60 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="truncate max-w-[150px]">{repoName}</span>
          </button>

          <button
            onClick={onOpenNewCampaign}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="md:hidden flex items-center gap-4 overflow-x-auto px-4 py-2 border-t border-slate-900 text-xs font-medium scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap py-1 ${
              activeTab === item.id
                ? 'text-indigo-400 font-semibold border-b border-indigo-400'
                : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
