import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "yumi — tools for lighter work",
  description:
    "yumi / cl：一个围绕 AI、自动化与桌面工具持续实验的个人工作台。",
  keywords: ["yumi", "AI", "automation", "desktop tools", "Lingxi"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "yumi — tools for lighter work",
    description: "AI × automation × desktop tools.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "yumi — tools for lighter work",
    description: "AI × automation × desktop tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
