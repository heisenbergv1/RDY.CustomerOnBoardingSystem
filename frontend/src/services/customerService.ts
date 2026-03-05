import { Customer } from '@/types/customer'

export interface CreateCustomerPayload {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  signatureBase64: string
}

/**
 * Service responsible for customer API communication.
 * Keeps API logic separated from UI layer.
 */
export async function createCustomer(payload: CreateCustomerPayload) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

  if (!apiUrl) {
    throw new Error(
      'API URL is not configured in environment variables.',
    )
  }

  const response = await fetch(`${apiUrl}api/Customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    try {
      const errorData = await response.json()

      // Backend validation schema contains `errors` object
      if (errorData?.errors && typeof errorData.errors === 'object') {
        const errors = errorData.errors as Record<string, string[]>

        // Get first key in errors
        const firstKey = Object.keys(errors)[0]

        if (firstKey && errors[firstKey]?.length > 0) {
          throw new Error(errors[firstKey][0])
        }
      }

      // Fallback generic error
      throw new Error(
        errorData?.title ||
          'Failed to submit customer registration.',
      )
    } catch (err) {
      // If parsing fails or unexpected format
      throw err instanceof Error
        ? err
        : new Error('Failed to submit customer registration.')
    }
  }

  return response.json()
}

/**
 * Service layer responsible for fetching customers from backend.
 * Keeps API logic separated from UI layer.
 */
export async function getCustomers(): Promise<Customer[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

  if (!apiUrl) {
    throw new Error(
      'API URL is not configured in environment variables.',
    )
  }

  const response = await fetch(`${apiUrl}api/Customer`)

  if (!response.ok) {
    throw new Error('Failed to fetch customers')
  }

  return response.json()
}

/**
 * Service layer responsible for customer API communication.
 * Keeps fetch logic separated from the UI layer.
 */
export async function getCustomerById(id: string): Promise<Customer> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

  if (!apiUrl) {
    throw new Error(
      'API URL is not configured in environment variables.',
    )
  }

  const response = await fetch(`${apiUrl}api/Customer/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch customer')
  }

  return response.json()
}