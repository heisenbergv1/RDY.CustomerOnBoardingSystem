import React from 'react'
import { Customer } from '@/types/customer'
import { CustomerTableSkeleton } from './CustomerTableSkeleton'
import { CustomerEmptyState } from './CustomerEmptyState'
interface CustomerTableProps {
  customers: Customer[]
  isLoading: boolean
}

export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
