
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Calendar, CreditCard, Search, Wallet } from "lucide-react";
import { TransactionModal, TransactionType } from "@/components/modals/TransactionModal";

const demoTransactions: TransactionType[] = [
  {
    id: "T-1",
    date: "2025-04-08",
    name: "Apple Store",
    amount: -129.99,
    status: "completed",
    type: "card",
    details: {
      "Card": "Visa ****1111",
      "Category": "Electronics",
      "Transaction ID": "TXN-38472-AJDKE",
    }
  },
  {
    id: "T-2",
    date: "2025-04-07",
    name: "Fund Card",
    amount: 500,
    status: "completed",
    type: "wallet",
    details: {
      "From Wallet": "ETH 0x1234...5678",
      "To Card": "Visa ****1111",
      "Exchange Rate": "1 ETH = $2,566.21",
    }
  },
  {
    id: "T-3",
    date: "2025-04-07",
    name: "Uber",
    amount: -24.50,
    status: "completed",
    type: "card",
    details: {
      "Card": "Visa ****1111",
      "Category": "Transportation",
      "Location": "New York, NY",
    }
  },
  {
    id: "T-4",
    date: "2025-04-06",
    name: "Amazon",
    amount: -67.84,
    status: "completed",
    type: "card",
    details: {
      "Card": "MasterCard ****4444",
      "Category": "Shopping",
      "Order ID": "114-3941689-8772232",
    }
  },
  {
    id: "T-5",
    date: "2025-04-05",
    name: "ETH Transfer",
    amount: -0.15,
    status: "pending",
    type: "wallet",
    details: {
      "From Wallet": "ETH 0x1234...5678",
      "To Address": "0xabcd...ef12",
      "Gas Fee": "0.002 ETH",
      "Network": "Ethereum Mainnet",
    }
  },
  {
    id: "T-6",
    date: "2025-04-04",
    name: "Netflix",
    amount: -15.99,
    status: "completed",
    type: "card",
    details: {
      "Card": "Visa ****1111",
      "Category": "Entertainment",
      "Subscription": "Monthly",
    }
  },
  {
    id: "T-7",
    date: "2025-04-03",
    name: "Starbucks",
    amount: -5.67,
    status: "completed",
    type: "card",
    details: {
      "Card": "MasterCard ****4444",
      "Category": "Food & Drink",
      "Location": "San Francisco, CA",
    }
  },
];

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<TransactionType | undefined>();
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const handleTransactionClick = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Filter transactions based on search and filters
  const filteredTransactions = demoTransactions.filter(tx => {
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Transactions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleTransactionClick(transaction)}
                    >
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
                              : transaction.status === "pending"
                              ? "secondary"
                              : "destructive"
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No transactions found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
