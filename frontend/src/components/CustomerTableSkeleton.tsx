import React from 'react'

export function CustomerTableSkeleton() {
  return (
    <>
      {Array.from({
        length: 5,
      }).map((_, i) => (
        <tr
          key={i}
          className="border-b border-border transition-colors hover:bg-muted/50"
        >
          <td className="p-4 align-middle">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse shrink-0" />
              <div className="h-4 w-24 sm:w-32 rounded bg-muted animate-pulse" />
            </div>
          </td>
          <td className="p-4 align-middle">
            <div className="h-4 w-32 sm:w-48 rounded bg-muted animate-pulse" />
          </td>
          <td className="p-4 align-middle hidden sm:table-cell">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          </td>
          <td className="p-4 align-middle">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  )
}
