import type { Metadata } from "next";
import { Merriweather, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400"], // adjust as needed
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular + Bold
});

export const metadata: Metadata = {
  title: "CELGAP",
  description: "Centre for Law, Governance & Policy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}  antialiased`}>{children}</body>
    </html>
  );
}
