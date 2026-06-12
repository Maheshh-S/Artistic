import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import TemplateRuntime from "./template-runtime";

export const metadata: Metadata = {
  title: "Artistic - Creative Digital Agency HTML Template",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
  },
};

const stylesheets = [
  "/css/bootstrap.min.css",
  "/css/slicknav.min.css",
  "/css/swiper-bundle.min.css",
  "/css/all.css",
  "/css/animate.css",
  "/css/magnific-popup.css",
  "/css/mousecursor.css",
  "/css/custom.css",
];

const scripts = [
  "/js/jquery-3.7.1.min.js",
  "/js/bootstrap.min.js",
  "/js/validator.min.js",
  "/js/jquery.slicknav.js",
  "/js/swiper-bundle.min.js",
  "/js/jquery.waypoints.min.js",
  "/js/jquery.counterup.min.js",
  "/js/jquery.magnific-popup.min.js",
  "/js/SmoothScroll.js",
  "/js/parallaxie.js",
  "/js/gsap.min.js",
  "/js/magiccursor.js",
  "/js/SplitText.js",
  "/js/ScrollTrigger.min.js",
  "/js/jquery.mb.YTPlayer.min.js",
  "/js/wow.js",
  "/js/isotope.min.js",
  "/js/typed.js",
  "/js/function.js",
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zxx">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <meta name="author" content="Awaiken" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap"
          rel="stylesheet"
        />
        {stylesheets.map((href) => (
          <link key={href} href={href} rel="stylesheet" media={href.includes("bootstrap") || href.includes("all") || href.includes("custom") ? "screen" : undefined} />
        ))}
      </head>
      <body>
        {children}
        <TemplateRuntime />
        {scripts.map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
