/**
 * CustomerService Unit Tests
 *
 * NOTE:
 * These tests validate the service method structure, error handling,
 * and fetch invocation logic.
 *
 * They mock `global.fetch` and environment variables.
 *
 * ❗ They DO NOT execute real API requests.
 * ❗ No actual network calls are performed.
 * ❗ These are isolated unit tests for service behavior only.
 */

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  CreateCustomerPayload,
} from '@/services/customerService'

describe('CustomerService', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost/'
  })

  afterAll(() => {
    process.env = OLD_ENV
    jest.restoreAllMocks()
  })

  describe('createCustomer', () => {
    const payload: CreateCustomerPayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phoneNumber: '123',
      signatureBase64: 'abc',
    }

    it('successfully creates customer', async () => {
      const mockResponse = { id: '1' }

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await createCustomer(payload)

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResponse)
    })

    it('throws validation error from backend errors object', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          errors: {
            Email: ['Email is invalid'],
          },
        }),
      })

      await expect(createCustomer(payload)).rejects.toThrow(
        'Email is invalid',
      )
    })

    it('throws fallback error when no validation errors exist', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          title: 'Custom Error',
        }),
      })

      await expect(createCustomer(payload)).rejects.toThrow(
        'Custom Error',
      )
    })
  })

  describe('getCustomers', () => {
    it('returns customers on success', async () => {
      const mockCustomers = [{ id: '1' }]

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCustomers,
      })

      const result = await getCustomers()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost/api/Customer'
      )
      expect(result).toEqual(mockCustomers)
    })

    it('throws error when request fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      })

      await expect(getCustomers()).rejects.toThrow(
        'Failed to fetch customers',
      )
    })
  })

  describe('getCustomerById', () => {
    it('returns customer when successful', async () => {
      const mockCustomer = { id: '1' }

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCustomer,
      })

      const result = await getCustomerById('1')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost/api/Customer/1'
      )
      expect(result).toEqual(mockCustomer)
    })

    it('throws error when request fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      })

      await expect(getCustomerById('1')).rejects.toThrow(
        'Failed to fetch customer',
      )
    })
  })

  describe('missing API URL', () => {
    it('throws error when env is missing', async () => {
      delete process.env.NEXT_PUBLIC_API_URL

      await expect(
        getCustomers()
      ).rejects.toThrow(
        'API URL is not configured in environment variables.'
      )
    })
  })
})