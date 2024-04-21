import { dark } from "@clerk/themes"
import { ClerkProvider } from "@clerk/nextjs"

import { Navigation } from "@/components/site/navigation"

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Navigation />
      {children}
    </ClerkProvider>
  )
}
export default SiteLayout
