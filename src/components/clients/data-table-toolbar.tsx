"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onNewClient: () => void;
}

export function ClientsDataTableToolbar<TData>({
  table,
  onNewClient,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter clients..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <Button size="sm" className="h-8" onClick={onNewClient}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Client
      </Button>
    </div>
  )
}
