"use client"

import { useData } from "@/context/data-provider"
import { columns } from "@/components/invoices/columns"
import { DataTable } from "@/components/data-table"
import { InvoicesDataTableToolbar } from "@/components/invoices/data-table-toolbar"
import { PageHeader } from "@/components/page-header"
import type { InvoiceStatus } from "@/lib/types"

const statuses: { label: string; value: InvoiceStatus }[] = [
  { label: "Paid", value: "Paid" },
  { label: "Unpaid", value: "Unpaid" },
  { label: "Overdue", value: "Overdue" },
]

export default function InvoicesPage() {
  const { data } = useData()

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Invoices"
        description="Manage all your invoices here. You can create, edit, delete, and download invoices."
      />
      <DataTable
        data={data.invoices}
        columns={columns}
        toolbar={<InvoicesDataTableToolbar statuses={statuses} clients={data.clients} table={undefined as any} />}
      />
    </div>
  )
}
