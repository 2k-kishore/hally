/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0f172a',
          900: '#111827',
          800: '#1e293b',
          700: '#1f2f4d',
          600: '#253555',
        },
        neon: {
          blue: '#3b82f6',
          purple: '#a855f7',
          cyan: '#06b6d4',
          pink: '#ec4899',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          bg: 'rgba(255,255,255,0.03)',
          hover: 'rgba(255,255,255,0.07)',
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'neon-gradient': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #06b6d4 100%)',
        'neon-blue-purple': 'linear-gradient(135deg, #3b82f6, #a855f7)',
        'neon-purple-cyan': 'linear-gradient(135deg, #a855f7, #06b6d4)',
        'neon-blue-cyan': 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      },
      keyframes: {
        floatIdle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(59,130,246,0.3), 0 0 20px rgba(168,85,247,0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(168,85,247,0.3)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeScaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-idle': 'floatIdle 4s ease-in-out infinite',
        'float-idle-slow': 'floatIdle 6s ease-in-out infinite',
        'float-idle-fast': 'floatIdle 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s ease-in-out forwards',
        'slide-out-right': 'slideOutRight 0.3s ease-in-out forwards',
        'fade-scale-in': 'fadeScaleIn 0.3s ease-in-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        'neon-blue': '0 0 16px rgba(59,130,246,0.5), 0 0 32px rgba(59,130,246,0.25)',
        'neon-purple': '0 0 16px rgba(168,85,247,0.5), 0 0 32px rgba(168,85,247,0.25)',
        'neon-cyan': '0 0 16px rgba(6,182,212,0.5), 0 0 32px rgba(6,182,212,0.25)',
        'neon-sm': '0 0 8px rgba(59,130,246,0.4)',
        'widget': '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        'widget-hover': '0 30px 80px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.2)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
