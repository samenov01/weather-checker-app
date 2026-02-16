import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Weather Checker App",
  description: "A weather checker app",
  icons: {
    icon: "/weather.png",
  },
};

import './globals.css'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
