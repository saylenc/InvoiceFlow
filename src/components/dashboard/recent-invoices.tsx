"use client"

import { useData } from "@/context/data-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTotal } from "@/lib/utils";

export function RecentInvoices() {
    const { data, getClientById, formatCurrency } = useData();

    const recentInvoices = [...data.invoices]
        .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
        .slice(0, 5);

    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                    You have {data.invoices.length} total invoices.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentInvoices.map(invoice => {
                        const client = getClientById(invoice.clientId);
                        const total = calculateTotal(invoice);
                        return (
                            <div key={invoice.id} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                     <AvatarImage src={`https://avatar.vercel.sh/${client?.email}.png`} alt="Avatar" data-ai-hint="person avatar"/>
                                     <AvatarFallback>{client?.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{client?.name}</p>
                                    <p className="text-sm text-muted-foreground">{client?.email}</p>
                                </div>
                                <div className="ml-auto font-medium">{formatCurrency(total)}</div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
