// src/components/customer/__tests__/CustomerTableSkeleton.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CustomerTableSkeleton } from '../CustomerTableSkeleton'

describe('CustomerTableSkeleton', () => {
  it('renders five skeleton rows', () => {
    render(
      <table>
        <tbody>
          <CustomerTableSkeleton />
        </tbody>
      </table>
    )

    const rows = screen.getAllByRole('row')

    expect(rows).toHaveLength(5)
  })
})