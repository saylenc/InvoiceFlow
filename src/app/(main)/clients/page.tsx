"use client"

import { useState } from "react"
import { useData } from "@/context/data-provider"
import { columns } from "@/components/clients/columns"
import { DataTable } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { ClientsDataTableToolbar } from "@/components/clients/data-table-toolbar"
import { ClientDialog } from "@/components/clients/client-dialog"

export default function ClientsPage() {
  const { data } = useData()
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Clients"
        description="Manage all your clients here. You can add, edit, and delete clients."
      />
      <DataTable
        data={data.clients}
        columns={columns}
        toolbar={<ClientsDataTableToolbar onNewClient={() => setIsClientDialogOpen(true)} table={undefined as any} />}
      />
      <ClientDialog isOpen={isClientDialogOpen} onClose={() => setIsClientDialogOpen(false)} />
    </div>
  )
}
