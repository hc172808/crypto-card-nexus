
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCardModal({ isOpen, onClose }: NewCardModalProps) {
  const [cardType, setCardType] = React.useState("visa");
  const [currency, setCurrency] = React.useState("usd");
  const [isVirtual, setIsVirtual] = React.useState(true);
  const [limit, setLimit] = React.useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Card</DialogTitle>
          <DialogDescription>
            Set up your new virtual card for online payments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cardType" className="text-right">
              Card Type
            </Label>
            <Select
              value={cardType}
              onValueChange={setCardType}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">MasterCard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Currency
            </Label>
            <Select
              value={currency}
              onValueChange={setCurrency}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="limit" className="text-right">
              Monthly Limit
            </Label>
            <Input
              id="limit"
              placeholder="1000.00"
              className="col-span-3"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              type="number"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isVirtual" className="text-right">
              Virtual Card
            </Label>
            <div className="flex items-center gap-2 col-span-3">
              <Switch
                id="isVirtual"
                checked={isVirtual}
                onCheckedChange={setIsVirtual}
              />
              <span className="text-sm text-muted-foreground">
                {isVirtual ? "Virtual card only" : "Physical card requested"}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-nexus-500 hover:bg-nexus-600">
            Create Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
