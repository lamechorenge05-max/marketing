import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  Sliders,
  Sparkles,
  BarChart3,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ChannelPerformance,
  FunnelStage,
  TrendDataPoint,
} from '../types/marketing';

interface OverviewViewProps {
  channelPerformances: ChannelPerformance[];
  funnelStages: FunnelStage[];
  trendData: TrendDataPoint[];
  onSelectTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  channelPerformances,
  funnelStages,
  trendData,
  onSelectTab,
}) => {
  // Chart metric toggle
  const [activeMetric, setActiveMetric] = useState<'both' | 'revenue' | 'spend'>('both');
  const [hoveredTrendIdx, setHoveredTrendIdx] = useState<number | null>(null);

  // Budget Simulator state
  const [simBudget, setSimBudget] = useState(25000);
  const [simCpc, setSimCpc] = useState(1.45);
  const [simConvRate, setSimConvRate] = useState(3.8);
  const [simAov, setSimAov] = useState(115);

  // Dynamic simulation calculations
  const projectedClicks = Math.round(simBudget / Math.max(simCpc, 0.05));
  const projectedConversions = Math.round(projectedClicks * (simConvRate / 100));
  const projectedRevenue = Math.round(projectedConversions * simAov);
  const projectedProfit = projectedRevenue - simBudget;
  const projectedRoas = simBudget > 0 ? (projectedRevenue / simBudget).toFixed(2) : '0.00';
  const projectedCpa = projectedConversions > 0 ? (simBudget / projectedConversions).toFixed(2) : '0.00';

  // Overall totals
  const totalSpend = channelPerformances.reduce((acc, c) => acc + c.spend, 0);
  const totalRevenue = channelPerformances.reduce((acc, c) => acc + c.revenue, 0);
  const totalConversions = channelPerformances.reduce((acc, c) => acc + c.conversions, 0);
  const blendedRoas = (totalRevenue / totalSpend).toFixed(2);
  const blendedCac = (totalSpend / totalConversions).toFixed(2);
  const blendedAov = (totalRevenue / totalConversions).toFixed(2);

  // Chart max values for scaling
  const maxRevenue = Math.max(...trendData.map((d) => d.revenue));
  const maxSpend = Math.max(...trendData.map((d) => d.spend));
  const chartHeight = 160;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Headline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Marketing Performance Command
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time attribution and multi-channel campaign analytics across search, social, and retention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Reporting Period</span>
            <span className="text-xs font-semibold text-slate-200">Last 30 Days (Real-time)</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Attributed Revenue</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-emerald-400 font-medium">
            +24.8% vs prior period
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Total Ad Spend</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              ${totalSpend.toLocaleString()}
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            Within monthly budget
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Blended ROAS</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
              {blendedRoas}x
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-emerald-400">
            Goal: 3.50x target
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Blended CAC</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              ${blendedCac}
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-emerald-400">
            -8.4% cost per customer
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Conversions</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {totalConversions.toLocaleString()}
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-indigo-400">
            Across 6 channels
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Average Order Value</span>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              ${blendedAov}
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            +5.2% basket expansion
          </span>
        </div>
      </div>

      {/* 30-Day Interactive Trend Chart */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">
              Revenue & Ad Spend Trajectory
            </h2>
            <p className="text-xs text-slate-400">
              Interactive timeline showing scaling efficiency and margin expansion.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveMetric('both')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'both'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spend vs Revenue
            </button>
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'revenue'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Revenue Only
            </button>
            <button
              onClick={() => setActiveMetric('spend')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'spend'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spend Only
            </button>
          </div>
        </div>

        {/* SVG Chart visualization */}
        <div className="relative pt-6 pb-2">
          <div className="h-44 w-full flex items-end gap-2 md:gap-4 px-2">
            {trendData.map((d, idx) => {
              const revHeight = (d.revenue / maxRevenue) * chartHeight;
              const spendHeight = (d.spend / maxRevenue) * chartHeight;
              const isHovered = hoveredTrendIdx === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredTrendIdx(idx)}
                  onMouseLeave={() => setHoveredTrendIdx(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-14 z-20 px-3 py-2 bg-slate-950 border border-slate-700 rounded-md shadow-xl text-center pointer-events-none whitespace-nowrap">
                      <span className="block text-[11px] font-semibold text-white">{d.date}</span>
                      <span className="block text-[10px] text-emerald-400 font-mono">
                        Rev: ${d.revenue.toLocaleString()} (ROAS {d.roas}x)
                      </span>
                      <span className="block text-[10px] text-indigo-400 font-mono">
                        Spend: ${d.spend.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {activeMetric !== 'revenue' && (
                      <div
                        style={{ height: `${spendHeight}px` }}
                        className={`w-1/2 rounded-t transition-all ${
                          isHovered ? 'bg-indigo-400' : 'bg-indigo-600/70'
                        }`}
                      />
                    )}
                    {activeMetric !== 'spend' && (
                      <div
                        style={{ height: `${revHeight}px` }}
                        className={`w-1/2 rounded-t transition-all ${
                          isHovered ? 'bg-emerald-400' : 'bg-emerald-500/80'
                        }`}
                      />
                    )}
                  </div>
                  <span className="mt-2 text-[10px] font-mono text-slate-500 truncate w-full text-center">
                    {d.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
              <span>Attributed Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
              <span>Ad Spend</span>
            </div>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 text-[11px]">Hover any date column for exact metrics</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Channel Breakdown & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Breakdown */}
        <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Multi-Channel Performance Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Efficiency and ROAS rank by marketing channel.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('campaigns')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View Campaigns</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {channelPerformances.map((c) => {
              const spendShare = ((c.spend / totalSpend) * 100).toFixed(1);
              return (
                <div key={c.channel} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{c.channelName}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">
                        Spend: <strong className="text-slate-200 font-mono">${c.spend.toLocaleString()}</strong>
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {c.roas.toFixed(2)}x ROAS
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${Math.min((c.revenue / totalRevenue) * 100 * 1.5, 100)}%`,
                        backgroundColor: c.color,
                      }}
                      className="h-full rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      {c.conversions} conversions · ${c.cpc.toFixed(2)} CPC · {c.ctr.toFixed(1)}% CTR
                    </span>
                    <span className="font-mono">
                      Revenue: ${c.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Touch Funnel */}
        <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              End-to-End Customer Acquisition Funnel
            </h2>
            <p className="text-xs text-slate-400">
              Drop-off analysis from initial impression to closed revenue.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {funnelStages.map((stage, idx) => {
              const widthPct = Math.max(100 - idx * 14, 25);
              return (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{stage.stage}</span>
                    <span className="font-mono text-white font-semibold">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-7 bg-slate-950 rounded-md overflow-hidden relative flex items-center px-3 border border-slate-800/70">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-700/60 to-indigo-500/60 rounded-md"
                    />
                    <div className="relative z-10 flex items-center justify-between w-full text-[11px]">
                      <span className="text-indigo-200">
                        {idx === 0 ? 'Top of Funnel' : `Step Conversion: ${stage.conversionRate}%`}
                      </span>
                      {idx > 0 && (
                        <span className="text-slate-400">
                          Drop-off: {stage.dropoffRate.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive ROAS & Budget Forecast Simulator */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-semibold text-white">
                Interactive ROAS & Budget Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Model scale scenarios: tweak ad spend, CPC, and conversion rates to forecast revenue and net profit.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2.5 py-1 rounded">
            Live Scenario Modeler
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
          {/* Sliders (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Slider 1: Budget */}
            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Planned Monthly Ad Spend</span>
                <span className="font-mono text-white font-semibold">
                  ${simBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="1000"
                value={simBudget}
                onChange={(e) => setSimBudget(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>$2,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
              </div>
            </div>

            {/* Slider 2: Average CPC */}
            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Cost Per Click (CPC)</span>
                <span className="font-mono text-white font-semibold">
                  ${simCpc.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.20"
                max="8.00"
                step="0.05"
                value={simCpc}
                onChange={(e) => setSimCpc(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>$0.20 (Social/Display)</span>
                <span>$4.00</span>
                <span>$8.00 (High Search)</span>
              </div>
            </div>

            {/* Slider 3: Conversion Rate */}
            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Landing Page Conversion Rate</span>
                <span className="font-mono text-white font-semibold">
                  {simConvRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={simConvRate}
                onChange={(e) => setSimConvRate(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>0.5% (Cold Traffic)</span>
                <span>3.5% (Benchmark)</span>
                <span>10.0% (Warm List)</span>
              </div>
            </div>

            {/* Slider 4: Average Order Value */}
            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Average Order / Deal Value (AOV)</span>
                <span className="font-mono text-white font-semibold">
                  ${simAov}
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="1000"
                step="5"
                value={simAov}
                onChange={(e) => setSimAov(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>$25</span>
                <span>$500</span>
                <span>$1,000</span>
              </div>
            </div>
          </div>

          {/* Forecasted Outcome Card (1 col) */}
          <div className="p-5 bg-gradient-to-b from-indigo-950/70 to-slate-950 border border-indigo-800/60 rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                Projected Forecast
              </span>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Projected Clicks:</span>
                  <span className="font-mono text-white font-semibold">
                    {projectedClicks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Projected Customers:</span>
                  <span className="font-mono text-white font-semibold">
                    {projectedConversions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target CPA:</span>
                  <span className="font-mono text-white font-semibold">
                    ${projectedCpa}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2">
                  <span className="text-slate-300 font-medium">Gross Revenue:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    ${projectedRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">Net Profit:</span>
                  <span
                    className={`font-mono font-bold ${
                      projectedProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    ${projectedProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Forecasted ROAS:</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {projectedRoas}x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
