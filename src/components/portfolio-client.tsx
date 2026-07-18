'use client';

import emailjs from '@emailjs/browser';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CloudCog,
  Code2,
  Command,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Send,
  ServerCog,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';
import { CommandMenu } from '@/components/command-menu';
import { GithubProjects } from '@/components/github-projects';
import { certifications, experience, featuredProjects, navigation, profile, skillGroups } from '@/data/portfolio';

type GitHubProfile = { public_repos: number; followers: number; following: number };
type GitHubRepo = { stargazers_count: number; forks_count: number };

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
};

const formatNumber = new Intl.NumberFormat('en-IN');

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <motion.div {...fadeUp}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </motion.div>
  );
}

function ArchitectureGlyph() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-3xl border border-cyan/15 bg-gradient-to-br from-blue-500/[.14] via-slate-950/30 to-cyan-300/[.06] p-6 sm:h-[370px]" aria-hidden="true">
      <div className="absolute -right-12 -top-10 h-56 w-56 rounded-full border border-cyan/10 bg-cyan/[.04]" />
      <div className="absolute left-[18%] right-[18%] top-[31%] h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
      <div className="absolute bottom-[25%] left-[22%] right-[22%] h-px bg-gradient-to-r from-transparent via-electric/45 to-transparent" />
      <div className="absolute left-1/2 top-[29%] h-[32%] w-px -translate-x-1/2 bg-gradient-to-b from-cyan/70 via-electric/30 to-transparent" />
      <div className="absolute left-[21%] top-[21%] grid h-20 w-20 place-items-center rounded-2xl border border-cyan/30 bg-[#0b1120]/90 text-cyan shadow-[0_0_35px_rgba(69,215,255,.12)]"><CloudCog size={31} /></div>
      <div className="absolute right-[21%] top-[21%] grid h-20 w-20 place-items-center rounded-2xl border border-cyan/30 bg-[#0b1120]/90 text-cyan shadow-[0_0_35px_rgba(69,215,255,.12)]"><Network size={31} /></div>
      <div className="absolute bottom-[15%] left-1/2 grid h-24 w-24 -translate-x-1/2 place-items-center rounded-2xl border border-electric/35 bg-[#0b1120]/90 text-blue-300 shadow-[0_0_45px_rgba(79,140,255,.16)]"><ServerCog size={34} /></div>
      <span className="absolute left-[11%] top-[14%] font-mono text-[10px] tracking-wider text-cyan/70">CLOUD</span>
      <span className="absolute right-[8%] top-[14%] font-mono text-[10px] tracking-wider text-cyan/70">NETWORK</span>
      <span className="absolute bottom-[10%] left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wider text-blue-200/70">AUTOMATION</span>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050816]/70 to-transparent" />
    </div>
  );
}

