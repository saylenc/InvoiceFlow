"use client"

import { InvoiceForm } from "@/components/invoices/invoice-form";
import { PageHeader } from "@/components/page-header";
import { useData } from "@/context/data-provider";
import { useParams } from "next/navigation";

export default function EditInvoicePage() {
  const { id } = useParams();
  const { getInvoiceById } = useData();

  const invoice = getInvoiceById(id as string);

  if (!invoice) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Invoice Not Found"
          description="The requested invoice could not be found."
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Edit Invoice ${invoice.invoiceNumber}`}
        description="Update the details of your invoice."
      />
      <InvoiceForm invoice={invoice} />
    </div>
  )
}
