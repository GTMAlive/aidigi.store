import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "What is PromptMarket?",
    answer: "PromptMarket is a marketplace where creators can sell their AI prompt packs and buyers can purchase high-quality prompts for ChatGPT, Midjourney, and other AI tools.",
  },
  {
    question: "How do I start selling prompts?",
    answer: "Sign up for a free account, upload your prompt pack with a title, description, and price, and we'll review it within 24-48 hours. Once approved, it goes live on the marketplace.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and wallets through our secure payment partner Razorpay.",
  },
  {
    question: "How much do creators earn per sale?",
    answer: "Free plan creators earn 85% of each sale (15% platform fee). Pro plan creators earn 95% of each sale (5% platform fee).",
  },
  {
    question: "When do I get paid?",
    answer: "Payouts are processed weekly every Friday. You'll receive your earnings for all sales from the previous week directly to your bank account or UPI.",
  },
  {
    question: "What's your refund policy?",
    answer: "Buyers can request a refund within 7 days if the product is not as described. We review each refund request carefully to ensure fairness for both buyers and creators.",
  },
  {
    question: "How do buyers receive their prompts?",
    answer: "After successful payment, buyers instantly receive an email with a download link to access their prompt pack. They have lifetime access to their purchase.",
  },
  {
    question: "What file formats are accepted?",
    answer: "We accept .txt, .md, and .pdf files for prompt packs. Make sure your prompts are well-organized and clearly formatted.",
  },
  {
    question: "Can I update my prompts after publishing?",
    answer: "Yes, you can update your prompt packs anytime from your dashboard. All buyers who purchased will have access to the updated version.",
  },
  {
    question: "What's the difference between Free and Pro plans?",
    answer: "Free plan includes branded footer, 10k visitors/month, and 15% transaction fee. Pro plan ($49/month) offers custom domain, no branding, unlimited visitors, and only 5% transaction fee.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about PromptMarket
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">
              Still have questions?
            </p>
            <a
              href="mailto:support@promptmarket.com"
              className="text-primary hover:underline"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
