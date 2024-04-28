import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { UserDetails } from "@/components/forms/user-details"
import { AgencyDetails } from "@/components/forms/agency-details"

type SettingsPageProps = {
  params: { agencyId: string }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const authUser = await currentUser()
  if (!authUser) return null

  const userDetails = await db.user.findUnique({
    where: { email: authUser.emailAddresses[0].emailAddress }
  })
  if (!userDetails) return null

  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
    include: { SubAccount: true }
  })
  if (!agencyDetails) return null

  const subAccounts = agencyDetails.SubAccount

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type="agency"
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  )
}
export default SettingsPage
