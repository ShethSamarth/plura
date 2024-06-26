import { getAuthUserDetails } from "@/lib/queries"

import { MenuOptions } from "./menu-options"

type SidebarProps = {
  id: string
  type: "agency" | "subaccount"
}

export const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails()
  if (!user) return null
  if (!user.Agency) return

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
  if (!details) return

  const isWhiteLabeledAgency = user.Agency.whiteLabel

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg"

  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || []

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  )

  return (
    <>
      <MenuOptions
        defaultOpen
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  )
}
