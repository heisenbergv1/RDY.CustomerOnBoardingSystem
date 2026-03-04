// src\app\page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CustomerTable } from '@/components/CustomerTable'
import { Customer } from '@/types/customer'
import { MOCK_CUSTOMERS } from '@/data/mockCustomer'

interface CustomersPageProps {
  initialCustomers?: Customer[]
}

export default function CustomersPage({ initialCustomers }: CustomersPageProps) {
  const router = useRouter()
  
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers || [])
  const [isLoading, setIsLoading] = useState(!initialCustomers?.length)

  useEffect(() => {
    if (!initialCustomers) {
      const timer = setTimeout(() => {
        // setCustomers(MOCK_CUSTOMERS)
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [initialCustomers])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Customers
            </h1>
            <p className="text-muted-foreground mt-1">
              List of registered customers
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shrink-0"
            onClick={() => router.push('/register')}
          >
            <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Add Customer
          </button>
        </div>

        {/* Customer List Section */}
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
          <CustomerTable customers={customers} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
