import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptMarket | The Future of AI Prompt Commerce",
  description: "Premium AI prompt marketplace built for creators. Launch your AI product store, sell prompt packs, and scale your business with 0% fees on your first ₹10,000.",
  keywords: ["AI prompts", "ChatGPT", "Midjourney", "prompt marketplace", "AI commerce", "creator economy", "AI products"],
  openGraph: {
    title: "PromptMarket | Premium AI Prompt Marketplace",
    description: "The next-generation platform for AI prompt creators. Beautiful storefronts, instant delivery, and the lowest fees in the industry.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptMarket - Premium AI Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptMarket | Build Your AI Empire",
    description: "Launch your AI prompt store in minutes. Beautiful themes, biolinks, and the best fees for creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Analytics Script */}
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_APP_URL?.replace(/https?:\/\//, '')}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
