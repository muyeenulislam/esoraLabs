import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "esora labs",
  description: "esora labs",
  icons: {
    icon: ["/esoraLogo.svg?v=4"],
    apple: ["/esoraLogo.svg?v=4"],
    shortcut: ["/esoraLogo.svg"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
