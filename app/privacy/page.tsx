import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
          
          <Card className="mb-6">
            <CardContent className="prose max-w-none p-8">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul>
                <li>Name and email address</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>Profile information and social links</li>
                <li>Prompt packs and associated metadata</li>
                <li>Communication preferences</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process transactions and send confirmations</li>
                <li>Deliver purchased prompt packs</li>
                <li>Process creator payouts</li>
                <li>Send administrative information and updates</li>
                <li>Improve our services and user experience</li>
                <li>Prevent fraud and abuse</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information with:
              </p>
              <ul>
                <li>Payment processors (Razorpay) to complete transactions</li>
                <li>Email service providers (AWS SES) to deliver communications</li>
                <li>Analytics providers to understand platform usage</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. Payment information is encrypted and processed by PCI-compliant payment processors.
              </p>

              <h2>5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. We use Plausible Analytics, which does not use cookies and respects user privacy.
              </p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2>7. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. Transaction records are kept for accounting and legal purposes.
              </p>

              <h2>8. Children&apos;s Privacy</h2>
              <p>
                Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.
              </p>

              <h2>10. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the date below.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at privacy@promptmarket.com
              </p>

              <p className="mt-8 text-sm text-muted-foreground">
                Last updated: October 23, 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
