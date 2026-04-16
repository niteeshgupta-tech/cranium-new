/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1020",
        aurora: "#6EE7F9",
        lilac: "#A78BFA",
        coral: "#FB7185",
        healthy: "#34D399",
        moderate: "#FBBF24",
        "high-risk": "#FB7185",
      },
      boxShadow: {
        glow: "0 0 60px rgba(110, 231, 249, 0.25)",
      },
    },
  },
  plugins: [],
};
