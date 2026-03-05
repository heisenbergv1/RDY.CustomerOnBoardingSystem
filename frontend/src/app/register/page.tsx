'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CustomerForm, CustomerFormData } from '@/components/register/CustomerForm'
import { ConfirmationCard } from '@/components/register/ConfirmationCard'
import { ShieldCheckIcon } from 'lucide-react'

type FormState = 'form' | 'submitting' | 'success' | 'error'

export default function OnboardingPage() {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>('form')
  const [submittedData, setSubmittedData] = useState<CustomerFormData | null>(
    null,
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (data: CustomerFormData) => {
    setFormState('submitting')
    setErrorMessage(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

      if (!apiUrl) {
        throw new Error('API URL is not configured in environment variables.')
      }

      // Extract base64 from data URL (remove "data:image/png;base64,")
      const signatureBase64 = data.signature.split(',')[1]

      const response = await fetch(`${apiUrl}api/Customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          signatureBase64,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit customer registration.')
      }

      setSubmittedData(data)
      setFormState('success')
    } catch (error) {
      console.error('Error submitting customer registration:', error)
      setErrorMessage(
        error instanceof Error ? error.message : 'An unknown error occurred',
      )
      setFormState('error')
    }
  }

  const handleReset = () => {
    setSubmittedData(null)
    setFormState('form')
    setErrorMessage(null)
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleSetFormState = () => {
    setFormState('form')
  }

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Back to customers
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <ShieldCheckIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Secure Customer Onboarding
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete the form below to register a new customer account.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
          {formState === 'error' && (
            <div className="bg-destructive/10 border-b border-destructive/20 p-4 flex items-center justify-between">
              <p className="text-sm text-destructive font-medium">
                {errorMessage || 'Failed to submit form. Please try again.'}
              </p>
              <button
                onClick={handleSetFormState}
                className="text-sm font-medium text-destructive hover:underline"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {formState === 'success' && submittedData ? (
              <ConfirmationCard
                customerName={`${submittedData.firstName} ${submittedData.lastName}`}
                customerEmail={submittedData.email}
                onReset={handleReset}
              />
            ) : (
              <CustomerForm
                onSubmit={handleSubmit}
                isSubmitting={formState === 'submitting'}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Protected by industry standard encryption. Your data is secure.</p>
        </div>
      </div>
    </div>
  )
}