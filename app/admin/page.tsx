import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Download, RefreshCw } from "lucide-react";

const pendingPrompts = [
  {
    id: "p1",
    title: "Social Media Prompts Collection",
    creator: "jane@example.com",
    price: 399,
    category: "Marketing",
    submittedAt: Date.now() - 86400000,
  },
  {
    id: "p2",
    title: "Python Code Generation Prompts",
    creator: "dev@example.com",
    price: 699,
    category: "Development",
    submittedAt: Date.now() - 172800000,
  },
];

const recentPurchases = [
  {
    id: "pu1",
    promptTitle: "ChatGPT Content Writing Master Pack",
    buyer: "buyer@example.com",
    amount: 499,
    status: "completed",
    date: Date.now() - 3600000,
  },
  {
    id: "pu2",
    promptTitle: "Marketing Copy Templates",
    buyer: "customer@example.com",
    amount: 599,
    status: "completed",
    date: Date.now() - 7200000,
  },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage prompts, users, and platform operations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPrompts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.4L</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Prompts */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{prompt.title}</h3>
                  <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                    <span>Creator: {prompt.creator}</span>
                    <span>Price: ₹{prompt.price}</span>
                    <span>Category: {prompt.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    View File
                  </Button>
                  <Button size="sm" variant="default">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{purchase.promptTitle}</h3>
                  <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                    <span>Buyer: {purchase.buyer}</span>
                    <span>Amount: ₹{purchase.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{purchase.status}</Badge>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Refund
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Payouts */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">john@example.com</p>
                <p className="text-sm text-muted-foreground">
                  Period: Oct 1 - Oct 7
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">₹12,450</span>
                <Button size="sm">Mark as Paid</Button>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">jane@example.com</p>
                <p className="text-sm text-muted-foreground">
                  Period: Oct 1 - Oct 7
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">₹8,230</span>
                <Button size="sm">Mark as Paid</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
