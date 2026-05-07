import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/providers";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter_24pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter_24pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter_24pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata() {
  return {
    title: {
      template: "%s | Skill College and Enterprise Ltd",
      default: "Skill College and Enterprise Ltd — From Learning to Earning",
    },
    description: "Empowering individuals and communities through world-class skills training, entrepreneurship development, and research services.",
    metadataBase: new URL("https://skillcollegeandenterpriseltd.com"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/skill-college-logo.png", type: "image/png" },
      ],
      apple: "/images/skill-college-logo.png",
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: "Skill College and Enterprise Ltd — From Learning to Earning",
      description: "Empowering individuals and communities through world-class skills training, entrepreneurship development, and research services.",
      url: "https://skillcollegeandenterpriseltd.com",
      siteName: "Skill College and Enterprise Ltd",
      images: [
        {
          url: "/images/skill-college-logo.png",
          width: 1200,
          height: 630,
          alt: "Skill College and Enterprise Ltd",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Skill College and Enterprise Ltd — From Learning to Earning",
      description: "Empowering individuals and communities through world-class skills training, entrepreneurship development, and research services.",
      images: ["/images/skill-college-logo.png"],
    },
  } as Metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {/* <GsapInit /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