function GitHubPulse() {
  const [stats, setStats] = useState({ repos: '—', followers: '—', stars: '—', forks: '—' });

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${profile.githubUsername}`, { signal: controller.signal }).then((res) => res.ok ? res.json() as Promise<GitHubProfile> : Promise.reject(new Error('Profile unavailable'))),
      fetch(`https://api.github.com/users/${profile.githubUsername}/repos?per_page=100`, { signal: controller.signal }).then((res) => res.ok ? res.json() as Promise<GitHubRepo[]> : Promise.reject(new Error('Repositories unavailable'))),
    ])
      .then(([account, repos]) => setStats({
        repos: formatNumber.format(account.public_repos),
        followers: formatNumber.format(account.followers),
        stars: formatNumber.format(repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)),
        forks: formatNumber.format(repos.reduce((sum, repo) => sum + repo.forks_count, 0)),
      }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      });
    return () => controller.abort();
  }, []);

  const metrics = [
    ['Public repos', stats.repos],
    ['Followers', stats.followers],
    ['Stars received', stats.stars],
    ['Forks', stats.forks],
  ];

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3"><span className="rounded-xl border border-cyan/20 bg-cyan/[.07] p-2 text-cyan"><Github size={20} /></span><div><p className="font-semibold text-slate-100">GitHub pulse</p><p className="mt-0.5 text-sm text-slate-500">Live public-profile metrics</p></div></div>
        <a className="inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-white" href={profile.github} target="_blank" rel="noreferrer">@{profile.githubUsername} <ArrowUpRight size={15} /></a>
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
        {metrics.map(([label, value]) => <div key={label} className="p-5 sm:p-6"><p className="font-[Space_Grotesk] text-2xl font-semibold text-slate-50 sm:text-3xl">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    setState('sending');
    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, { from_name: name, from_email: email, message, to_name: profile.name }, { publicKey });
      } else {
        const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      }
      form.reset();
      setState('sent');
    } finally {
      window.setTimeout(() => setState('idle'), 3500);
    }
  }

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-300">Name<input required name="name" autoComplete="name" placeholder="Your name" className="rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan/60" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-300">Email<input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan/60" /></label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-300">How can I help?<textarea required name="message" rows={5} placeholder="Tell me about the role, project, or infrastructure challenge." className="resize-y rounded-xl border border-white/10 bg-white/[.035] px-4 py-3.5 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan/60" /></label>
      <button disabled={state === 'sending'} className="button-primary mt-6 inline-flex disabled:cursor-wait disabled:opacity-70" type="submit"><Send size={16} /> {state === 'sending' ? 'Preparing message…' : state === 'sent' ? 'Message ready' : 'Send message'}</button>
      <p className="mt-4 text-xs leading-5 text-slate-500">Opens your email app by default. Set the three <code className="text-slate-400">NEXT_PUBLIC_EMAILJS_*</code> values to send directly through EmailJS.</p>
    </form>
  );
}

