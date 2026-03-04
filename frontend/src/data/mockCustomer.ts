// src\data\mockCustomer.ts
import { Customer } from '@/types/customer'

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    firstName: 'Olivia',
    lastName: 'Martin',
    email: 'olivia.martin@email.com',
    phoneNumber: '+1 (555) 123-4567',
    dateCreated: '2023-10-15T09:30:00Z',
  },
  {
    id: '2',
    firstName: 'Jackson',
    lastName: 'Lee',
    email: 'jackson.lee@email.com',
    phoneNumber: '+1 (555) 987-6543',
    dateCreated: '2023-10-18T14:15:00Z',
  },
  {
    id: '3',
    firstName: 'Isabella',
    lastName: 'Nguyen',
    email: 'isabella.nguyen@email.com',
    phoneNumber: '+1 (555) 456-7890',
    dateCreated: '2023-11-02T11:45:00Z',
  },
  {
    id: '4',
    firstName: 'William',
    lastName: 'Kim',
    email: 'william.kim@email.com',
    phoneNumber: '+1 (555) 234-5678',
    dateCreated: '2023-11-20T16:20:00Z',
  },
  {
    id: '5',
    firstName: 'Sofia',
    lastName: 'Davis',
    email: 'sofia.davis@email.com',
    phoneNumber: '+1 (555) 876-5432',
    dateCreated: '2023-12-05T08:10:00Z',
  }
]