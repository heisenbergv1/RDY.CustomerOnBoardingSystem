import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { CustomerTable } from '../CustomerTable'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

// FIX: render skeleton as <tr> not <div>
jest.mock('../CustomerTableSkeleton', () => ({
  CustomerTableSkeleton: () => (
    <>
      <tr data-testid="table-skeleton" />
    </>
  ),
}))

jest.mock('../CustomerEmptyState', () => ({
  CustomerEmptyState: () => <div data-testid="empty-state" />,
}))

describe('CustomerTable', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty state when no customers and not loading', () => {
    render(<CustomerTable customers={[]} isLoading={false} />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('renders loading skeleton when loading', () => {
    render(<CustomerTable customers={[]} isLoading={true} />)

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument()
  })

  it('renders customer rows correctly', () => {
    const customers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        phoneNumber: '123',
        dateCreated: '2026-03-04T23:53:57',
        signatureBase64: 'abc',
      },
    ]

    render(<CustomerTable customers={customers} isLoading={false} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()

    const formattedDate = new Date(customers[0].dateCreated).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    )

    expect(screen.getByText(formattedDate)).toBeInTheDocument()
  })

  it('navigates to view page when View button is clicked', () => {
    const customers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        phoneNumber: '123',
        dateCreated: '2026-03-04T23:53:57',
        signatureBase64: 'abc',
      },
    ]

    render(<CustomerTable customers={customers} isLoading={false} />)

    const button = screen.getByRole('button', { name: /view/i })

    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith('/view/1')
  })
})