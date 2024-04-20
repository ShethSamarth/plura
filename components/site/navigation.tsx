import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { ModeToggle } from "@/components/global/mode-toogle"

export const Navigation = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
      <aside className="flex items-center gap-x-2">
        <Image
          src="./assets/plura-logo.svg"
          width={40}
          height={40}
          alt="Plura"
        />
        <span className="text-xl font-bold"> Plura.</span>
      </aside>

      <aside className="flex items-center gap-2">
        <SignedOut>
          <Link
            href="/agency"
            className="rounded-md bg-primary p-2 px-4 text-white hover:bg-primary/80"
          >
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <ModeToggle />
      </aside>
    </div>
  )
}
