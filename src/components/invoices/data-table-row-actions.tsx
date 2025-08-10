"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, FileDown } from "lucide-react"
import type { Invoice } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useData } from "@/context/data-provider"
import { useToast } from "@/hooks/use-toast"
import { generateInvoicePDF } from "@/lib/pdf"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const invoice = row.original as Invoice
  const router = useRouter()
  const { deleteInvoice, getClientById } = useData()
  const { toast } = useToast()

  const handleDelete = () => {
    deleteInvoice(invoice.id)
    toast({
      title: "Invoice Deleted",
      description: `Invoice ${invoice.invoiceNumber} has been deleted.`,
    })
  }
  
  const handleDownload = () => {
    const client = getClientById(invoice.clientId);
    if(client) {
      generateInvoicePDF(invoice, client)
    } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Client not found for this invoice.",
        })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => router.push(`/invoices/${invoice.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload}>
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
