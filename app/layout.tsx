import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import { ThemeProvider } from "@/providers/theme-provider"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plura.",
  description: "All in one Agency Solution",
  icons: "/assets/plura-logo.svg"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="plura-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
