
import { ArrowDown, ArrowUp, CreditCard, Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "T-1",
    date: "2025-04-08",
    name: "Apple Store",
    amount: -129.99,
    status: "completed",
    type: "card",
  },
  {
    id: "T-2",
    date: "2025-04-07",
    name: "Fund Card",
    amount: 500,
    status: "completed",
    type: "wallet",
  },
  {
    id: "T-3",
    date: "2025-04-07",
    name: "Uber",
    amount: -24.50,
    status: "completed",
    type: "card",
  },
  {
    id: "T-4",
    date: "2025-04-06",
    name: "Amazon",
    amount: -67.84,
    status: "completed",
    type: "card",
  },
  {
    id: "T-5",
    date: "2025-04-05",
    name: "ETH Transfer",
    amount: -0.15,
    status: "pending",
    type: "wallet",
  },
];

export function RecentTransactions() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your recent transactions across cards and wallets.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-40">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {transaction.type === "card" ? (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Card</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span>Wallet</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {transaction.amount > 0 ? (
                      <ArrowDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
