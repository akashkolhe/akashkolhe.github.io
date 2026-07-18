'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, GitFork, Github, Star, TerminalSquare } from 'lucide-react';
import { profile } from '@/data/portfolio';

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  archived: boolean;
};

const filters = ['All', 'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Linux', 'Python', 'DevOps', 'Cloud'];

function repoMatches(repo: GithubRepo, filter: string) {
  if (filter === 'All') return true;
  const index = [repo.name, repo.description ?? '', repo.language ?? '', ...repo.topics].join(' ').toLowerCase();
  return index.includes(filter.toLowerCase());
}

function prettyName(name: string) {
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function GithubProjects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&direction=desc&per_page=100`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed');
        return response.json() as Promise<GithubRepo[]>;
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.archived));
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  const visibleRepos = useMemo(() => repos.filter((repo) => repoMatches(repo, filter)), [filter, repos]);

  return (
    <div className="mt-12">
      <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter GitHub repositories">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${filter === item ? 'border-cyan/40 bg-cyan/15 text-cyan' : 'border-white/10 bg-white/[.03] text-slate-400 hover:border-white/25 hover:text-slate-100'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
          {[0, 1, 2].map((item) => <div key={item} className="glass h-64 animate-pulse rounded-2xl bg-white/[.025]" />)}
        </div>
      )}

      {status === 'error' && (
        <div className="glass rounded-2xl p-7 text-slate-300">
          <TerminalSquare className="mb-3 text-cyan" size={24} aria-hidden="true" />
          <p className="font-semibold text-slate-100">The live repository feed is temporarily unavailable.</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Browse the complete, current project history directly on GitHub.</p>
          <a className="button-secondary mt-5 inline-flex" href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub</a>
        </div>
      )}

      {status === 'ready' && (
        <>
          <p className="mb-5 text-sm text-slate-500" aria-live="polite">{visibleRepos.length} public {visibleRepos.length === 1 ? 'repository' : 'repositories'}{filter !== 'All' ? ` matching ${filter}` : ''}.</p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleRepos.map((repo) => (
              <article key={repo.id} className="group glass relative flex min-h-64 flex-col overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-lg border border-cyan/20 bg-cyan/[.08] p-2 text-cyan"><Github size={18} aria-hidden="true" /></span>
                  <span className="font-mono text-xs text-slate-500">updated {new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(repo.updated_at))}</span>
                </div>
                <h3 className="mt-6 font-[Space_Grotesk] text-xl font-semibold text-slate-50">{prettyName(repo.name)}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{repo.description || 'Public GitHub project by Akash Kolhe.'}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[repo.language, ...repo.topics].filter(Boolean).slice(0, 4).map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                  <span className="flex items-center gap-3"><span className="inline-flex items-center gap-1"><Star size={13} /> {repo.stargazers_count}</span><span className="inline-flex items-center gap-1"><GitFork size={13} /> {repo.forks_count}</span></span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-cyan hover:text-white">View <ExternalLink size={13} /></a>
                </div>
              </article>
            ))}
          </div>
          {visibleRepos.length === 0 && <p className="glass rounded-xl p-6 text-sm text-slate-400">No public repositories match this filter yet. Try another technology or browse all projects on GitHub.</p>}
        </>
      )}
    </div>
  );
}

