/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan:   { DEFAULT: '#00E5FF', dark: '#00B8CC' },
        purple: { DEFAULT: '#7C3AED', light: '#A855F7' },
        blue:   { soft: '#38BDF8' },
        bg: {
          primary:   '#050816',
          secondary: '#0B1023',
          tertiary:  '#111827',
        },
      },
      fontFamily: {
        sans:  ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'gradient-x':   'gradientX 4s ease infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'bounce-soft':   'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%':       { opacity: 1,   transform: 'scale(1.05)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan':   '0 0 30px rgba(0, 229, 255, 0.35), 0 0 60px rgba(0, 229, 255, 0.15)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.35), 0 0 60px rgba(124, 58, 237, 0.15)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'card-hover':  '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 229, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
