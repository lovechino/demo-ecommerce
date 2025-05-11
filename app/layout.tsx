import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/Redux/StoreProvider";
import NavTop from "@/components/Header/NarTop";
import Navbar from "@/components/Header/Navbar";
import BottomNav from "@/components/Header/BottomNav";
import logo from "@/public/Image/komex-digital-logo_a39f6b3a05934b128b6b2e4e11ee89e1.webp";

const siteName = "Komex Digital";
const siteUrl = "https://demo-ecommerce-swart.vercel.app/";
const description =
  "Komex Digital - Cung cấp các giải pháp và sản phẩm công nghệ hàng đầu.";
const keywords = [
  "thiết bị điện tử",
  "công nghệ",
  "sản phẩm kỹ thuật số",
  "giải pháp công nghệ",
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: description,
  keywords: keywords.join(", "),
  icons: logo.src,

  openGraph: {
    title: siteName,
    description: description,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/2zcB726UgVFR5RBnjJ66CqIuBQ9U0XKo_1694581378____e37386722a535bca4a4b7b79d79c315c.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    site: "@komexdigital",
    creator: "@yourhandle",
    images: [
      {
        url: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/2zcB726UgVFR5RBnjJ66CqIuBQ9U0XKo_1694581378____e37386722a535bca4a4b7b79d79c315c.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  authors: [
    {
      name: "Komex",
      url: siteUrl,
    },
  ],
  publisher: siteName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <NavTop />
          <Navbar />
          {children}
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
