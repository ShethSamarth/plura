import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { pricingCards } from "@/lib/constants"
import { Navigation } from "@/components/site/navigation"

const SitePage = () => {
  return (
    <>
      <Navigation />
      <section className="flex flex-col items-center pt-36">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#D3D3D3_1px,transparent_1px),linear-gradient(to_bottom,#D3D3D3_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)]" />

        <p className="text-center">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
          <h1 className="text-center text-9xl font-bold md:text-[200px] lg:text-[300px]">
            Plura
          </h1>
        </div>

        <div className="relative mx-5 md:-mt-12 lg:mt-[-70px]">
          <Image
            className="rounded-t-2xl border-2 border-muted"
            src="/assets/preview.png"
            alt="Preview"
            height={1200}
            width={1200}
          />
          <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-background" />
        </div>
      </section>

      <section className="mx-5 flex flex-col items-center justify-center gap-y-4 py-20">
        <h2 className="text-center text-2xl md:text-4xl">
          Choose what fits you right
        </h2>
        <p className="text-center text-muted-foreground">
          Our straightforward pricing plans are tailored to meet your needs. If
          you&apos;re not ready to commit you can get started for free.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-5">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn(
                "flex w-80 flex-col justify-between",
                card.title === "Unlimited Saas" && "border-2 border-primary"
              )}
            >
              <CardHeader>
                <CardTitle
                  className={cn(
                    card.title !== "Unlimited Saas" && "text-muted-foreground"
                  )}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span>/month</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-y-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-x-2">
                      <Check className="text-muted-foreground" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={cn(
                    "w-full rounded-md bg-primary p-2 text-center text-white",
                    card.title !== "Unlimited Saas" && "bg-muted-foreground"
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default SitePage
