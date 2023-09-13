import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js',],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
} satisfies Config

