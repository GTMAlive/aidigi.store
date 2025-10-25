import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Download, Mail, Home } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Payment Successful!
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for your purchase. Your prompt pack is ready!
          </p>

          <Card className="mb-8 text-left">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">What&apos;s Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Check Your Email</p>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ve sent a download link to your email address. The email
                      includes your purchase receipt and download instructions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Download Your Prompts</p>
                    <p className="text-sm text-muted-foreground">
                      Click the download link in your email to access your prompt
                      pack. You have lifetime access to your purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium">Transaction Details</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Order ID: #ORD-{Date.now()}</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>Amount: ₹499.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Browse More Prompts
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              Need help? Contact us at{" "}
              <a
                href="mailto:support@promptmarket.com"
                className="text-primary hover:underline"
              >
                support@promptmarket.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
