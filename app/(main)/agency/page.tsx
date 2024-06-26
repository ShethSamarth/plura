import { Plan } from "@prisma/client"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { Unauthorized } from "@/components/unauthorized"
import { AgencyDetails } from "@/components/forms/agency-details"
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries"

const AgencyPage = async ({
  searchParams
}: {
  searchParams: { plan: Plan; state: string; code: string }
}) => {
  const agencyId = await verifyAndAcceptInvitation()

  const user = await getAuthUserDetails()

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount")
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0]
        const stateAgencyId = searchParams.state.split("___")[1]
        if (!stateAgencyId) return <Unauthorized />
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        )
      } else return redirect(`/agency/${agencyId}`)
    } else {
      return <Unauthorized />
    }
  }

  const authUser = await currentUser()

  return (
    <div className="mx-5 max-w-4xl py-10 lg:mx-auto">
      <AgencyDetails
        data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
      />
    </div>
  )
}
export default AgencyPage
