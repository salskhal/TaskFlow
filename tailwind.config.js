/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(108deg, rgba(8,148,255,1) 0%, rgba(255,46,84,1) 70%, rgba(255,144,4,1) 100%)",
      },
      colors: {
        dark: {
          3: "#070708",
          6: "#0E0E10",
          8: "#131316",
          12: "#1C1C21",
          15: "#232329",
          20: "#2F2F37",
          25: "#3B3B45",
          30: "#474752",
        },
        gray: {
          40: "#62646C",
          50: "#797C86",
          70: "#AFB0B6",
          80: "#CACACE",
          90: "#E4E4E6",
          95: "#F2F2F3",
          97: "#F7F7F8",
          99: "#FCFCFD",
        },
        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        keyframes: {
          shimmer: {
            "0%, 90%, 100%": {
              "background-position": "calc(-100% - var(--shimmer-width)) 0",
            },
            "30%, 60%": {
              "background-position": "calc(100% + var(--shimmer-width)) 0",
            },
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
