import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { OverviewView } from './components/OverviewView';
import { CampaignsView } from './components/CampaignsView';
import { AdStudioView } from './components/AdStudioView';
import { SeoStrategyView } from './components/SeoStrategyView';
import { PersonasView } from './components/PersonasView';
import { GitHubView } from './components/GitHubView';
import { NewCampaignModal } from './components/NewCampaignModal';
import {
  INITIAL_CAMPAIGNS,
  CHANNEL_PERFORMANCES,
  FUNNEL_STAGES,
  THIRTY_DAY_TREND,
  INITIAL_GIT_REPO,
} from './data/marketingData';
import { Campaign, GitRepoInfo } from './types/marketing';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [repoInfo, setRepoInfo] = useState<GitRepoInfo>(INITIAL_GIT_REPO);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);

  const [recentCommits, setRecentCommits] = useState([
    {
      hash: 'b47f9be',
      message: 'feat: complete online marketing platform suite with github sync',
      date: '2026-10-08 11:46 UTC',
      author: 'lamechorenge05 <lamechorenge05@gmail.com>',
    },
    {
      hash: 'c4c6d87e',
      message: 'feat: initial commit for online marketing platform',
      date: '2026-10-08 11:40 UTC',
      author: 'lamechorenge05 <lamechorenge05@gmail.com>',
    },
  ]);

  // Campaign management actions
  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'paused' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleDuplicate = (id: string) => {
    const target = campaigns.find((c) => c.id === id);
    if (!target) return;
    const duplicated: Campaign = {
      ...target,
      id: `cmp-${Date.now()}`,
      name: `${target.name} (Copy)`,
      status: 'paused',
      spentToDate: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      roas: 0,
    };
    setCampaigns([duplicated, ...campaigns]);
  };

  const handleDelete = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCampaign = (newCmp: Campaign) => {
    setCampaigns([newCmp, ...campaigns]);
  };

  // Commit handler
  const handleCreateCommit = (message: string) => {
    const newHash = Math.random().toString(16).substring(2, 10);
    const newCommit = {
      hash: newHash,
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      author: 'lamechorenge05 <lamechorenge05@gmail.com>',
    };
    setRecentCommits([newCommit, ...recentCommits]);
    setRepoInfo((prev) => ({
      ...prev,
      lastCommitHash: newHash,
      lastCommitMessage: message,
      lastCommitDate: newCommit.date,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Bar following 3-Zone contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
        repoName={repoInfo.repoName}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'overview' && (
          <OverviewView
            channelPerformances={CHANNEL_PERFORMANCES}
            funnelStages={FUNNEL_STAGES}
            trendData={THIRTY_DAY_TREND}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'campaigns' && (
          <CampaignsView
            campaigns={campaigns}
            onToggleStatus={handleToggleStatus}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
          />
        )}

        {activeTab === 'ad-studio' && <AdStudioView />}

        {activeTab === 'seo-strategy' && <SeoStrategyView />}

        {activeTab === 'personas' && <PersonasView />}

        {activeTab === 'github-sync' && (
          <GitHubView
            repoInfo={repoInfo}
            onCommit={handleCreateCommit}
            recentCommits={recentCommits}
          />
        )}
      </main>

      {/* Launch Campaign Modal */}
      <NewCampaignModal
        isOpen={isNewCampaignOpen}
        onClose={() => setIsNewCampaignOpen(false)}
        onSave={handleAddCampaign}
      />

      {/* Quiet Footer adhering strictly to anti-slop rules (no fake latency tickers or ornamental meters) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">MarketPulse Online Marketing</span>
            <span>·</span>
            <span>Remote origin: {repoInfo.owner}/{repoInfo.repoName}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('github-sync')}
              className="hover:text-slate-300 transition-colors"
            >
              Git Remote
            </button>
            <a
              href={repoInfo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
