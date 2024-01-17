/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFF",
        lighterPrimary: "#222C4A",
        grayText: "#CBCFDD",
        deepGrayText: "#434A60",
        grayBorder: "#E1E2E5",
        headerText: "#0B132B",
        lightBlue: "#36C",
        greyishBlue: "#0B132B",
        fadedYellow: "#F7D046",
      },
    },
  },
  plugins: [],
};
