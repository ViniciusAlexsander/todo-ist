import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Satoshi", "sans-serif"],
    },
    colors: {
      primary: "rgb(23, 23, 23)",
      secondary: "rgb(13, 110, 222)",

      "copy-primary": "rgb(70, 70, 70)",
      "copy-secondary": "rgb(2, 160, 252)",
      border: "rgba(203, 210, 224, 1)",
      surfaces: "rgba(255, 255, 255, 1)",
      disabled: "rgba(203, 210, 224, 1)",
      success: "rgba(168, 199, 0, 1)",
      error: "rgba(199, 0, 0, 1)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
