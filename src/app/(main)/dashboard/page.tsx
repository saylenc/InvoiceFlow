import { DashboardStats } from '@/components/dashboard/stats';
import { Overview } from '@/components/dashboard/overview';
import { PageHeader } from '@/components/page-header';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Here's a summary of your business finances."
      />
      <DashboardStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview />
        <RecentInvoices />
      </div>
    </div>
  );
}
