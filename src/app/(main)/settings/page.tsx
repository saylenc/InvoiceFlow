
"use client"

import { useState, useRef } from 'react';
import { useData } from "@/context/data-provider"
import { useToast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { AppData } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { data, setData } = useData();
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showClearDataDialog, setShowClearDataDialog] = useState(false);

  const handleSettingsChange = (key: string, value: any) => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        [key]: value,
      },
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your new settings have been applied.",
    });
  }

  const handleExportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `invoiceflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast({ title: "Data Exported", description: "Your data has been downloaded." });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string) as AppData;
          // Basic validation
          if (importedData.clients && importedData.invoices && importedData.settings) {
            setData(importedData);
            toast({ title: "Data Imported", description: "Your data has been restored from the backup." });
          } else {
            throw new Error("Invalid backup file format.");
          }
        } catch (error) {
          toast({ variant: "destructive", title: "Import Failed", description: "The selected file is not a valid backup." });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    setData(initialData);
    setShowClearDataDialog(false);
    toast({
        title: "Data Cleared",
        description: "All application data has been reset."
    });
    router.push('/dashboard');
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Settings"
        description="Configure application settings and manage your data."
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Defaults</CardTitle>
            <CardDescription>Set default values for new invoices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={data.settings.currency}
                onValueChange={(value) => handleSettingsChange('currency', value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - United States Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                value={data.settings.defaultTaxRate}
                onChange={(e) => handleSettingsChange('defaultTaxRate', parseFloat(e.target.value) || 0)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Backup, restore, or clear your application data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> All your data is stored securely in your browser's local storage. It is not accessible on other devices or browsers.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleExportData} variant="outline" className="w-full sm:w-auto">Export Data as JSON</Button>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full sm:w-auto">Import from JSON</Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".json"
                    onChange={handleImportData}
                />
            </div>
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This action is irreversible. All your invoices, clients, and settings will be permanently deleted from this browser.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" onClick={() => setShowClearDataDialog(true)}>Clear All Data</Button>
                </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </div>

       <AlertDialog open={showClearDataDialog} onOpenChange={setShowClearDataDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your data from this browser.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, delete everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
