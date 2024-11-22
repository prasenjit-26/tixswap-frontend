import { Montserrat } from "next/font/google";
import Script from 'next/script'
import AppNavBar from "../../src/components/AppNavBar";
import { pwaTrackingListeners } from "../scripts/pwaEventlisteners";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
});

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  pwaTrackingListeners();
}

export const metadata: Metadata = {
  title: "TIX-SWAP",
  description: "Welcome to TIX-SWAP - where every seat tells a story.",
  manifest: "/manifest.webmanifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <Script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module" />
      </head>
      <body className={inter.className}>
        <Providers>
          <main
            className={`flex flex-col h-svh text-foreground bg-background ${inter.variable} font-sans`}
          >
            <AppNavBar />
            <div className="container mx-auto flex-1">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

if (isBrowser && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("Service worker registered");
      })
      .catch((err) => {
        console.log("Service worker registration failed", err);
      });
  });
}
