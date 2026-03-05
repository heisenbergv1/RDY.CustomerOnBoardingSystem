// frontend/src/app/view/[id]/__tests__/page.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ViewPage from '../page'

beforeAll(() => {
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost/'
  // Ensure fetch exists in Jest environment
  global.fetch = jest.fn()
})

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: '1',
  }),
}))

describe('ViewPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders customer data correctly and signature image', async () => {
    const mockCustomer = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
      phoneNumber: '123',
      dateCreated: '2026-03-04T23:53:57',
      signatureBase64: 'abc',
    }

    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCustomer,
    } as Response)

    render(<ViewPage />)

    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(await screen.findByText('Doe')).toBeInTheDocument()
    expect(await screen.findByText('test@test.com')).toBeInTheDocument()
    expect(await screen.findByText('123')).toBeInTheDocument()

    const image = await screen.findByTestId('signature-image')

    expect(image).toHaveAttribute(
      'src',
      'data:image/png;base64,abc'
    )

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})