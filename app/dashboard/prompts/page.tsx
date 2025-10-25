import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, Eye } from "lucide-react";

const mockPrompts = [
  {
    id: "1",
    title: "ChatGPT Content Writing Master Pack",
    status: "live",
    price: 499,
    sales: 156,
    revenue: 66244,
  },
  {
    id: "2",
    title: "Marketing Copy Templates",
    status: "live",
    price: 599,
    sales: 89,
    revenue: 45311,
  },
  {
    id: "3",
    title: "Social Media Prompts Collection",
    status: "pending",
    price: 399,
    sales: 0,
    revenue: 0,
  },
  {
    id: "4",
    title: "Email Marketing Prompts",
    status: "draft",
    price: 499,
    sales: 0,
    revenue: 0,
  },
];

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">My Products</h1>
          <p className="text-muted-foreground">
            Manage your uploaded products
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">Upload New</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {mockPrompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{prompt.title}</h3>
                  <Badge
                    variant={
                      prompt.status === "live"
                        ? "default"
                        : prompt.status === "pending"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {prompt.status}
                  </Badge>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>Price: ₹{prompt.price}</span>
                  <span>Sales: {prompt.sales}</span>
                  <span>Revenue: ₹{prompt.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/prompt/${prompt.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
