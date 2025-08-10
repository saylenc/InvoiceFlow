"use client"

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useData } from "@/context/data-provider"
import { columns } from "@/components/clients/columns"
import { PageHeader } from "@/components/page-header"
import { ClientsDataTableToolbar } from "@/components/clients/data-table-toolbar"
import { ClientDialog } from "@/components/clients/client-dialog"
import { DataTable } from "@/components/data-table"

export default function ClientsPage() {
  const { data } = useData()
  const [isClientDialogOpen, setIsClientDialogOpen] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: data.clients,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Clients"
        description="Manage all your clients here. You can add, edit, and delete clients."
      />
      <DataTable
        data={data.clients}
        columns={columns}
        table={table}
        toolbar={<ClientsDataTableToolbar onNewClient={() => setIsClientDialogOpen(true)} table={table} />}
      />
      <ClientDialog isOpen={isClientDialogOpen} onClose={() => setIsClientDialogOpen(false)} />
    </div>
  )
}
