/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(common|uncommon|rare|epic|legend|mythic)-(bottom|top|border)/,
    },
    {
      pattern:
        /(unrank|iron|bronze|silver|gold|platinum|diamond|mithril|demigod|eternity)/,
    },
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        // 아이템 등급 컬러
        common: {
          bottom: '#5b5e60',
          top: '#252626',
          border: '#696969',
        },
        uncommon: {
          bottom: '#476b4a',
          top: '#1f261a',
          border: '#68814c',
        },
        rare: {
          bottom: '#344a6d',
          top: '#222631',
          border: '#465f86',
        },
        epic: {
          bottom: '#654987',
          top: '#292639',
          border: '#9071c2',
        },
        legend: {
          bottom: '#9c7633',
          top: '#352c20',
          border: '#a68f4a',
        },
        mythic: {
          bottom: '#a04343',
          top: '#3d2120',
          border: '#a25756',
        },
        // 티어 컬러
        unrank: 'var(--color-unrank)',
        iron: 'var(--color-iron)',
        bronze: 'var(--color-bronze)',
        silver: 'var(--color-silver)',
        gold: 'var(--color-gold)',
        platinum: 'var(--color-platinum)',
        diamond: 'var(--color-diamond)',
        mithril: 'var(--color-mithril)',
        demigod: 'var(--color-demigod)',
        eternity: 'var(--color-eternity)',
      },
    },
  },
  plugins: [],
}
