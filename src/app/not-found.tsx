import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-slate-100">
      <section className="max-w-lg text-center">
        <p className="font-mono text-sm tracking-[0.24em] text-cyan">404 / ROUTE NOT FOUND</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight">This endpoint does not exist.</h1>
        <p className="mt-4 text-slate-400">Return to the portfolio to explore cloud infrastructure, automation, and certifications.</p>
        <Link href="/" className="button-primary mt-8 inline-flex">Back to portfolio</Link>
      </section>
    </main>
  );
}

