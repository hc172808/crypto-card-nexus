
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Calendar, CreditCard, DollarSign, Search, Wallet } from "lucide-react";
import { TransactionModal, TransactionType } from "@/components/modals/TransactionModal";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

// Enhanced demo transactions with fees
const demoTransactions: TransactionType[] = [
  {
    id: "T-1",
    date: "2025-04-08",
    name: "Apple Store",
    amount: -129.99,
    status: "completed",
    type: "card",
    fee: 1.29,
    details: {
      "Card": "Visa ****1111",
      "Category": "Electronics",
      "Transaction ID": "TXN-38472-AJDKE",
      "Fee": "$1.29 (1%)",
    }
  },
  {
    id: "T-2",
    date: "2025-04-07",
    name: "Fund Card",
    amount: 500,
    status: "completed",
    type: "wallet",
    fee: 5.00,
    details: {
      "From Wallet": "ETH 0x1234...5678",
      "To Card": "Visa ****1111",
      "Exchange Rate": "1 ETH = $2,566.21",
      "Fee": "$5.00 (1%)",
    }
  },
  {
    id: "T-3",
    date: "2025-04-07",
    name: "Uber",
    amount: -24.50,
    status: "completed",
    type: "card",
    fee: 0.25,
    details: {
      "Card": "Visa ****1111",
      "Category": "Transportation",
      "Location": "New York, NY",
      "Fee": "$0.25 (1%)",
    }
  },
  {
    id: "T-4",
    date: "2025-04-06",
    name: "Amazon",
    amount: -67.84,
    status: "completed",
    type: "card",
    fee: 0.68,
    details: {
      "Card": "MasterCard ****4444",
      "Category": "Shopping",
      "Order ID": "114-3941689-8772232",
      "Fee": "$0.68 (1%)",
    }
  },
  {
    id: "T-5",
    date: "2025-04-05",
    name: "ETH Transfer",
    amount: -0.15,
    status: "pending",
    type: "wallet",
    fee: 9.75,
    details: {
      "From Wallet": "ETH 0x1234...5678",
      "To Address": "0xabcd...ef12",
      "Gas Fee": "0.002 ETH",
      "Network": "Ethereum Mainnet",
      "Service Fee": "$9.75 (1%)",
    }
  },
  {
    id: "T-6",
    date: "2025-04-04",
    name: "Netflix",
    amount: -15.99,
    status: "completed",
    type: "card",
    fee: 0.16,
    details: {
      "Card": "Visa ****1111",
      "Category": "Entertainment",
      "Subscription": "Monthly",
      "Fee": "$0.16 (1%)",
    }
  },
  {
    id: "T-7",
    date: "2025-04-03",
    name: "Starbucks",
    amount: -5.67,
    status: "completed",
    type: "card",
    fee: 0.06,
    details: {
      "Card": "MasterCard ****4444",
      "Category": "Food & Drink",
      "Location": "San Francisco, CA",
      "Fee": "$0.06 (1%)",
    }
  },
];

const Transactions = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | undefined>();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Calculate total fees
  const totalFees = demoTransactions.reduce((sum, tx) => sum + (tx.fee || 0), 0).toFixed(2);

  const handleTransactionClick = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    // Use drawer on mobile, modal on desktop
    if (window.innerWidth < 768) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
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
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoTransactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.abs(demoTransactions.reduce((sum, tx) => sum + tx.amount, 0)).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nexus-500">${totalFees}</div>
            <p className="text-xs text-muted-foreground mt-1">
              1% of transactions to admin wallet
            </p>
          </CardContent>
        </Card>
      </div>
      
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
                  <TableHead>Fee</TableHead>
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
                      <TableCell>
                        <div className="text-xs text-muted-foreground">
                          ${transaction.fee?.toFixed(2) || "0.00"}
                        </div>
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
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No transactions found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Desktop Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
      
      {/* Mobile Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Transaction Details</DrawerTitle>
            <DrawerDescription>
              {selectedTransaction?.name} - ${Math.abs(selectedTransaction?.amount || 0).toFixed(2)}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div>{new Date(selectedTransaction.date).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="flex items-center gap-2">
                    {selectedTransaction.type === "card" ? (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span>Card</span>
                      </>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4" />
                        <span>Wallet</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge
                    variant={
                      selectedTransaction.status === "completed"
                        ? "outline"
                        : selectedTransaction.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Fee</div>
                  <div>${selectedTransaction.fee?.toFixed(2) || "0.00"}</div>
                </div>
                <div className="flex justify-between font-medium">
                  <div>Amount</div>
                  <div className={selectedTransaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                    ${Math.abs(selectedTransaction.amount).toFixed(2)}
                  </div>
                </div>
                
                {selectedTransaction.details && (
                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm font-medium mb-2">Additional Details</div>
                    {Object.entries(selectedTransaction.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <DrawerFooter className="pt-2">
            <Button variant="outline">Download Receipt</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Transactions;
