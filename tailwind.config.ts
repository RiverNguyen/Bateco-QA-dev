import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      lg: '1025px',
      sm: '640px',
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-be-vietnam)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {},
      backgroundImage: {},
      boxShadow: {},
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.flex-y-center': {
          '@apply flex items-center': {},
        },
        '.flex-x-center': {
          '@apply flex justify-center': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': {},
        },
        '.absolute-x-center': {
          '@apply absolute left-1/2 -translate-x-1/2': {},
        },
        '.absolute-y-center': {
          '@apply absolute top-1/2 -translate-y-1/2': {},
        },
      })
    }),
  ],
}
export default config
