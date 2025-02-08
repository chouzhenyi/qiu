import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next-低代码平台",
  description: "尝试以nextJs 为基础搭建低代码平台",
};

/**
 * RootLayout 组件是应用程序的根布局组件。
 * 它负责设置 HTML 文档的基本结构，并应用全局样式和字体。
 * 
 * @param {Object} props - 组件的属性。
 * @param {React.ReactNode} props.children - 子组件，通常是应用程序的其他布局或页面组件。
 * @returns {JSX.Element} - 渲染的 HTML 结构。
 */
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // 返回包含子组件的 HTML 结构，并应用全局样式和字体
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    );
  }
  