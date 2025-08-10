import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Invoice } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotal(invoice: Invoice): number {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = subtotal * (invoice.tax / 100);
  const discountAmount = subtotal * (invoice.discount / 100);
  return subtotal + taxAmount - discountAmount;
}
