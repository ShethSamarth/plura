import { Plan } from "@prisma/client"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

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
        if (!stateAgencyId)
          return (
            <div className="flex h-full items-center justify-center gap-x-5 bg-white text-black dark:bg-black dark:text-white">
              <p className="text-2xl font-semibold">401</p>
              <p className="text-5xl font-[100] text-gray-400">|</p>
              <p className="text-sm font-light">You are not authorized.</p>
            </div>
          )
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        )
      } else return redirect(`/agency/${agencyId}`)
    } else {
      return (
        <div className="flex h-full items-center justify-center gap-x-5 bg-white text-black dark:bg-black dark:text-white">
          <p className="text-2xl font-semibold">401</p>
          <p className="text-5xl font-[100] text-gray-400">|</p>
          <p className="text-sm font-light">You are not authorized.</p>
        </div>
      )
    }
  }

  const authUser = await currentUser()

  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="max-w-4xl rounded-xl border p-4">
        <h1 className="text-4xl">Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  )
}
export default AgencyPage
