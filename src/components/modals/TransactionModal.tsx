
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, CreditCard, User, Wallet, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export type TransactionType = {
  id: string;
  date: string;
  type: "card" | "wallet";
  name: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  details?: Record<string, string>;
  fee?: number;
};

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: TransactionType;
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Calculate fee or use default
  const transactionFee = transaction.fee || (Math.abs(transaction.amount) * 0.01).toFixed(2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Complete information about this transaction.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className={`text-2xl font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
            <Badge 
              className={getStatusColor(transaction.status)}
            >
              {transaction.status}
            </Badge>
          </div>
          
          <Separator />
          
          <div className="grid gap-3">
            <div className="flex gap-3 items-center">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Merchant</div>
                <div className="font-medium">{transaction.name}</div>
              </div>
            </div>
            
            <div className="flex gap-3 items-center">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()} {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 items-center">
              {transaction.type === "card" ? (
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Wallet className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <div className="text-sm text-muted-foreground">Payment Method</div>
                <div className="font-medium">
                  {transaction.type === "card" ? "Virtual Card" : "Crypto Wallet"}
                </div>
              </div>
            </div>
            
            {/* Add transaction fee section */}
            <div className="flex gap-3 items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Transaction Fee</div>
                <div className="font-medium">
                  ${transactionFee} <span className="text-xs text-muted-foreground">(to admin wallet)</span>
                </div>
              </div>
            </div>
          </div>
          
          {transaction.details && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-2">Additional Details</div>
                <div className="grid gap-1 text-sm">
                  {Object.entries(transaction.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline">Download Receipt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
