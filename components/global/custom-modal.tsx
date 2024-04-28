import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useModal } from "@/providers/modal-provider"

type CustomModalProps = {
  title: string
  subheading: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const CustomModal = ({
  children,
  defaultOpen,
  subheading,
  title
}: CustomModalProps) => {
  const { isOpen, setClose } = useModal()
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="h-screen overflow-auto bg-card md:h-fit md:max-h-[700px]">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
