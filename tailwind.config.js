/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#1D9E75',
        'primary-dark':  '#0F6E56',
        'primary-light': '#E1F5EE',
        accent:     '#D85A30',
        'accent-light':  '#FAECE7',
        bg:         '#F9FAFB',
        card:       '#FFFFFF',
        text:       '#1A1A2E',
        muted:      '#6B7280',
        border:     '#E5E7EB',
        saffron:    '#FF9933',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card:  '12px',
        input: '8px',
        pill:  '20px',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse_slow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.08)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        barGrow: {
          from: { width: '0%' },
        },
      },
      animation: {
        marquee:    'marquee 35s linear infinite',
        pulse_slow: 'pulse_slow 1.5s ease-in-out infinite',
        fadeIn:     'fadeIn 0.2s ease-out forwards',
        barGrow:    'barGrow 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
