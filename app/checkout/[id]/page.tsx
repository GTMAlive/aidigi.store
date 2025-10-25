"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import { Shield, Lock, CreditCard } from "lucide-react";

// Mock prompt data
const mockPrompt = {
  id: "p1",
  title: "ChatGPT Content Writing Master Pack",
  price: 499,
  thumbnail_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
};

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!buyerInfo.name || !buyerInfo.email) {
      alert("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    // In production, you would:
    // 1. Call your API to create an order
    // 2. Get order_id from backend
    // 3. Open Razorpay checkout

    // Simulated Razorpay integration
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
      amount: mockPrompt.price * 100, // amount in paise
      currency: "INR",
      name: "PromptMarket",
      description: mockPrompt.title,
      image: "/logo.png",
      order_id: "order_" + Date.now(), // This should come from your backend
      handler: function (response: any) {
        // Payment successful
        console.log("Payment successful:", response);
        router.push(`/thank-you?payment_id=${response.razorpay_payment_id}`);
      },
      prefill: {
        name: buyerInfo.name,
        email: buyerInfo.email,
      },
      theme: {
        color: "#2563eb",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    // For demo purposes, simulate payment
    setTimeout(() => {
      alert("Demo: Payment would open Razorpay checkout here");
      router.push(`/thank-you?demo=true`);
    }, 1000);

    // Uncomment this for actual Razorpay integration:
    // const razorpay = new (window as any).Razorpay(options);
    // razorpay.open();
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={buyerInfo.name}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={buyerInfo.email}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, email: e.target.value })
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Download link will be sent to this email
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4" />
                      Secure Payment
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is secure and encrypted. We use
                      Razorpay for payment processing.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(mockPrompt.price)}`}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>7-day money-back guarantee</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    {mockPrompt.thumbnail_url && (
                      <img
                        src={mockPrompt.thumbnail_url}
                        alt={mockPrompt.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold leading-tight">
                        {mockPrompt.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Digital Download
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(mockPrompt.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(mockPrompt.price)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Instant download after payment
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Lifetime access
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      7-day refund policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
