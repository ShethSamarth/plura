"use client"

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption
} from "@prisma/client"
import Image from "next/image"
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import Link from "next/link"

type MenuOptionsProps = {
  defaultOpen?: boolean
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
  sidebarLogo: string
  details: any
  user: any
  id: string
}

export const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen
}: MenuOptionsProps) => {
  const [isMounted, setIsMounted] = useState(false)

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger asChild className="absolute left-4 top-4 z-[100] md:hidden">
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={cn(
          "fixed top-0 border-r bg-background/80 p-6 backdrop-blur-xl",
          defaultOpen
            ? "z-0 hidden w-[300px] md:inline-block"
            : "z-[100] inline-block w-full md:hidden"
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="my-4 flex w-full items-center justify-between py-8"
                variant="ghost"
              >
                <div className="flex items-center gap-2 text-left">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className="text-muted-foreground" />
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="z-[200] mt-4 size-80">
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Accounts..." />
                <CommandList className="pb-16">
                  <CommandEmpty> No results found</CommandEmpty>
                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") &&
                    user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="my-2 cursor-pointer rounded-md !bg-transparent p-0 text-primary transition-all hover:!bg-muted">
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user?.Agency?.id}`}
                              className="flex size-full gap-4 p-2"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">
                                  {user?.Agency?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex size-full gap-4 p-2"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}
                  <CommandGroup heading="Accounts">
                    {subAccounts.length !== 0 ? (
                      subAccounts.map((subaccount) => (
                        <CommandItem className="p-0" key={subaccount.id}>
                          {defaultOpen ? (
                            <Link
                              href={`/subaccount/${subaccount.id}`}
                              className="flex size-full gap-4 p-2"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={subaccount.subAccountLogo}
                                  alt="Subaccount Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                {subaccount.name}
                                <span className="text-muted-foreground">
                                  {subaccount.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex size-full gap-4 p-2"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      ))
                    ) : (
                      <p className="text-center text-sm">No Accounts</p>
                    )}
                  </CommandGroup>
                </CommandList>
                {(user?.role === "AGENCY_OWNER" ||
                  user?.role === "AGENCY_ADMIN") && (
                  <SheetClose>
                    <Button className="flex w-full gap-2">
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </SheetContent>
    </Sheet>
  )
}
