# Akash Kolhe — Cloud & DevOps Portfolio

A premium, static portfolio for **Akash Kolhe**, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and the GitHub REST API.

## Highlights

- Dark, responsive cloud/DevOps visual system with keyboard-friendly navigation
- Resume and AWS certificate PDFs hosted with the site
- Verified experience, projects, skills, and credential identifiers sourced from the supplied résumé and certificates
- Live GitHub repository cards, filters, and public-profile metrics (loaded in the visitor's browser)
- Static export suitable for GitHub Pages
- SEO metadata, sitemap, robots rules, Open Graph artwork, JSON-LD, manifest, loading state, command menu, and scroll controls
- Contact form that falls back to the visitor's email app; optional EmailJS support

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To produce the static GitHub Pages build:

```bash
npm run build
```

The generated site is placed in `out/`.

## EmailJS (optional)

The contact form works immediately through a `mailto:` handoff. To send without opening an email client, create `.env.local` with your EmailJS public settings:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Use template fields `from_name`, `from_email`, `message`, and `to_name` in EmailJS. These are public browser-side identifiers, not email account credentials; never commit private credentials.

## Deploying to GitHub Pages

1. Create or use the repository `akashkolhe.github.io` under the `akashkolhe` account.
2. Push this project to its `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the deployment source.
4. The included workflow builds the static export and deploys it automatically on every push to `main`.

If deploying to a project repository rather than `akashkolhe.github.io`, configure a Next.js `basePath` for the repository name before deploying.

## Content sources

- Résumé: current role and project facts
- AWS Certified Solutions Architect – Associate certificate: issue date, expiry date, validation number
- AWS Certified Cloud Practitioner certificate: issue date, expiry date, validation number
- GitHub public API: visitor-time repository and public metric data

## Project structure

```text
src/
  app/                 App shell, SEO, routes, global styling
  components/          Interactive portfolio, command menu, GitHub feed
  data/portfolio.ts    Central editable portfolio content
public/
  resume/              Downloadable résumé PDF
  certificates/        Downloadable AWS credential PDFs
.github/workflows/     GitHub Pages deployment
```

## License

MIT. See [LICENSE](./LICENSE).

