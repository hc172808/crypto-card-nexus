
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardType } from "../cards/CardItem";
import { WalletType } from "../wallets/WalletItem";
import { ArrowRight } from "lucide-react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card?: CardType;
  wallets: WalletType[];
}

export function AddFundsModal({ isOpen, onClose, card, wallets }: AddFundsModalProps) {
  const [amount, setAmount] = React.useState("");
  const [selectedWalletId, setSelectedWalletId] = React.useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund Card</DialogTitle>
          <DialogDescription>
            Add funds to your card from your connected crypto wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {card && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card" className="text-right">
                Card
              </Label>
              <Input
                id="card"
                className="col-span-3"
                value={`${card.type === 'visa' ? 'Visa' : 'MasterCard'} ****${card.cardNumber.slice(-4)}`}
                disabled
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wallet" className="text-right">
              From Wallet
            </Label>
            <Select onValueChange={setSelectedWalletId} value={selectedWalletId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {wallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      {wallet.chain} - {wallet.balance.amount} {wallet.balance.coin}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount (USD)
            </Label>
            <Input
              id="amount"
              placeholder="0.00"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1" />
            <div className="col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowRight size={14} />
              <span>
                This will convert crypto to USD based on current exchange rates.
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-nexus-500 hover:bg-nexus-600"
            disabled={!amount || !selectedWalletId}
          >
            Add Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
