import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'snc-yellow': '#ffff47',
        'snc-dark': '#0e1a1a',
        'snc-dark-2': '#1F2937',
        'snc-gray': '#9CA3AF',
        'snc-light-gray': '#F9FAFB',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 71, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 255, 71, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config
