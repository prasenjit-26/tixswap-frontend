import { Montserrat } from "next/font/google";
import Script from 'next/script'
import AppNavBar from "../../src/components/AppNavBar";
import AppFooter from "../../src/components/AppFooter";
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

        <title>TIX-SWAP</title>
        <meta name="description" content="Welcome to TIX-SWAP - where every seat tells a story." />


        <meta property="og:url" content="https://tixswap.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TIX-SWAP" />
        <meta property="og:description" content="Welcome to TIX-SWAP - where every seat tells a story." />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/d45285db-b580-4a3e-b820-028a4b1b7c3b.jpg?token=fNxVl-Jq8HIwinMeDDBww5ibIqhVvrTKcsn5rOKkwCQ&height=630&width=1200&expires=33268544120" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="tixswap.netlify.app" />
        <meta property="twitter:url" content="https://tixswap.netlify.app/" />
        <meta name="twitter:title" content="TIX-SWAP" />
        <meta name="twitter:description" content="Welcome to TIX-SWAP - where every seat tells a story." />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/d45285db-b580-4a3e-b820-028a4b1b7c3b.jpg?token=fNxVl-Jq8HIwinMeDDBww5ibIqhVvrTKcsn5rOKkwCQ&height=630&width=1200&expires=33268544120" />


        <Script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module" />
      </head>
      <body className={inter.className}>
        <Providers>
          <main
            className={`flex flex-col h-svh text-foreground bg-background ${inter.variable} font-sans`}
          >
            <AppNavBar />
            <div className="container mx-auto flex-1">{children}</div>
            <AppFooter />
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
