import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050816',
        surface: '#0b1120',
        electric: '#4f8cff',
        cyan: '#45d7ff',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(69, 215, 255, .16), 0 24px 80px rgba(20, 92, 255, .14)',
      },
    },
  },
  plugins: [],
};

export default config;

