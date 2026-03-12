/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sytycsn-green': '#22c55e',
        'sytycsn-dark': '#0f172a',
        'sytycsn-slate': '#1e293b',
      },
    },
  },
  plugins: [],
}
