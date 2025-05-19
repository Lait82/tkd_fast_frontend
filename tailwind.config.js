/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--color-background)",
          elevated: "var(--color-elevated)",
          text: "var(--color-text)",
          muted: "var(--color-muted)",
          blue: "var(--color-blue)",
          green: "var(--color-green)",
          red: "var(--color-red)",
          yellow: "var(--color-yellow)",
          neutrallight: "var(--color-neutrallight)",
          orange: "var(--color-orange)",
        }
      }
    },
    plugins: []
  }
  