"use client"

import * as z from "zod"
import { v4 } from "uuid"
import { toast } from "sonner"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Agency, SubAccount } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useModal } from "@/providers/modal-provider"
import { FileUpload } from "@/components/global/file-upload"
import { saveActivityLogsNotification, upsertSubAccount } from "@/lib/queries"

interface SubAccountDetailsProps {
  agencyDetails: Agency
  details?: Partial<SubAccount>
  userName: string
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be atleast 2 chars." }),
  companyEmail: z.string().email(),
  companyPhone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  subAccountLogo: z.string().min(1, { message: "Select a Logo" }),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1)
})

export const SubaccountDetails = ({
  agencyDetails,
  details,
  userName
}: SubAccountDetailsProps) => {
  const router = useRouter()
  const { setClose } = useModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name,
      companyEmail: details?.companyEmail,
      companyPhone: details?.companyPhone,
      address: details?.address,
      city: details?.city,
      zipCode: details?.zipCode,
      state: details?.state,
      country: details?.country,
      subAccountLogo: details?.subAccountLogo
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await upsertSubAccount({
        id: details?.id ? details.id : v4(),
        address: values.address,
        subAccountLogo: values.subAccountLogo,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        agencyId: agencyDetails.id,
        connectAccountId: "",
        goal: 5000
      })

      if (!response) throw new Error("No response from server")

      await saveActivityLogsNotification({
        agencyId: response.agencyId,
        description: `${userName} | updated sub account | ${response.name}`,
        subaccountId: response.id
      })

      toast.success("Subaccount details saved", {
        description: "Successfully saved your subaccount details."
      })

      setClose()
      router.refresh()
    } catch (error) {
      toast.error("Oppse!", {
        description: "Could not save sub account details."
      })
    }
  }

  useEffect(() => {
    if (details) {
      form.reset(details)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="subAccountLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Logo</FormLabel>
              <FormControl>
                <FileUpload
                  apiEndpoint="subaccountLogo"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 md:flex-row">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Account Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="companyPhone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Acount Phone Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Acount Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 md:flex-row">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 md:flex-row">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Zipcpde</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Save Account Information"
          )}
        </Button>
      </form>
    </Form>
  )
}
