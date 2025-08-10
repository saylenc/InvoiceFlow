"use client"

import * as React from "react"
import { useData } from "@/context/data-provider"
import { columns } from "@/components/invoices/columns"
import { DataTable } from "@/components/data-table"
import { InvoicesDataTableToolbar } from "@/components/invoices/data-table-toolbar"
import { PageHeader } from "@/components/page-header"
import type { InvoiceStatus } from "@/lib/types"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table"


const statuses: { label: string; value: InvoiceStatus }[] = [
  { label: "Paid", value: "Paid" },
  { label: "Unpaid", value: "Unpaid" },
  { label: "Overdue", value: "Overdue" },
]

export default function InvoicesPage() {
  const { data } = useData()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: data.invoices,
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
        title="Invoices"
        description="Manage all your invoices here. You can create, edit, delete, and download invoices."
      />
      <DataTable
        data={data.invoices}
        columns={columns}
        table={table}
        toolbar={<InvoicesDataTableToolbar statuses={statuses} clients={data.clients} table={table} />}
      />
    </div>
  )
}
