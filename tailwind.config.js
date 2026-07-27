
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // HeroUI path
    ],
    theme: {
      extend: {},
    },
    darkMode: "class",
    plugins: [require("@heroui/theme")],
}