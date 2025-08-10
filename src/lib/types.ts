export interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  issueDate: string;
  dueDate: string;
  items: Item[];
  tax: number;
  discount: number;
  status: InvoiceStatus;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  notes?: string;
}

export interface Settings {
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  defaultTaxRate: number;
  lastInvoiceNumber: number;
  termsOfServiceURL?: string;
}

export interface AppData {
  invoices: Invoice[];
  clients: Client[];
  settings: Settings;
}
