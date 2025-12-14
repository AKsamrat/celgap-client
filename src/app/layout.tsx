import type { Metadata } from "next";
import { Merriweather, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "900"], // adjust as needed
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular + Bold
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "700"],
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
      <body
        className={`${poppins.className} ${merriweather.className} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
