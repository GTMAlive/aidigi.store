import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  CheckCircle, 
  Zap, 
  TrendingUp, 
  Gift, 
  Users, 
  Sparkles,
  ArrowRight,
  Crown,
  Heart
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="bg-gradient-to-b from-purple-50/50 to-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge className="mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            Revolutionary Pricing Model
          </Badge>
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              We Win When You Win
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            The only platform with <strong>Growth Share</strong> pricing. 
            Pay LESS as you earn MORE. Start completely FREE!
          </p>
        </div>

        {/* Growth Share Pricing Table */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Growth Share - For Creators</h2>
          <Card className="mx-auto max-w-4xl border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Pay Based on YOUR Success</h3>
                <p className="text-purple-100">No fixed fees. No monthly bills. Just growth shared.</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {/* Tier 1 */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Gift className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">First ₹10,000</span>
                      </div>
                      <p className="text-gray-600">Test the platform risk-free</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-green-600">0%</div>
                      <div className="text-sm text-gray-600">Platform fee</div>
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">₹10,001 - ₹50,000</span>
                      </div>
                      <p className="text-gray-600">Growing your business</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">5%</div>
                      <div className="text-sm text-gray-600">You keep 95%</div>
                    </div>
                  </div>

                  {/* Tier 3 */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="h-6 w-6 text-purple-600" />
                        <span className="text-2xl font-bold text-gray-900">₹50,001 - ₹1,00,000</span>
                      </div>
                      <p className="text-gray-600">Scaling fast</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-purple-600">8%</div>
                      <div className="text-sm text-gray-600">You keep 92%</div>
                    </div>
                  </div>

                  {/* Tier 4 */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Crown className="h-6 w-6 text-amber-600" />
                        <span className="text-2xl font-bold text-gray-900">₹1,00,000+</span>
                      </div>
                      <p className="text-gray-600">Top creator tier</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-amber-600">10%</div>
                      <div className="text-sm text-gray-600">You keep 90%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-purple-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Why this is revolutionary:</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• <strong>Stan Store:</strong> 9% from day one</li>
                        <li>• <strong>Gumroad:</strong> 10% flat fee</li>
                        <li>• <strong>PromptMarket:</strong> 0-10% based on YOUR growth</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Streams */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Multiple Ways to Earn</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">One-Time Sales</h3>
                <p className="text-sm text-gray-600">Sell individual prompt packs instantly</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Subscriptions</h3>
                <p className="text-sm text-gray-600">Monthly recurring revenue from fans</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Tips & Donations</h3>
                <p className="text-sm text-gray-600">Let buyers pay what they want</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Affiliate Income</h3>
                <p className="text-sm text-gray-600">Earn 20% referring other creators</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Buyer Loyalty */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Buyer Loyalty Rewards</h2>
          <Card className="mx-auto max-w-4xl border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge className="mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white">
                  Industry First!
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Earn PromptCoins on Every Purchase</h3>
                <p className="text-gray-600">The only platform that rewards buyers for shopping</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 bg-white rounded-2xl text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10%</div>
                  <div className="text-sm font-medium mb-1">Free Members</div>
                  <div className="text-xs text-gray-600">₹10 back per ₹100</div>
                </div>
                <div className="p-6 bg-white rounded-2xl text-center border-2 border-purple-500">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
                  <div className="text-sm font-medium mb-1">Premium (₹99/mo)</div>
                  <div className="text-xs text-gray-600">₹15 back per ₹100</div>
                </div>
                <div className="p-6 bg-white rounded-2xl text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">20%</div>
                  <div className="text-sm font-medium mb-1">VIP (₹299/mo)</div>
                  <div className="text-xs text-gray-600">₹20 back per ₹100</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/60 rounded-xl">
                <p className="text-center text-sm text-gray-600">
                  <strong>Use PromptCoins</strong> for discounts on future purchases, unlock exclusive bundles, or subscribe to creators FREE
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">How We Compare</h2>
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="p-4 text-left font-bold">Feature</th>
                  <th className="p-4 text-center font-bold text-purple-600">PromptMarket</th>
                  <th className="p-4 text-center font-bold text-gray-400">Stan Store</th>
                  <th className="p-4 text-center font-bold text-gray-400">Gumroad</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="p-4">Starting Fee</td>
                  <td className="p-4 text-center font-bold text-green-600">0%</td>
                  <td className="p-4 text-center text-gray-600">9%</td>
                  <td className="p-4 text-center text-gray-600">10%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Growth-Based Pricing</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Buyer Rewards</td>
                  <td className="p-4 text-center">✅ 10-20%</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Subscriptions</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Affiliate Program</td>
                  <td className="p-4 text-center">✅ 20%</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅ 10%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">Payout Speed</td>
                  <td className="p-4 text-center font-bold text-purple-600">Weekly</td>
                  <td className="p-4 text-center text-gray-600">Monthly</td>
                  <td className="p-4 text-center text-gray-600">Monthly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="mx-auto max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
            <CardContent className="p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-xl text-purple-100 mb-8">
                First ₹10,000 is completely FREE. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full bg-white text-purple-600 hover:bg-gray-100 px-8" asChild>
                  <Link href="/dashboard/upload">
                    Start Selling Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white/10 px-8" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="mb-2 font-semibold text-lg">How does Growth Share pricing work?</h3>
              <p className="text-gray-600">
                Your platform fee is based on your monthly earnings. First ₹10,000 is FREE (0%), then 5% for ₹10k-50k, 8% for ₹50k-100k, and 10% for ₹100k+. You always keep 90-100% of your earnings.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="mb-2 font-semibold text-lg">What are PromptCoins?</h3>
              <p className="text-gray-600">
                PromptCoins are loyalty rewards buyers earn on every purchase (10-20% back). They can use these coins for discounts on future purchases, making our platform more valuable than competitors.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="mb-2 font-semibold text-lg">How fast do I get paid?</h3>
              <p className="text-gray-600">
                Weekly! Every Friday, you receive all earnings from the previous week directly to your bank account or UPI. Unlike competitors who pay monthly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="mb-2 font-semibold text-lg">Can I offer subscriptions AND one-time sales?</h3>
              <p className="text-gray-600">
                Yes! You can have multiple revenue streams: one-time prompt sales, monthly subscriptions for fans, pay-what-you-want tips, and bundles. Maximum flexibility for your business.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="mb-2 font-semibold text-lg">Is there any commitment or contract?</h3>
              <p className="text-gray-600">
                None! You can start and stop anytime. No monthly fees, no contracts, no hidden costs. You only pay when you make a sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
