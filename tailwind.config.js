/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#5752C7',
        ink: '#252438',
        muted: '#AAA9BC',
        line: '#ECECF3',
        surface: '#F8F8FC',
      },
      fontFamily: {
        jakarta: ['PlusJakartaSans_400Regular'],
        medium: ['PlusJakartaSans_500Medium'],
        semibold: ['PlusJakartaSans_600SemiBold'],
        bold: ['PlusJakartaSans_700Bold'],
      },
    },
  },
  plugins: [],
};
