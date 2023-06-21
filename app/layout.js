import "./globals.css";
import { Inter } from "next/font/google";

//font-family: 'Inter', sans-serif;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TopSpeed",
  description: "Get your speed on!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" data-theme="forest" className="flex justify-center">
      <meta name="application-name" content="TopSpeed" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TopSpeed" />
      <meta name="description" content="Get your speed on!" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="TopSpeed" />
      <meta property="og:description" content="Get your speed on!" />
      <meta property="og:site_name" content="TopSpeed" />
      <meta property="og:url" content="https://topspeedapp.com" />
      <meta
        property="og:image"
        content="https://topspeedapp.com/images/icons/icon-512x512.png"
      />
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className="w-full bg-base-100">{children}</body>
    </html>
  );
}
