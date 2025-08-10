
import type { AppData } from '@/lib/types';

export const initialData: AppData = {
  clients: [],
  invoices: [],
  settings: {
    currency: 'USD',
    defaultTaxRate: 0,
    lastInvoiceNumber: 0,
    termsOfServiceURL: '',
  },
};
