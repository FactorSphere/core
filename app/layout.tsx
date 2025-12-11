import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://factorsphere.org'),
  title: "FactorSphere - Transparent Journal Rankings & Impact Factors",
  description:
    "Community-driven academic journal rankings with transparent methodology. Find journal impact factors, citation metrics, and field-specific rankings.",
  keywords:
    "FactorSphere, rankings, impact factor, academic, journals, citation metrics, research metrics, journal finder, academic publishing",
  authors: [{ name: "FactorSphere" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "FactorSphere - Transparent Journal Rankings",
    description: "Community-driven academic journal rankings with transparent methodology and real-time updates.",
    images: "/tehe.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "FactorSphere - Transparent Journal Rankings",
    description: "Community-driven academic journal rankings with transparent methodology and real-time updates.",
    images: "/tehe.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <ScrollProgress />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
