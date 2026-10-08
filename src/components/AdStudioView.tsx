import React, { useState } from 'react';
import {
  Copy,
  Check,
  Eye,
  Sliders,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Globe,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { COPY_TEMPLATES } from '../data/marketingData';
import { CopyFramework } from '../types/marketing';

export const AdStudioView: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<CopyFramework>('AIDA');
  const [activePlatformMock, setActivePlatformMock] = useState<'google' | 'meta' | 'linkedin'>('google');
  const [copied, setCopied] = useState(false);

  // Active ad draft state
  const [headline, setHeadline] = useState(
    'Double Your Marketing ROI in 30 Days'
  );
  const [secondaryHeadline, setSecondaryHeadline] = useState(
    'Real-Time Multi-Channel Growth Engine'
  );
  const [primaryText, setPrimaryText] = useState(
    'Struggling with rising ad costs and fragmented attribution? Unify your Google, Meta, and email campaigns in one intelligent command center.'
  );
  const [description, setDescription] = useState(
    'Turn ad spend into predictable revenue. Start your 14-day free trial now.'
  );
  const [displayPath, setDisplayPath] = useState('growth/roi-engine');
  const [callToAction, setCallToAction] = useState('Start Free Trial');
  const [brandName, setBrandName] = useState('MarketPulse');

  // Switch template
  const handleSelectTemplate = (fw: CopyFramework) => {
    setSelectedFramework(fw);
    const tmpl = COPY_TEMPLATES.find((t) => t.framework === fw);
    if (tmpl) {
      setHeadline(tmpl.headline);
      setSecondaryHeadline(tmpl.secondaryHeadline);
      setPrimaryText(tmpl.primaryText);
      setDescription(tmpl.descriptionText);
      setCallToAction(tmpl.callToAction);
    }
  };

  // Copy Strength Analyzer calculations
  const hasNumbers = /\d/.test(headline) || /\d/.test(primaryText);
  const powerWords = ['Double', 'Scale', 'Proven', 'Instant', 'Free', 'Stop', 'Guaranteed', 'Engine', 'Predictable', 'Unified'];
  const matchedPowerWords = powerWords.filter(
    (w) =>
      headline.toLowerCase().includes(w.toLowerCase()) ||
      primaryText.toLowerCase().includes(w.toLowerCase())
  );
  const headlineLengthOk = headline.length >= 15 && headline.length <= 35;
  const copyScore = Math.min(
    (hasNumbers ? 25 : 10) +
      Math.min(matchedPowerWords.length * 15, 45) +
      (headlineLengthOk ? 30 : 15),
    100
  );

  const handleCopyText = () => {
    const textToCopy = `Headline: ${headline} | ${secondaryHeadline}\nPrimary Text: ${primaryText}\nDescription: ${description}\nCTA: ${callToAction}\nURL: https://marketpulse.app/${displayPath}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            High-Converting Ad Copy & Creative Studio
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Craft persuasion-engineered ad copies using proven direct-response frameworks with live Google and Meta SERP previews.
          </p>
        </div>

        <button
          onClick={handleCopyText}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Ad Pack' : 'Copy Ad Pack'}</span>
        </button>
      </div>

      {/* Framework Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
        {COPY_TEMPLATES.map((t) => {
          const isSelected = selectedFramework === t.framework;
          return (
            <button
              key={t.framework}
              onClick={() => handleSelectTemplate(t.framework)}
              className={`flex-1 min-w-[200px] text-left p-3 rounded-lg transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs">{t.framework} Formula</span>
                <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {t.targetObjective}
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                {t.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Two Column Layout: Editor (Left) & Live Preview Mockup (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
            <h2 className="text-sm font-semibold text-white">Ad Copy Controls</h2>

            {/* Headline 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Primary Headline</label>
                <span
                  className={`font-mono text-[11px] ${
                    headline.length > 30 ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {headline.length}/30 chars (Google limit)
                </span>
              </div>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Headline 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Secondary Headline</label>
                <span
                  className={`font-mono text-[11px] ${
                    secondaryHeadline.length > 30 ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {secondaryHeadline.length}/30 chars
                </span>
              </div>
              <input
                type="text"
                value={secondaryHeadline}
                onChange={(e) => setSecondaryHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Primary Text */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Primary Ad Copy / Story Body</label>
                <span className="font-mono text-[11px] text-slate-500">
                  {primaryText.length}/125 chars optimal
                </span>
              </div>
              <textarea
                rows={3}
                value={primaryText}
                onChange={(e) => setPrimaryText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">SERP Description / Offer Hook</label>
                <span
                  className={`font-mono text-[11px] ${
                    description.length > 90 ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {description.length}/90 chars (Google SERP limit)
                </span>
              </div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Display Path & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Display URL Slug</label>
                <div className="flex items-center text-xs bg-slate-950 border border-slate-800 rounded-md overflow-hidden">
                  <span className="px-2.5 py-2 text-slate-500 border-r border-slate-800 bg-slate-900/60">
                    marketpulse.app/
                  </span>
                  <input
                    type="text"
                    value={displayPath}
                    onChange={(e) => setDisplayPath(e.target.value)}
                    className="flex-1 px-2.5 py-2 text-white bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Call to Action Button</label>
                <select
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Start Free Trial">Start Free Trial</option>
                  <option value="Book Live Demo">Book Live Demo</option>
                  <option value="Claim Free Access">Claim Free Access</option>
                  <option value="Learn More">Learn More</option>
                  <option value="Shop Now">Shop Now</option>
                  <option value="Get Started">Get Started</option>
                </select>
              </div>
            </div>
          </div>

          {/* Copy Strength & Persuasion Analyzer */}
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Direct Response Copy Effectiveness
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {copyScore}/100 Score
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div
                style={{ width: `${copyScore}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                {hasNumbers ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>Includes quantifiable figures</span>
              </div>
              <div className="flex items-center gap-1.5">
                {matchedPowerWords.length > 0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>{matchedPowerWords.length} power words active</span>
              </div>
              <div className="flex items-center gap-1.5">
                {headlineLengthOk ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>Headline length well-calibrated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>High-intent action verb CTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mockup Viewport (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Live Ad Mockup Preview</h2>
            {/* Platform switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setActivePlatformMock('google')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activePlatformMock === 'google'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Google Search
              </button>
              <button
                onClick={() => setActivePlatformMock('meta')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activePlatformMock === 'meta'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Meta Feed
              </button>
              <button
                onClick={() => setActivePlatformMock('linkedin')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activePlatformMock === 'linkedin'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LinkedIn
              </button>
            </div>
          </div>

          {/* Google Search Mockup */}
          {activePlatformMock === 'google' && (
            <div className="p-5 bg-white text-slate-900 rounded-xl shadow-md border border-slate-200 space-y-3 font-sans">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900">Sponsored</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-700 truncate">
                  https://www.marketpulse.app/{displayPath}
                </span>
              </div>

              <div>
                <a
                  href="#preview"
                  onClick={(e) => e.preventDefault()}
                  className="text-base font-medium text-blue-800 hover:underline leading-snug cursor-pointer block"
                >
                  {headline} | {secondaryHeadline}
                </a>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {description} {primaryText.slice(0, 110)}...
              </p>

              {/* Sitelink extensions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="text-xs">
                  <span className="font-medium text-blue-800 hover:underline cursor-pointer">
                    Live ROAS Calculator
                  </span>
                  <p className="text-[11px] text-slate-500">Instant multi-channel projection</p>
                </div>
                <div className="text-xs">
                  <span className="font-medium text-blue-800 hover:underline cursor-pointer">
                    Start 14-Day Free Trial
                  </span>
                  <p className="text-[11px] text-slate-500">No credit card required</p>
                </div>
              </div>
            </div>
          )}

          {/* Meta / Instagram Feed Mockup */}
          {activePlatformMock === 'meta' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md text-white">
              {/* Post Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">{brandName}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-[11px] text-indigo-400">Sponsored</span>
                    </div>
                    <span className="text-[10px] text-slate-500">marketingpulse.app</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </div>

              {/* Post Copy */}
              <div className="px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed">
                {primaryText}
              </div>

              {/* Creative Image */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden border-y border-slate-800">
                <img
                  src="/src/assets/images/meta_ad_creative_sample_1791459632177.jpg"
                  alt="MarketPulse ad visual"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Link CTA Bar */}
              <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                <div className="min-w-0 pr-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block truncate">
                    marketpulse.app
                  </span>
                  <span className="text-xs font-semibold text-white truncate block">
                    {headline}
                  </span>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors whitespace-nowrap">
                  {callToAction}
                </button>
              </div>

              {/* Engagement counts */}
              <div className="p-3 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" /> 412
                  </span>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" /> 38
                  </span>
                  <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" /> 52
                  </span>
                </div>
                <Bookmark className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              </div>
            </div>
          )}

          {/* LinkedIn Mockup */}
          {activePlatformMock === 'linkedin' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md text-white p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-indigo-700 flex items-center justify-center font-bold text-xs">
                    MP
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{brandName} Growth Suite</div>
                    <div className="text-[10px] text-slate-400">48,200 followers · Promoted</div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {primaryText}
              </p>

              <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                <img
                  src="/src/assets/images/campaign_banner_summer_1791459644215.jpg"
                  alt="LinkedIn creative"
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{headline}</div>
                    <div className="text-[10px] text-slate-400">marketpulse.app</div>
                  </div>
                  <button className="px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500 rounded hover:bg-indigo-950 transition-colors">
                    {callToAction}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
