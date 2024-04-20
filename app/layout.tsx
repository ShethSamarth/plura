import "./globals.css"
import type { Metadata } from "next"
import { dark } from "@clerk/themes"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/providers/theme-provider"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plura",
  description: "All in one Agency Solution"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
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
    </ClerkProvider>
  )
}

export default RootLayout
