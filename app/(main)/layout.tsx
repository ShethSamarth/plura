import { dark } from "@clerk/themes"
import { ClerkProvider } from "@clerk/nextjs"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  )
}
export default MainLayout
