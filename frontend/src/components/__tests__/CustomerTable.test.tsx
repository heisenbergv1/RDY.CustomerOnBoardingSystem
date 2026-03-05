import { render, screen } from '@testing-library/react'
import { CustomerTable } from '@/components/customers/CustomerTable'
import { MOCK_CUSTOMERS } from '@/data/mockCustomer'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  })
}))

describe('CustomerTable', () => {
  it('renders exact customer data from MOCK_CUSTOMERS', () => {
    render(<CustomerTable customers={MOCK_CUSTOMERS} isLoading={false} />)

    MOCK_CUSTOMERS.forEach((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`
      const formattedDate = new Date(customer.dateCreated).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      )

      expect(screen.getByText(fullName)).toBeInTheDocument()
      expect(screen.getByText(customer.email)).toBeInTheDocument()
      expect(screen.getByText(customer.phoneNumber)).toBeInTheDocument()
      expect(screen.getByText(formattedDate)).toBeInTheDocument()
    })
  })
})

