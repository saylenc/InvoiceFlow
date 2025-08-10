"use client";

import { useData } from "@/context/data-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, Clock, CheckCircle } from "lucide-react";
import { calculateTotal } from "@/lib/utils";

export function DashboardStats() {
  const { data, formatCurrency } = useData();

  const totalPaid = data.invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + calculateTotal(inv), 0);

  const totalUnpaid = data.invoices
    .filter((inv) => inv.status === 'Unpaid')
    .reduce((sum, inv) => sum + calculateTotal(inv), 0);

  const totalOverdue = data.invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + calculateTotal(inv), 0);
  
  const totalRevenue = data.invoices.reduce((sum, inv) => sum + calculateTotal(inv), 0);

  const stats = [
    { title: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign },
    { title: "Paid", value: formatCurrency(totalPaid), icon: CheckCircle, color: "text-accent" },
    { title: "Unpaid", value: formatCurrency(totalUnpaid), icon: FileText, color: "text-blue-500" },
    { title: "Overdue", value: formatCurrency(totalOverdue), icon: Clock, color: "text-destructive" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color || ''}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
