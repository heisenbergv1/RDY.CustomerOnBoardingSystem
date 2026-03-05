import { CustomerFormData } from '@/components/register/CustomerForm'

/**
 * Validates customer onboarding form.
 * Returns error message if invalid, otherwise null.
 */
export function validateCustomerForm(
  data: CustomerFormData,
): string | null {
  if (!data.firstName.trim()) return 'First name is required.'

  if (!/^[A-Za-z\s]+$/.test(data.firstName)) {
    return 'First name must contain letters only.'
  }

  if (!data.lastName.trim()) return 'Last name is required.'

  if (!/^[A-Za-z\s]+$/.test(data.lastName)) {
    return 'Last name must contain letters only.'
  }

  if (!data.email.trim()) return 'Email is required.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Email format is invalid.'
  }

  if (data.phone && !/^\d+$/.test(data.phone)) {
    return 'Phone number must contain numbers only.'
  }

  if (!data.signature) return 'Signature is required.'

  return null
}