// src\app\__tests__\page.test.tsx
import { render, screen } from '@testing-library/react'
import CustomersPage from '../page'
import { MOCK_CUSTOMERS } from '@/data/mockCustomer'
import { Customer } from '@/types/customer'

const typedCustomers: Customer[] = MOCK_CUSTOMERS

describe('CustomersPage', () => {
  it('renders header correctly', () => {
    render(<CustomersPage initialCustomers={typedCustomers} />)
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(
      screen.getByText('List of registered customers')
    ).toBeInTheDocument()
  })
  it('renders customer data when initialCustomers are provided', () => {
    render(<CustomersPage initialCustomers={typedCustomers} />)
    expect(screen.getByText('Olivia Martin')).toBeInTheDocument()
    expect(screen.getByText('olivia.martin@email.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('Oct 15, 2023')).toBeInTheDocument()
  })
})