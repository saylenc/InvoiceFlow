import type { AppData } from '@/lib/types';
import { format } from 'date-fns';

const today = new Date('2024-07-29T12:00:00Z');
const dueDate = new Date('2024-08-28T12:00:00Z');
const fortyFiveDaysAgo = new Date('2024-06-14T12:00:00Z');
const fifteenDaysAgo = new Date('2024-07-14T12:00:00Z');
const sixtyDaysAgo = new Date('2024-05-30T12:00:00Z');
const thirtyDaysAgo = new Date('2024-06-29T12:00:00Z');


export const initialData: AppData = {
  clients: [
    {
      id: '1',
      name: 'Acme Inc.',
      email: 'contact@acme.com',
      company: 'Acme Corporation',
      phone: '123-456-7890',
      notes: 'Long-term client, always pays on time.',
    },
    {
      id: '2',
      name: 'Stark Industries',
      email: 'tony@starkindustries.com',
      company: 'Stark Industries',
      phone: '987-654-3210',
      notes: 'High value projects, requires detailed reporting.',
    },
  ],
  invoices: [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      clientId: '1',
      issueDate: format(today, 'yyyy-MM-dd'),
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      items: [
        { id: '1', description: 'Website Design', quantity: 1, unitPrice: 2500 },
        { id: '2', description: 'Logo Design', quantity: 1, unitPrice: 800 },
      ],
      tax: 10,
      discount: 5,
      status: 'Unpaid',
      notes: 'Thank you for your business!',
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      clientId: '2',
      issueDate: format(fortyFiveDaysAgo, 'yyyy-MM-dd'),
      dueDate: format(fifteenDaysAgo, 'yyyy-MM-dd'),
      items: [
        { id: '1', description: 'Consulting Services', quantity: 20, unitPrice: 150 },
      ],
      tax: 0,
      discount: 0,
      status: 'Paid',
    },
     {
      id: '3',
      invoiceNumber: 'INV-003',
      clientId: '1',
      issueDate: format(sixtyDaysAgo, 'yyyy-MM-dd'),
      dueDate: format(thirtyDaysAgo, 'yyyy-MM-dd'),
      items: [
        { id: '1', description: 'Mobile App Development', quantity: 1, unitPrice: 5000 },
      ],
      tax: 12,
      discount: 0,
      status: 'Overdue',
    },
  ],
  settings: {
    currency: 'USD',
    defaultTaxRate: 10,
    lastInvoiceNumber: 3,
  },
};
