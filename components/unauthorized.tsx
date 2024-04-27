import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Unauthorized = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-5">
      <h1 className="text-3xl md:text-6xl">Unauthorized acccess!</h1>
      <p className="text-center">
        Please contact support or your agency owner to get access
      </p>
      <Button asChild className="mt-5" size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
