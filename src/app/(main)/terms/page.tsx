import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Terms of Service"
        description="Last updated: August 10, 2025"
      />

      <Card>
        <CardContent className="prose prose-stone dark:prose-invert max-w-none pt-6 text-foreground">
          <p>Please read these terms and conditions carefully before using Our Service.</p>
          
          <h2 className="text-xl font-bold mt-6 mb-2">1. Introduction</h2>
          <p>Welcome to InvoiceFlow! These Terms of Service ("Terms") govern your use of the InvoiceFlow application ("Service"), which is provided as a sample application. By using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">2. Data Storage and Privacy</h2>
          <p>InvoiceFlow is a client-side application. All data you enter, including but not limited to invoices, client information, and settings ("User Data"), is stored exclusively in your web browser's local storage on your device. We do not have servers, and we do not collect, store, transmit, or have access to any of your User Data.</p>
          <p>You are solely responsible for the security and backup of your User Data. Since the data is stored locally, clearing your browser's cache or using a different browser or device will result in the loss of your data. The Service includes functionality to export and import your data as a JSON file, which you can use for backup purposes.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">3. Use of the Service</h2>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all activities that occur under your usage.</p>
          <p>You may not use the Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-2">4. Disclaimer of Warranties</h2>
          <p>The Service is provided "AS IS" and "AS AVAILABLE" without any warranty of any kind, express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free. You use the Service at your own risk. We disclaim all warranties, including but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">5. Limitation of Liability</h2>
          <p>In no event shall InvoiceFlow, nor its creators, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">6. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">7. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at contact@invoiceflow.com.</p>
        </CardContent>
      </Card>
    </div>
  );
}
