import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const magistral = localFont({
  src: "../utils/fonts/MagistralBold.otf",
  variable: "--font-magistral-bold",
});

export const metadata = {
  title: "eSora Labs",
  description: "eSora Labs",
  icons: {
    icon: [
      {
        url: "/images/esoraLogo.png",
        href: "/images/esoraLogo.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${magistral.variable}`}>
        {children}
      </body>
    </html>
  );
}
