// src\app\__tests__\page.test.tsx
import { render, screen } from '@testing-library/react'
import CustomersPage from '../page'
import { MOCK_CUSTOMERS } from '@/data/mockCustomer'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  })
}))

describe('CustomersPage', () => {
  it('renders header correctly', () => {
    render(<CustomersPage initialCustomers={MOCK_CUSTOMERS} />)
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(
      screen.getByText('List of registered customers')
    ).toBeInTheDocument()
  })
  it('renders customer data when initialCustomers are provided', () => {
    render(<CustomersPage initialCustomers={MOCK_CUSTOMERS} />)
    expect(screen.getByText('Olivia Martin')).toBeInTheDocument()
    expect(screen.getByText('olivia.martin@email.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('Oct 15, 2023')).toBeInTheDocument()
  })
})