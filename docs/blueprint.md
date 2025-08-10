# **App Name**: InvoiceFlow

## Core Features:

- Invoice Management: Create, edit, and delete invoices with fields for Invoice Number, Client Name, Client Email, Issue Date, Due Date, Item Description, Quantity, Unit Price, Tax (%), Discount (%), and Total.
- Dashboard: Display total invoices, total paid, total unpaid, and overdue count in a dashboard. Show charts for monthly income and outstanding payments using Chart.js or Recharts. Filter invoices by status, client, or date range.
- Client Management: Add, edit, and delete clients with Name, Email, Company, Phone, Notes. Link invoices to clients for quick lookup.
- Data Storage: Store all invoices, clients, and settings in localStorage. Automatically save data on every change and load existing data when the app opens.
- UI/UX: Implement a fully responsive layout for desktop, tablet, and mobile. Include a dark mode toggle (store preference in localStorage) and a sticky navigation bar with links to Dashboard, Invoices, Clients, and Settings.
- Settings: Set default currency (USD, EUR, etc.) and tax rate in settings. Provide an option to clear all saved data with a confirmation popup.
- Extras: Include a search bar to quickly find invoices or clients. Allow sorting of tables by date, client name, or amount. Enable downloading all data as a JSON file for backup and uploading JSON backup to restore data.

## Style Guidelines:

- Primary color: Vivid blue (#4285F4) to convey trust and professionalism.
- Background color: Light gray (#F5F5F5) for a clean, modern look.
- Accent color: Green (#34A853) for positive actions like 'Paid' or 'Save'.
- Body and headline font: 'Inter', a sans-serif font for a clean, machined look. Suitable for both headlines and body text.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use modern, line-style icons for navigation and actions. Icons should be simple and consistent throughout the application.
- Implement a consistent grid-based layout for all pages. Use white space effectively to create a sense of balance and clarity.