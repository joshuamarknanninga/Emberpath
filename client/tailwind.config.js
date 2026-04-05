/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#020617',
        panel: '#0b1220',
        panelSoft: '#131c2e',
        mist: '#f8f5ef',
        tealMuted: '#5f8c94',
        amberMuted: '#d2a56b',
        blueMuted: '#6f8db5',
        greenMuted: '#75967d'
      },
      fontFamily: {
        heading: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px rgba(2, 6, 23, 0.35)',
        glow: '0 0 0 1px rgba(148,163,184,.08), 0 8px 30px rgba(15,23,42,.5)'
      },
      backgroundImage: {
        radial: 'radial-gradient(circle at 15% 20%, rgba(95,140,148,.16), transparent 40%), radial-gradient(circle at 85% 10%, rgba(111,141,181,.12), transparent 35%)'
      }
    }
  },
  plugins: []
};
