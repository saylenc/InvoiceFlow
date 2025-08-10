"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, X } from "lucide-react"
import { DataTableFacetedFilter } from "../data-table-faceted-filter"
import type { Client, InvoiceStatus } from "@/lib/types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  statuses: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[]
  clients: Client[]
}

export function InvoicesDataTableToolbar<TData>({
  table,
  statuses,
  clients
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const clientOptions = clients.map(client => ({ label: client.name, value: client.id }))

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter invoices..."
          value={(table.getColumn("invoiceNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("invoiceNumber")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("clientId") && (
          <DataTableFacetedFilter
            column={table.getColumn("clientId")}
            title="Client"
            options={clientOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Link href="/invoices/new">
        <Button size="sm" className="h-8">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Invoice
        </Button>
      </Link>
    </div>
  )
}
