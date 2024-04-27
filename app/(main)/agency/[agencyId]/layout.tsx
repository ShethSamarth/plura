import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { Notification, User } from "@prisma/client"

import {
  getNotificationAndUser,
  verifyAndAcceptInvitation
} from "@/lib/queries"
import { Sidebar } from "@/components/sidebar"
import { Unauthorized } from "@/components/unauthorized"

type AgencyIdLayoutProps = {
  children: React.ReactNode
  params: { agencyId: string }
}

type NotificationType = ({ User: User } & Notification)[] | undefined

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

  let allNoti: NotificationType = []
  const notifications = await getNotificationAndUser(agencyId)
  if (notifications) allNoti = notifications

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">{children}</div>
    </div>
  )
}

export default AgencyIdLayout
