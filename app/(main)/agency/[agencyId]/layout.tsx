import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import {
  getNotificationAndUser,
  verifyAndAcceptInvitation
} from "@/lib/queries"
import { Sidebar } from "@/components/sidebar"
import { Infobar } from "@/components/global/infobar"
import { Unauthorized } from "@/components/unauthorized"

type AgencyIdLayoutProps = {
  children: React.ReactNode
  params: { agencyId: string }
}

const AgencyIdLayout = async ({ children, params }: AgencyIdLayoutProps) => {
  const agencyId = await verifyAndAcceptInvitation()
  const user = await currentUser()

  if (!user) return redirect("/")

  if (!agencyId) return redirect("/agency")

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />

  let allNoti: any = []
  const notifications = await getNotificationAndUser(agencyId)
  if (notifications) allNoti = notifications

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <Infobar notifications={allNoti} role={allNoti.User?.role} />
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 top-0 z-[11] mx-auto h-screen overflow-auto bg-muted/60 p-4 pt-24 backdrop-blur-[35px] dark:bg-muted/40 dark:shadow-2xl dark:shadow-black">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgencyIdLayout
