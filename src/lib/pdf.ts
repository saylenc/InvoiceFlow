import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Invoice, Client, Settings } from './types';
import { calculateTotal } from './utils';
import { format, parseISO } from 'date-fns';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

const currencySymbols: Record<Settings['currency'], string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
}

export function generateInvoicePDF(invoice: Invoice, client: Client, settings: Settings) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const currencySymbol = currencySymbols[settings.currency] || '$';

    // Header
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth - 20, 30, { align: 'right' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('InvoiceFlow Inc.', 20, 30);
    doc.text('123 App Street, Dev City', 20, 36);
    doc.text('contact@invoiceflow.com', 20, 42);

    // Bill To
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(client.name, 20, 66);
    doc.text(client.company || '', 20, 72);
    doc.text(client.email, 20, 78);

    // Invoice Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Number:', pageWidth - 70, 60);
    doc.text('Issue Date:', pageWidth - 70, 66);
    doc.text('Due Date:', pageWidth - 70, 72);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoiceNumber, pageWidth - 20, 60, { align: 'right' });
    doc.text(format(parseISO(invoice.issueDate), 'LLL dd, yyyy'), pageWidth - 20, 66, { align: 'right' });
    doc.text(format(parseISO(invoice.dueDate), 'LLL dd, yyyy'), pageWidth - 20, 72, { align: 'right' });
    
    // Table
    const tableColumn = ["#", "Description", "Quantity", "Unit Price", "Total"];
    const tableRows = invoice.items.map((item, index) => [
        index + 1,
        item.description,
        item.quantity,
        `${currencySymbol}${item.unitPrice.toFixed(2)}`,
        `${currencySymbol}${(item.quantity * item.unitPrice).toFixed(2)}`,
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 90,
        headStyles: { fillColor: [30, 144, 255] },
        theme: 'striped',
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Totals
    const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = subtotal * (invoice.tax / 100);
    const discountAmount = subtotal * (invoice.discount / 100);
    const total = subtotal + taxAmount - discountAmount;
    
    doc.setFontSize(10);
    doc.text('Subtotal:', pageWidth - 60, finalY + 10);
    doc.text(`${currencySymbol}${subtotal.toFixed(2)}`, pageWidth - 20, finalY + 10, { align: 'right' });

    doc.text(`Tax (${invoice.tax}%):`, pageWidth - 60, finalY + 16);
    doc.text(`${currencySymbol}${taxAmount.toFixed(2)}`, pageWidth - 20, finalY + 16, { align: 'right' });

    doc.text(`Discount (${invoice.discount}%):`, pageWidth - 60, finalY + 22);
    doc.text(`-${currencySymbol}${discountAmount.toFixed(2)}`, pageWidth - 20, finalY + 22, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.text('Total:', pageWidth - 60, finalY + 30);
    doc.text(`${currencySymbol}${total.toFixed(2)}`, pageWidth - 20, finalY + 30, { align: 'right' });

    // Notes
    let notesY = finalY + 40;
    if (invoice.notes) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Notes:', 20, notesY);
        doc.setFont('helvetica', 'normal');
        const splitNotes = doc.splitTextToSize(invoice.notes, pageWidth - 40);
        doc.text(splitNotes, 20, notesY + 6);
        notesY += (splitNotes.length * 5) + 6; 
    }
    
    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.text('Thank you for your business!', pageWidth / 2, pageHeight - 10, { align: 'center' });

    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
}
