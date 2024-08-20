import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      s: "5px",
      m: "10px",
      lg: "20px",
    },
    extend: {
      colors: {
        primary: "#0E1E3D",
        title: "#A4A4A4",
        content: "#6A7487",
        activeBg: "#3B82F6",
        success: "#117E3E",
        error: "#971919",
      },
      fontSize: {
        xs: "14px",
        s: "16px",
        m: "22px",
        l: "32px",
      },
      spacing: {
        xxs: "5px",
        xs: "10px",
        s: "15px",
        m: "20px",
        l: "25px",
        xl: "35px",
        xxl: "45px",
        xxxl: "60px",
        xxxxl: "80px",
      },
    },
  },
  plugins: [],
};
export default config;
