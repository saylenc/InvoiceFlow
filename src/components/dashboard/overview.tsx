"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useData } from "@/context/data-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTotal } from "@/lib/utils";
import { format, parseISO } from "date-fns";

export function Overview() {
  const { data, formatCurrency } = useData();

  const monthlyIncome = data.invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((acc, invoice) => {
      const month = format(parseISO(invoice.issueDate), 'MMM');
      const total = calculateTotal(invoice);
      acc[month] = (acc[month] || 0) + total;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.keys(monthlyIncome).map(month => ({
    name: month,
    total: monthlyIncome[month],
  })).sort((a, b) => new Date(`1 ${a.name} 2000`).getMonth() - new Date(`1 ${b.name} 2000`).getMonth());


  return (
    <Card className="col-span-4">
        <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatCurrency(value as number)}
                    />
                    <Tooltip
                      cursor={{fill: 'hsl(var(--muted))'}}
                      contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                      formatter={(value) => [formatCurrency(value as number), 'Income']}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
