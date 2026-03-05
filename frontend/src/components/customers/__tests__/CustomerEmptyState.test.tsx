import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { CustomerEmptyState } from '../CustomerEmptyState'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('CustomerEmptyState', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty state message', () => {
    render(<CustomerEmptyState />)

    expect(
      screen.getByText('No customers registered yet.')
    ).toBeInTheDocument()

    expect(
      screen.getByText(/get started by creating your first customer/i)
    ).toBeInTheDocument()
  })

  it('navigates to register page when button is clicked', () => {
    render(<CustomerEmptyState />)

    const button = screen.getByRole('button', {
      name: /create first customer/i,
    })

    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith('/register')
  })
})