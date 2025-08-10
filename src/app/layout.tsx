import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { DataProvider } from '@/context/data-provider';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'InvoiceFlow',
  description: 'Manage invoices and payments with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            {children}
            <Toaster />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
