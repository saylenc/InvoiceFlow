"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { AppData, Invoice, Client } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialData } from '@/lib/initial-data';
import { format } from 'date-fns';

interface DataContextProps {
  data: AppData;
  setData: (data: AppData) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => Invoice;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (invoiceId: string) => void;
  addClient: (client: Omit<Client, 'id'>) => Client;
  updateClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  getClientById: (clientId: string) => Client | undefined;
  getInvoiceById: (invoiceId: string) => Invoice | undefined;
  formatCurrency: (amount: number) => string;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalStorage<AppData>('invoice-flow-data', initialData);

  const value = useMemo(() => {
    const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice => {
      const newInvoiceNumber = data.settings.lastInvoiceNumber + 1;
      const newInvoice: Invoice = {
        ...invoiceData,
        id: new Date().getTime().toString(),
        invoiceNumber: `INV-${String(newInvoiceNumber).padStart(3, '0')}`,
      };
      setData({
        ...data,
        invoices: [...data.invoices, newInvoice],
        settings: { ...data.settings, lastInvoiceNumber: newInvoiceNumber },
      });
      return newInvoice;
    };

    const updateInvoice = (updatedInvoice: Invoice) => {
      setData({
        ...data,
        invoices: data.invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)),
      });
    };

    const deleteInvoice = (invoiceId: string) => {
      setData({
        ...data,
        invoices: data.invoices.filter((inv) => inv.id !== invoiceId),
      });
    };
    
    const getInvoiceById = (invoiceId: string) => {
      return data.invoices.find((inv) => inv.id === invoiceId);
    };

    const addClient = (clientData: Omit<Client, 'id'>): Client => {
      const newClient: Client = {
        ...clientData,
        id: new Date().getTime().toString(),
      };
      setData({
        ...data,
        clients: [...data.clients, newClient],
      });
      return newClient;
    };

    const updateClient = (updatedClient: Client) => {
      setData({
        ...data,
        clients: data.clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)),
      });
    };

    const deleteClient = (clientId: string) => {
      setData({
        ...data,
        clients: data.clients.filter((client) => client.id !== clientId),
        invoices: data.invoices.filter((invoice) => invoice.clientId !== clientId),
      });
    };

    const getClientById = (clientId: string) => {
      return data.clients.find((client) => client.id === clientId);
    };
    
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data.settings.currency,
      }).format(amount);
    }

    return {
      data,
      setData,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      getInvoiceById,
      addClient,
      updateClient,
      deleteClient,
      getClientById,
      formatCurrency
    };
  }, [data, setData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
