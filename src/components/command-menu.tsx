'use client';

import { Search, X } from 'lucide-react';
import { navigation, profile } from '@/data/portfolio';

type CommandMenuProps = { open: boolean; onClose: () => void };

export function CommandMenu({ open, onClose }: CommandMenuProps) {
  if (!open) return null;
  const goTo = (target: string) => { onClose(); document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-start bg-ink/75 px-5 pt-[15vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Quick navigation">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0b1120] shadow-2xl shadow-black/50">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><Search className="text-cyan" size={19} /><span className="flex-1 text-sm text-slate-400">Quick navigation</span><button type="button" onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close quick navigation"><X size={18} /></button></div>
        <div className="p-2">
          {navigation.map(([label, target]) => <button key={target} type="button" onClick={() => goTo(target)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-cyan/10 hover:text-cyan"><span>{label}</span><span className="font-mono text-xs text-slate-600">jump</span></button>)}
          <a href={profile.resume} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-cyan/10 hover:text-cyan" onClick={onClose}><span>Download résumé</span><span className="font-mono text-xs text-slate-600">PDF</span></a>
        </div>
        <p className="border-t border-white/10 px-5 py-3 font-mono text-[11px] text-slate-500">Press Esc to close</p>
      </div>
    </div>
  );
}
