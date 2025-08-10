"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Users, Settings, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/invoices", icon: FileText, label: "Invoices" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => (
      <Button
        key={item.href}
        variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
        asChild
        className={cn("justify-start", isMobile && "w-full")}
      >
        <Link href={item.href}>
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Link>
      </Button>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M9 12h6" />
              <path d="M9 17h3" />
            </svg>
            <span className="font-bold text-lg">InvoiceFlow</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {renderNavLinks()}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-4 p-4">{renderNavLinks(true)}</nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
