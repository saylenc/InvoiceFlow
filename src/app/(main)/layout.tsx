import { Header } from '@/components/header';
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
      <footer className="mt-auto border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InvoiceFlow. All rights reserved. | <Link href="/terms" className="hover:underline">Terms of Service</Link></p>
        </div>
      </footer>
    </div>
  );
}
