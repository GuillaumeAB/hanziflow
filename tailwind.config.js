/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chinese: {
          red: '#dc2626',
          gold: '#f59e0b',
          jade: '#10b981',
          ink: '#0f172a',
          paper: '#fcfbf9',
        },
        tone: {
          1: '#3b82f6', // 1st tone: high flat (Blue)
          2: '#10b981', // 2nd tone: rising (Green)
          3: '#f59e0b', // 3rd tone: dipping (Amber/Orange)
          4: '#ef4444', // 4th tone: falling (Red)
          5: '#6b7280', // neutral (Gray)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        chinese: ['"Noto Serif SC"', '"Source Han Serif SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'serif'],
        hanzi: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
