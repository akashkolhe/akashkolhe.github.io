import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Akash Kolhe — Cloud & DevOps Engineer',
    short_name: 'Akash Kolhe',
    description: 'Portfolio of Akash Kolhe, Cloud & DevOps Engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050816',
    theme_color: '#050816',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}

