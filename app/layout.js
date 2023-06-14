import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TopSpeed",
  description: "Get your speed on!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" data-theme="forest" className="flex justify-center">
      <body className="w-full bg-base-100">
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
