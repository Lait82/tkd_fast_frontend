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
          textmuted: "var(--color-textmuted)",
          accentblue: "var(--color-accentblue)",
          accentgreen: "var(--color-accentgreen)",
          accentred: "var(--color-accentred)",
          yellow: "var(--color-yellow)",
          neutrallight: "var(--color-neutrallight)",
          warning: "var(--color-warning)",
        }
      }
    },
    plugins: []
  }
  