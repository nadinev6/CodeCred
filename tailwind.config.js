/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          text: '#f0f6fc',
          textSecondary: '#7d8590',
          accent: '#238636',
          blue: '#1f6feb',
          warning: '#d29922',
          danger: '#da3633',
        },
        github: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          text: '#f0f6fc',
          textMuted: '#7d8590',
          accent: '#238636',
          blue: '#1f6feb',
        }
      },
      fontFamily: {
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}