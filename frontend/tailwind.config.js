/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",            // 包含 index.html
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 包含所有 Vue 組件和 JS/TS 檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}