import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1626",       // primary background — drafting-table navy, deepened for contrast
        panel: "#152845",     // slightly raised panel surface
        line: "#79ABDE",      // blueprint grid / rule lines — bright
        "line-dim": "#35578A",// faint grid lines — still visible, not gray
        blue: "#8AC1F5",      // interactive / link blue
        amber: "#F5B65B",     // signal accent — CTAs, highlights
        paper: "#FFFFFF",     // primary text on dark — true white
        muted: "#D3DCEC",     // secondary text — light cool white, not gray
        "muted-2": "#A8B6D0", // tertiary / captions — still legible, not gray
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(121,171,222,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(121,171,222,0.24) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
        "grid-sm": "20px 20px",
      },
      keyframes: {
        draft: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        blink: "blink 1s step-end infinite",
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
