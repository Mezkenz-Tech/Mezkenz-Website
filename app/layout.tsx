import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://www.atlasitsolutions.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Atlas IT Solutions | Managed IT, Security & Cloud",
    template: "%s | Atlas IT Solutions"
  },
  description:
    "Managed IT support, cloud migrations, cybersecurity, and backup services for small and mid-sized teams across the EU, UK, and US.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Atlas IT Solutions",
    title: "Atlas IT Solutions | Managed IT, Security & Cloud",
    description:
      "Managed IT support, cloud migrations, cybersecurity, and backup services for small and mid-sized teams across the EU, UK, and US.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Atlas IT Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas IT Solutions | Managed IT, Security & Cloud",
    description:
      "Managed IT support, cloud migrations, cybersecurity, and backup services for small and mid-sized teams.",
    images: [`${siteUrl}/og-image.svg`]
  },
  alternates: {
    canonical: siteUrl
  }
};

function GoogleAnalyticsScript() {
  const gaId = process.env.GA_MEASUREMENT_ID;
  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="bg-white text-secondary">
        <GoogleAnalyticsScript />
        <Header />
        <main className="container-responsive pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
