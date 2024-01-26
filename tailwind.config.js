/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        clientCard:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      },
      colors: {
        white: "#FFF",
        primary: "#0b132b",
        lighterPrimary: "#222C4A",
        grayText: "#CBCFDD",
        deepGrayText: "#434A60",
        subtitleText: "#52596D",
        grayBorder: "#E1E2E5",
        grayBorderDashboard: "#E4E7EC",
        headerText: "#0B132B",
        lightBlue: "#36C",
        fadedYellow: "#F7D046",
        fadedYellow2: "#FBF0CB",
        high: "#B32318",
        medium: "#B54708",
        low: "#027948",
        greyStatus: "#F2F4F7",
        inProgress: "#EFF8FF",
        overdue: "#FFFAEB",
        overdueText: "#F79009",
        success: "#ECFDF3",
        inProgress: "#EFF8FF",
        inProgressText: "#175CD3",
        successText: "#027A48",
        inProgressText: "#175CD3",
        statusLowText: "#ECFDF3",
        statusHighText: "#FEF3F2",
        statusMediumText: "#FFFAEB",
        gray50: "#F9FAFB",
        gray300: "#D0D5DD",
        gray500: "#667085",
      },
    },
  },
  plugins: [],
};
