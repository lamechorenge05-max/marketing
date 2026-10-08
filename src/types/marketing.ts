export type MarketingChannel =
  | 'google_ads'
  | 'meta_ads'
  | 'linkedin'
  | 'tiktok'
  | 'email'
  | 'seo';

export type CampaignStatus = 'active' | 'scheduled' | 'paused' | 'completed';

export type CampaignObjective =
  | 'lead_generation'
  | 'conversions'
  | 'brand_awareness'
  | 'website_traffic'
  | 'customer_retention';

export interface Campaign {
  id: string;
  name: string;
  channel: MarketingChannel;
  status: CampaignStatus;
  objective: CampaignObjective;
  budget: number;
  dailySpend: number;
  spentToDate: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roas: number;
  cpc: number;
  cpa: number;
  ctr: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
}

export interface ChannelPerformance {
  channel: MarketingChannel;
  channelName: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  cpc: number;
  ctr: number;
  color: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
}

export interface TrendDataPoint {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
}

export type CopyFramework = 'AIDA' | 'PAS' | 'BAB' | 'Direct';

export interface AdCopyTemplate {
  framework: CopyFramework;
  name: string;
  description: string;
  headline: string;
  secondaryHeadline: string;
  primaryText: string;
  descriptionText: string;
  callToAction: string;
  targetObjective: string;
}

export interface KeywordItem {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number; // 0 - 100
  cpc: number;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  currentRank?: number;
  trafficPotential: number;
}

export interface BuyerPersona {
  id: string;
  name: string;
  role: string;
  industry: string;
  avgOrderValue: number;
  projectedLtv: number;
  painPoints: string[];
  buyingTriggers: string[];
  preferredChannels: MarketingChannel[];
  demographics: {
    ageRange: string;
    location: string;
    incomeBracket: string;
  };
}

export interface GitRepoInfo {
  repoUrl: string;
  owner: string;
  repoName: string;
  branch: string;
  remoteName: string;
  lastCommitHash: string;
  lastCommitMessage: string;
  lastCommitDate: string;
  uncommittedChanges: number;
  status: 'connected' | 'syncing' | 'unreachable';
}
