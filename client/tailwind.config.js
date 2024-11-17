/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "*": {
              marginBottom: "0",
              marginTop: "0",
              paddingBottom: "0",
              paddingTop: "0",
            },
          },
        },
        lg: {
          css: {
            "h1,h2,h3,h4,h5,h6": {
              marginBottom: "0",
              marginTop: "0",
              paddingBottom: "0",
              paddingTop: "0",
            },
            p: {
              marginBottom: "0",
              marginTop: "0",
              paddingBottom: "0",
              paddingTop: "0",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
