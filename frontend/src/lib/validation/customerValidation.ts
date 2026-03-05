import { CustomerFormData } from '@/components/register/CustomerForm'

/**
 * Validates customer onboarding form.
 * Returns error message if invalid, otherwise null.
 */
export function validateCustomerForm(
  data: CustomerFormData,
): string | null {
  if (!data.firstName.trim()) return 'First name is required.'
  if (!data.lastName.trim()) return 'Last name is required.'
  if (!data.email.trim()) return 'Email is required.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Email format is invalid.'
  }

  if (!data.signature) return 'Signature is required.'

  return null
}