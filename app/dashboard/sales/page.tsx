import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";

const mockSales = [
  {
    id: "1",
    promptTitle: "ChatGPT Content Writing Master Pack",
    buyerEmail: "buyer1@example.com",
    amount: 499,
    platformFee: 75,
    earnings: 424,
    date: Date.now() - 7200000,
  },
  {
    id: "2",
    promptTitle: "Marketing Copy Templates",
    buyerEmail: "buyer2@example.com",
    amount: 599,
    platformFee: 90,
    earnings: 509,
    date: Date.now() - 18000000,
  },
  {
    id: "3",
    promptTitle: "ChatGPT Content Writing Master Pack",
    buyerEmail: "buyer3@example.com",
    amount: 499,
    platformFee: 75,
    earnings: 424,
    date: Date.now() - 86400000,
  },
  {
    id: "4",
    promptTitle: "Marketing Copy Templates",
    buyerEmail: "buyer4@example.com",
    amount: 599,
    platformFee: 90,
    earnings: 509,
    date: Date.now() - 172800000,
  },
];

export default function SalesPage() {
  const totalEarnings = mockSales.reduce((sum, sale) => sum + sale.earnings, 0);
  const pendingPayout = 12450;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Sales Ledger</h1>
        <p className="text-muted-foreground">
          Track your sales and earnings
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(pendingPayout)}</div>
            <p className="text-xs text-muted-foreground">Paid weekly on Friday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSales.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 border-b pb-2 text-sm font-medium">
              <div className="col-span-2">Prompt</div>
              <div>Amount</div>
              <div>Earnings</div>
              <div>Date</div>
            </div>
            {mockSales.map((sale) => (
              <div key={sale.id} className="grid grid-cols-5 gap-4 border-b pb-4 text-sm">
                <div className="col-span-2">
                  <p className="font-medium">{sale.promptTitle}</p>
                  <p className="text-muted-foreground">{sale.buyerEmail}</p>
                </div>
                <div>{formatPrice(sale.amount)}</div>
                <div className="font-medium text-green-600">
                  {formatPrice(sale.earnings)}
                </div>
                <div className="text-muted-foreground">
                  {formatDate(sale.date)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
