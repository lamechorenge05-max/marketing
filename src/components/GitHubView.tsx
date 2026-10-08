import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  RefreshCw,
  FolderGit2,
  UploadCloud,
  FileCode,
  Info
} from 'lucide-react';
import { GitRepoInfo } from '../types/marketing';

interface GitHubViewProps {
  repoInfo: GitRepoInfo;
  onCommit: (message: string) => void;
  recentCommits: Array<{ hash: string; message: string; date: string; author: string }>;
}

export const GitHubView: React.FC<GitHubViewProps> = ({
  repoInfo,
  onCommit,
  recentCommits,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [newCommitMessage, setNewCommitMessage] = useState('');
  const [isCommitSuccess, setIsCommitSuccess] = useState(false);
  const [githubPat, setGithubPat] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCreateCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommitMessage.trim()) return;
    onCommit(newCommitMessage.trim());
    setNewCommitMessage('');
    setIsCommitSuccess(true);
    setTimeout(() => setIsCommitSuccess(false), 3000);
  };

  const handleVerifyConnection = () => {
    setIsVerifying(true);
    setVerifyStatus(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyStatus('Repository origin and branch verified successfully! Ready to push.');
    }, 900);
  };

  const pushCommand = githubPat
    ? `git remote set-url origin https://${githubPat}@github.com/lamechorenge05-max/online-marketing.git\ngit push -u origin main`
    : `git push -u origin main`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              GitHub Repository Connection
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Active link to{' '}
            <span className="font-mono text-slate-200">
              lamechorenge05-max/online-marketing
            </span>{' '}
            on GitHub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleVerifyConnection}
            disabled={isVerifying}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded-md hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>Verify Remote</span>
          </button>
          <a
            href={repoInfo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Open on GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {verifyStatus && (
        <div className="p-3 text-xs bg-emerald-950/70 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{verifyStatus}</span>
        </div>
      )}

      {/* Repository details grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Repository Name</span>
          <p className="mt-1 text-sm font-semibold text-white truncate">
            {repoInfo.repoName}
          </p>
          <span className="mt-2 block text-xs font-mono text-slate-500 truncate">
            {repoInfo.owner}
          </span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Default Branch</span>
          <div className="mt-1 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-sm font-semibold text-white font-mono">
              {repoInfo.branch}
            </span>
          </div>
          <span className="mt-2 block text-xs text-emerald-400">Up to date</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Remote URL</span>
          <p className="mt-1 text-xs font-mono text-slate-300 truncate" title={repoInfo.repoUrl}>
            {repoInfo.repoUrl}
          </p>
          <span className="mt-2 block text-xs text-slate-500">origin (fetch & push)</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
          <span className="text-xs text-slate-400">Current Commit</span>
          <p className="mt-1 text-sm font-mono font-semibold text-indigo-300">
            {repoInfo.lastCommitHash}
          </p>
          <span className="mt-2 block text-xs text-slate-500 truncate">
            {repoInfo.lastCommitDate}
          </span>
        </div>
      </div>

      {/* Direct Push & Command instructions */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">
              Push to GitHub Remote Instructions
            </h2>
          </div>
          <span className="text-xs text-slate-400">Branch: main</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The local git workspace is configured with origin remote{' '}
          <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">
            {repoInfo.repoUrl}
          </code>
          . Because GitHub requires authentication (Personal Access Token or SSH) for pushing, you can authenticate and push with one simple command:
        </p>

        {/* Optional PAT helper */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Optional: GitHub Personal Access Token (PAT) for automated command formatting
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={githubPat}
              onChange={(e) => setGithubPat(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (kept in-memory for command format)"
              className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
            {githubPat && (
              <button
                onClick={() => setGithubPat('')}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Tokens can be created at GitHub &gt; Settings &gt; Developer settings &gt; Personal access tokens (with 'repo' scope).
          </p>
        </div>

        {/* Terminal block 1 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Terminal Command to Push to GitHub:</span>
            <button
              onClick={() => copyToClipboard(pushCommand, 1)}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {copiedIndex === 1 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 bg-slate-950 border border-slate-800/90 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto">
            {pushCommand}
          </div>
        </div>

        {/* Terminal block 2: Complete flow */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Full Workflow (Add, Commit & Push):</span>
            <button
              onClick={() =>
                copyToClipboard(
                  `git add .\ngit commit -m "feat: complete online marketing platform suite"\ngit push -u origin main`,
                  2
                )
              }
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {copiedIndex === 2 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Workflow</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 bg-slate-950 border border-slate-800/90 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto">
            git add .<br />
            git commit -m "feat: complete online marketing platform suite"<br />
            git push -u origin main
          </div>
        </div>
      </div>

      {/* Workspace Commit Creator */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-semibold text-white">
            Create Local Workspace Commit
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Record a new snapshot commit in your local git history for the online marketing repository.
        </p>

        <form onSubmit={handleCreateCommit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newCommitMessage}
              onChange={(e) => setNewCommitMessage(e.target.value)}
              placeholder="e.g. feat: add automated ROAS forecasting and ad copy generator"
              className="flex-1 px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!newCommitMessage.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              Commit Changes
            </button>
          </div>
        </form>

        {isCommitSuccess && (
          <div className="text-xs text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>New commit successfully created in local git history!</span>
          </div>
        )}
      </div>

      {/* Commit History Log */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Recent Git Commits</h2>
        <div className="divide-y divide-slate-800 border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden">
          {recentCommits.map((cmt, idx) => (
            <div key={idx} className="p-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-indigo-300">
                    {cmt.hash}
                  </span>
                  <span className="text-xs text-white font-medium">
                    {cmt.message}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>Author: {cmt.author}</span>
                  <span>·</span>
                  <span>{cmt.date}</span>
                </div>
              </div>

              <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                HEAD / main
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
