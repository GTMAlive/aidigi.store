import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
          
          <Card className="mb-6">
            <CardContent className="prose max-w-none p-8">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using PromptMarket, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (prompt packs) on PromptMarket for personal, non-commercial transitory viewing only.
              </p>

              <h2>3. Creator Responsibilities</h2>
              <ul>
                <li>Creators must only upload original content or content they have rights to distribute</li>
                <li>Content must not violate any intellectual property rights</li>
                <li>Prompts must be accurately described and match the preview/description</li>
                <li>Creators are responsible for maintaining accurate payout information</li>
              </ul>

              <h2>4. Buyer Responsibilities</h2>
              <ul>
                <li>Purchased prompts are for personal or business use only</li>
                <li>Redistribution or resale of purchased prompts is prohibited</li>
                <li>Buyers must provide accurate contact information for delivery</li>
              </ul>

              <h2>5. Payments and Fees</h2>
              <p>
                All payments are processed securely through Razorpay. Platform fees are deducted from each sale as specified in your plan (15% for Free, 5% for Pro).
              </p>

              <h2>6. Refund Policy</h2>
              <p>
                Buyers can request a refund within 7 days if the product is not as described. Each refund request is reviewed individually. Refunds are processed within 5-7 business days.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                All content uploaded to PromptMarket remains the intellectual property of the creator. PromptMarket is granted a license to display and distribute the content on the platform.
              </p>

              <h2>8. Account Termination</h2>
              <p>
                We reserve the right to terminate or suspend accounts that violate these terms or engage in fraudulent activity.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                PromptMarket shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email.
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
