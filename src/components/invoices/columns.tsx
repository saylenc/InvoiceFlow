"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Invoice, InvoiceStatus } from "@/lib/types"
import { useData } from "@/context/data-provider"
import { calculateTotal } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

const statusVariant: Record<InvoiceStatus, "default" | "secondary" | "destructive"> = {
  Paid: "default",
  Unpaid: "secondary",
  Overdue: "destructive",
}

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("invoiceNumber")}</div>,
  },
  {
    accessorKey: "clientId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => {
      const { getClientById } = useData()
      const client = getClientById(row.getValue("clientId"))
      return <div>{client?.name || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as InvoiceStatus
      return <Badge variant={statusVariant[status]}>{status}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const { formatCurrency } = useData()
      const total = calculateTotal(row.original)
      return <div className="text-right font-medium">{formatCurrency(total)}</div>
    },
    sortingFn: (rowA, rowB) => {
        const totalA = calculateTotal(rowA.original);
        const totalB = calculateTotal(rowB.original);
        return totalA - totalB;
    }
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => (
      <div>{format(parseISO(row.getValue("dueDate")), "LLL dd, yyyy")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
