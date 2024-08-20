import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "lc-grayish-blue": "hsl(237, 18%, 59%)",
        "lc-soft-red": "hsl(345, 95%, 68%)",
        // Neutral
        "lc-white": "hsl(0, 0%, 100%)",
        "lc-dark-desaturated-blue": "hsl(236, 21%, 26%)",
        "lc-very-dark-blue": "hsl(235, 16%, 14%)",
        "lc-bottom-gradient": "hsl(272, 20%, 15%)",
        "lc-very-dark-black-blue": "hsl(234, 17%, 12%)",
      },
      backgroundImage: {
        // "sample-bg": "/tsugini" // basepath of github pages
      },
      fontSize: {
        base: "14px"
      },
      fontFamily: {
        redhat: ["Red Hat Text", "sans-serif"],
      },
      fontWeight: {
        base: "700"
      },
      screens: {
        mobile: "375px",
        desktop: "1440px"
      }
    },
  },
  plugins: [],
};
export default config;
