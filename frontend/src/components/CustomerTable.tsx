import React from 'react'
import { useRouter } from 'next/navigation'
import { Customer } from '@/types/customer'
import { CustomerTableSkeleton } from './CustomerTableSkeleton'
import { CustomerEmptyState } from './CustomerEmptyState'

interface CustomerTableProps {
  customers: Customer[]
  isLoading: boolean
}

export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
  const router = useRouter()

  if (!isLoading && customers.length === 0) {
    return <CustomerEmptyState />
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b border-border bg-muted/50">
          <tr className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">
              Full Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">
              Email
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider hidden sm:table-cell">
              Phone Number
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">
              Date Created
            </th>
            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {isLoading ? (
            <CustomerTableSkeleton />
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-border transition-colors hover:bg-accent/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle font-medium text-foreground">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="p-4 align-middle text-muted-foreground">
                  {customer.email}
                </td>
                <td className="p-4 align-middle text-muted-foreground hidden sm:table-cell">
                  {customer.phoneNumber}
                </td>
                <td className="p-4 align-middle text-muted-foreground">
                  {new Date(customer.dateCreated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="p-4 align-middle text-right">
                  <button
                    type="button"
                    onClick={() => router.push(`/customers/${customer.id}`)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}