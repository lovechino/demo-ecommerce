import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart for the e-commerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
