import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://akashkolhe.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Akash Kolhe — Cloud & DevOps Engineer',
    template: '%s | Akash Kolhe',
  },
  description: 'Portfolio of Akash Kolhe, a Cloud & DevOps Engineer working with AWS, Terraform, Docker, Kubernetes, Linux, and automation.',
  keywords: ['Akash Kolhe', 'Cloud Engineer', 'DevOps Engineer', 'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Linux'],
  authors: [{ name: 'Akash Kolhe' }],
  creator: 'Akash Kolhe',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Akash Kolhe — Cloud & DevOps Engineer',
    description: 'AWS-certified cloud engineer focused on secure, automated, reliable infrastructure.',
    siteName: 'Akash Kolhe Portfolio',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Akash Kolhe — Cloud & DevOps Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Kolhe — Cloud & DevOps Engineer',
    description: 'AWS-certified cloud engineer focused on secure, automated, reliable infrastructure.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}