export function PortfolioClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    const onScroll = () => setScrolled(window.scrollY > 560);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setMenuOpen((open) => !open); }
      if (event.key === 'Escape') { setMenuOpen(false); setMobileOpen(false); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKeyDown); };
  }, []);

  const jsonLd = useMemo(() => JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.role, email: profile.email, address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' }, sameAs: [profile.github, profile.linkedin], knowsAbout: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Linux', 'DevOps'],
  }), []);

  const closeMobileAndScroll = (target: string) => { setMobileOpen(false); document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <AnimatePresence>{!ready && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} className="fixed inset-0 z-[200] grid place-items-center bg-ink"><div className="text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan"><Terminal size={21} /></div><p className="mt-4 font-mono text-xs tracking-[.24em] text-slate-400">INITIALIZING PORTFOLIO</p></div></motion.div>}</AnimatePresence>
      <motion.div className="fixed inset-x-0 top-0 z-[110] h-px origin-left bg-gradient-to-r from-electric via-cyan to-blue-300" style={{ scaleX }} />

      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/[.07] bg-ink/75 backdrop-blur-xl">
        <div className="shell flex h-[72px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label="Akash Kolhe, back to top"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan/25 bg-cyan/[.08] font-[Space_Grotesk] font-bold text-cyan transition group-hover:rotate-6">AK</span><span className="hidden text-sm font-semibold text-slate-200 sm:block">Akash Kolhe</span></a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-400 transition hover:text-cyan">{label}</a>)}</nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMenuOpen(true)} className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[.035] px-3 py-2 text-xs text-slate-400 transition hover:border-cyan/30 hover:text-cyan sm:inline-flex" aria-label="Open quick navigation"><Command size={14} /> <span>Menu</span><kbd className="hidden rounded border border-white/10 px-1 py-0.5 font-mono text-[10px] text-slate-500 xl:inline">⌘K</kbd></button>
            <a href="#contact" className="button-primary hidden py-2.5 sm:inline-flex">Let&apos;s talk <ArrowDownRight size={16} /></a>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 lg:hidden" aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        <AnimatePresence>{mobileOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/10 bg-[#070b18] lg:hidden" aria-label="Mobile navigation"><div className="shell grid gap-1 py-4">{navigation.map(([label, href]) => <button type="button" key={href} onClick={() => closeMobileAndScroll(href)} className="rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[.05] hover:text-cyan">{label}</button>)}<button type="button" onClick={() => { setMobileOpen(false); setMenuOpen(true); }} className="rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[.05] hover:text-cyan">Quick menu</button></div></motion.nav>}</AnimatePresence>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[780px] overflow-hidden pt-[72px]">
          <div className="site-grid pointer-events-none absolute inset-0 -z-10 opacity-80" />
          <div className="hero-orb pointer-events-none absolute -right-40 -top-16 -z-10 h-[780px] w-[780px] rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-b from-transparent to-ink" />
          <div className="shell grid min-h-[708px] items-center gap-14 py-20 lg:grid-cols-[1.12fr_.88fr] lg:py-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.07] px-3 py-1.5 text-xs font-medium text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> {profile.availability}</div>
              <p className="mt-8 font-mono text-sm tracking-[.18em] text-cyan">HELLO, I&apos;M AKASH KOLHE</p>
              <h1 className="mt-5 max-w-4xl font-[Space_Grotesk] text-5xl font-semibold leading-[.98] tracking-[-.065em] text-slate-50 sm:text-7xl lg:text-[5.25rem]">I engineer cloud systems that stay <span className="bg-gradient-to-r from-cyan via-blue-300 to-electric bg-clip-text text-transparent">ready.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">AWS-certified Cloud & DevOps Engineer focused on secure infrastructure, reliable automation, and Linux-first operations.</p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="#projects" className="button-primary inline-flex">Explore my work <ArrowDownRight size={17} /></a><a href={profile.resume} download className="button-secondary inline-flex"><Download size={16} /> Download résumé</a></div>
              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><MapPin size={16} className="text-cyan" /> {profile.location}</span><a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-cyan"><Linkedin size={16} /> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-cyan"><Github size={16} /> GitHub</a></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12, ease: [0.16, 1, .3, 1] }} className="relative mx-auto w-full max-w-md lg:max-w-none"><ArchitectureGlyph /><div className="glass absolute -bottom-5 -left-3 max-w-[210px] rounded-2xl px-4 py-3 sm:-left-5"><p className="font-mono text-[10px] tracking-wider text-cyan">INFRASTRUCTURE FOCUS</p><p className="mt-1 text-sm font-semibold text-slate-100">Automate · Observe · Improve</p></div><div className="glass absolute -right-2 top-7 rounded-xl px-3 py-2 text-xs text-slate-300 sm:-right-5"><span className="mr-2 text-cyan">●</span>AWS certified</div></motion.div>
          </div>
        </section>

        <section id="about" className="section border-y border-white/[.07] bg-[#080d1b]/70">
          <div className="shell grid gap-14 lg:grid-cols-[.92fr_1.08fr] lg:items-center"><motion.div {...fadeUp}><p className="eyebrow">01 / SYSTEM THINKING</p><h2 className="section-title">Cloud infrastructure with an operator&apos;s mindset.</h2><p className="section-copy">I bring hands-on experience in AWS environments, Linux administration, cloud networking, and automation. My approach is pragmatic: build secure foundations, make deployment repeatable, and leave systems easier to observe and support.</p><div className="mt-8 flex flex-wrap gap-2">{['AWS Certified', '2.8+ years experience', 'Linux-first', 'Immediate joiner'].map((item) => <span className="chip" key={item}><CheckCircle2 className="mr-1.5" size={13} />{item}</span>)}</div></motion.div><motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2"><div className="glass rounded-2xl p-6 sm:col-span-2"><CloudCog className="text-cyan" size={25} /><p className="mt-6 font-[Space_Grotesk] text-2xl font-semibold text-slate-50">Built for resilience</p><p className="mt-2 text-sm leading-6 text-slate-400">Experience across EC2, VPC, IAM, S3, ALB/ELB, RDS, CloudWatch, Auto Scaling, and secure network configuration.</p></div><div className="glass rounded-2xl p-6"><Terminal className="text-blue-300" size={24} /><p className="mt-5 font-semibold text-slate-100">Automation</p><p className="mt-2 text-sm leading-6 text-slate-400">Terraform, Ansible, Bash, Docker, and CI/CD foundations.</p></div><div className="glass rounded-2xl p-6"><ShieldCheck className="text-cyan" size={24} /><p className="mt-5 font-semibold text-slate-100">Operations</p><p className="mt-2 text-sm leading-6 text-slate-400">Monitoring, incident response, troubleshooting, and RCA habits.</p></div></motion.div></div>
        </section>

        <section id="experience" className="section"><div className="shell"><SectionHeading eyebrow="02 / EXPERIENCE" title="Improving the systems behind the screen." copy="A practical track record across cloud operations, Linux administration, production troubleshooting, and AWS service configuration." /><div className="relative mt-14"><div className="timeline-line absolute bottom-0 left-[11px] top-3 w-px" />{experience.map((item, index) => <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .08 }} key={item.role} className="relative grid gap-6 pb-10 pl-10 last:pb-0 lg:grid-cols-[.42fr_1fr]"><span className="absolute left-0 top-1 grid h-[23px] w-[23px] place-items-center rounded-full border border-cyan/40 bg-ink"><span className="h-2 w-2 rounded-full bg-cyan" /></span><div><p className="font-mono text-xs tracking-wider text-cyan">{item.period}</p><p className="mt-2 text-sm text-slate-500">{item.location}</p></div><div className="glass rounded-2xl p-6 sm:p-7"><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="font-[Space_Grotesk] text-2xl font-semibold text-slate-50">{item.role}</h3><p className="mt-1 text-slate-400">{item.company}</p></div><BriefcaseBusiness size={20} className="text-cyan" /></div><ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-400">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><ChevronRight size={16} className="mt-1 shrink-0 text-cyan" />{bullet}</li>)}</ul></div></motion.article>)}</div></div></section>

        <section id="projects" className="section border-y border-white/[.07] bg-[#080d1b]/70"><div className="shell"><SectionHeading eyebrow="03 / SELECTED WORK" title="Infrastructure designed to be repeatable." copy="Architecture and automation projects built around availability, security, efficient operations, and the practical realities of cloud delivery." /><div className="mt-12 grid gap-5 md:grid-cols-2">{featuredProjects.map((project, index) => <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .07 }} key={project.title} className="group glass relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow"><div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80`} /><div className="relative"><div className="flex items-start justify-between gap-4"><span className="font-mono text-xs tracking-[.16em] text-cyan">{project.type.toUpperCase()}</span><Code2 size={19} className="text-slate-500 transition group-hover:text-cyan" /></div><h3 className="mt-8 max-w-lg font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-slate-50">{project.title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">{project.summary}</p><div className="mt-6 border-l border-cyan/40 pl-4 text-sm leading-6 text-slate-300">{project.impact}</div><div className="mt-7 flex flex-wrap gap-2">{project.stack.map((tool) => <span key={tool} className="chip">{tool}</span>)}</div></div></motion.article>)}</div><div className="mt-20"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">LIVE GITHUB INTEGRATION</p><h3 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold tracking-tight text-slate-50">Repository activity, live from GitHub.</h3></div><a href={profile.github} target="_blank" rel="noreferrer" className="button-secondary inline-flex">All repositories <Github size={16} /></a></div><GithubProjects /></div></div></section>

        <section id="skills" className="section"><div className="shell"><SectionHeading eyebrow="04 / TOOLKIT" title="From cloud primitives to dependable delivery." copy="A focused stack for provisioning, configuring, monitoring, and maintaining modern cloud infrastructure." /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{skillGroups.map((group, index) => <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .06 }} key={group.title} className="glass rounded-2xl p-6"><p className="font-mono text-xs uppercase tracking-[.14em] text-cyan">{group.title}</p><div className="mt-5 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-lg border border-white/10 bg-white/[.035] px-2.5 py-1.5 text-sm text-slate-300 transition hover:border-cyan/30 hover:text-cyan">{skill}</span>)}</div></motion.article>)}</div></div></section>

        <section id="credentials" className="section border-y border-white/[.07] bg-[#080d1b]/70"><div className="shell"><SectionHeading eyebrow="05 / CREDENTIALS" title="AWS-certified, with proof attached." copy="Each credential card links directly to the supplied certificate PDF and includes its verification identifier." /><div className="mt-12 grid gap-5 lg:grid-cols-2">{certifications.map((certificate, index) => <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .08 }} key={certificate.title} className="glass rounded-3xl p-7"><div className="flex items-start justify-between gap-4"><span className="rounded-2xl border border-amber-300/20 bg-amber-300/[.07] p-3 text-amber-200"><Award size={25} /></span><a href={certificate.file} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-white">Open certificate <ExternalLink size={15} /></a></div><h3 className="mt-8 font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-slate-50">{certificate.title}</h3><p className="mt-3 text-sm text-slate-400">{certificate.issued} <span className="mx-2 text-slate-600">•</span> {certificate.expires}</p><div className="mt-7 rounded-xl border border-white/10 bg-black/20 px-4 py-3"><p className="font-mono text-[10px] tracking-[.14em] text-slate-500">VALIDATION NUMBER</p><p className="mt-1 break-all font-mono text-sm text-slate-200">{certificate.id}</p></div><a href="https://aws.amazon.com/verification" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan">AWS credential verification <ArrowUpRight size={14} /></a></motion.article>)}</div><motion.div {...fadeUp} className="mt-12"><GitHubPulse /></motion.div></div></section>

        <section id="contact" className="section relative overflow-hidden"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(69,215,255,.09),transparent_30%)]" /><div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><motion.div {...fadeUp}><p className="eyebrow">06 / CONTACT</p><h2 className="section-title">Let&apos;s make the next deployment smoother.</h2><p className="section-copy">I&apos;m open to Cloud and DevOps roles where thoughtful automation and dependable operations matter. Tell me what you&apos;re building.</p><div className="mt-9 grid gap-3"><a href={`mailto:${profile.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.025] p-4 transition hover:border-cyan/30 hover:bg-cyan/[.05]"><span className="rounded-xl bg-cyan/[.09] p-3 text-cyan"><Mail size={19} /></span><span><span className="block text-xs text-slate-500">Email</span><span className="mt-0.5 block text-sm font-medium text-slate-200">{profile.email}</span></span><ArrowUpRight className="ml-auto text-slate-500 transition group-hover:text-cyan" size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.025] p-4 transition hover:border-cyan/30 hover:bg-cyan/[.05]"><span className="rounded-xl bg-cyan/[.09] p-3 text-cyan"><Linkedin size={19} /></span><span><span className="block text-xs text-slate-500">LinkedIn</span><span className="mt-0.5 block text-sm font-medium text-slate-200">Connect with Akash</span></span><ArrowUpRight className="ml-auto text-slate-500 transition group-hover:text-cyan" size={17} /></a></div></motion.div><motion.div {...fadeUp}><ContactForm /></motion.div></div></section>
      </main>

      <footer className="border-t border-white/[.07] py-8"><div className="shell flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Akash Kolhe. Designed for dependable delivery.</p><div className="flex items-center gap-5"><a className="transition hover:text-cyan" href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a className="transition hover:text-cyan" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="transition hover:text-cyan" href={`mailto:${profile.email}`}>Email</a></div></div></footer>
      <AnimatePresence>{scrolled && <motion.button initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .85 }} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-xl border border-cyan/25 bg-[#0b1120]/90 text-cyan shadow-lg backdrop-blur transition hover:-translate-y-1" aria-label="Back to top"><ArrowUpRight className="rotate-[-45deg]" size={19} /></motion.button>}</AnimatePresence>
      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
