// frontend\src\app\view\[id]\page.tsx
'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {
  ArrowLeftIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import { Customer } from '@/types/customer'

export default function ViewPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomer = useCallback(async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
      if (!apiUrl) throw 'API URL is not configured in environment variables.';
      const response = await fetch(`${apiUrl}api/Customer/${id}`)
      if (!response.ok) throw new Error('Failed to fetch customer')
      const data = await response.json()
      setCustomer(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) fetchCustomer()
  }, [id, fetchCustomer])

  const handleBack = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-destructive mb-4">
          {error || 'Customer not found'}
        </p>
        <Button onClick={handleBack} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            aria-label="Go back to customer list"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Customer Details
            </h1>
            <p className="text-sm text-muted-foreground">
              ID: {customer.id}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Basic contact and profile details.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem
                  icon={<UserIcon className="mr-2 h-4 w-4" />}
                  label="First Name"
                  value={customer.firstName}
                />

                <InfoItem
                  icon={<UserIcon className="mr-2 h-4 w-4" />}
                  label="Last Name"
                  value={customer.lastName}
                />

                <InfoItem
                  icon={<MailIcon className="mr-2 h-4 w-4" />}
                  label="Email"
                  value={customer.email}
                />

                <InfoItem
                  icon={<PhoneIcon className="mr-2 h-4 w-4" />}
                  label="Phone"
                  value={customer.phoneNumber}
                />

                <InfoItem
                  icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                  label="Date Created"
                  value={new Date(customer.dateCreated).toLocaleString()}
                />
              </div>
            </CardContent>
          </Card>

          {/* Signature */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Signature</CardTitle>
              <CardDescription>
                Customer's electronic signature on file.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border bg-white p-4 flex items-center justify-center min-h-[150px]">
                {customer.signatureBase64 ? (
                  <img
                    data-testid="signature-image"
                    src={
                      customer.signatureBase64.startsWith('data:')
                        ? customer.signatureBase64
                        : `data:image/png;base64,${customer.signatureBase64}`
                    }
                    alt={`Signature of ${customer.firstName} ${customer.lastName}`}
                    className="max-h-[100px] w-auto object-contain opacity-80"
                  />
                ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No signature on file
                    </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-base font-medium text-foreground">
        {value || '-'}
      </p>
    </div>
  )
}