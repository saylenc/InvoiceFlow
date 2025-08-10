import { InvoiceForm } from "@/components/invoices/invoice-form";
import { PageHeader } from "@/components/page-header";

export default function NewInvoicePage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="New Invoice"
        description="Create a new invoice for your client."
      />
      <InvoiceForm />
    </div>
  )
}
