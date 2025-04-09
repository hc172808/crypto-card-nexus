
import React from "react";
import { CreditCard, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CardType = {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  cvv: string;
  balance: number;
  type: "visa" | "mastercard";
  status: "active" | "frozen" | "canceled";
};

interface CardItemProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

export function CardItem({ card, onClick }: CardItemProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  // Function to mask a card number except the last 4 digits
  const maskCardNumber = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`;
  };

  return (
    <div
      className="virtual-card cursor-pointer"
      onClick={() => onClick(card)}
    >
      <div className="virtual-card-overlay" />
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-white/70">Virtual Card</div>
          <div className="font-bold text-xl">{card.type === "visa" ? "Visa" : "MasterCard"}</div>
        </div>
        <div className="flex space-x-1">
          {card.status === "frozen" && (
            <div className="bg-white/10 text-white p-1 rounded-full">
              <Lock size={18} />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white rounded-full bg-white/10 hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>

      <div className="card-number">
        {showDetails ? card.cardNumber : maskCardNumber(card.cardNumber)}
      </div>

      <div className="flex justify-between">
        <div>
          <div className="text-xs text-white/70">CARDHOLDER NAME</div>
          <div className="font-medium">{card.cardholderName}</div>
        </div>
        <div>
          <div className="text-xs text-white/70">EXPIRES</div>
          <div className="font-medium">{card.expiryDate}</div>
        </div>
        {showDetails && (
          <div>
            <div className="text-xs text-white/70">CVV</div>
            <div className="font-medium">{card.cvv}</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-xs text-white/70">BALANCE</div>
          <div className="font-bold">${card.balance.toFixed(2)}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Add Funds</DropdownMenuItem>
            <DropdownMenuItem>Transaction History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(
                card.status === "frozen" ? "text-green-500" : "text-red-500"
              )}
            >
              {card.status === "frozen" ? "Unfreeze Card" : "Freeze Card"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={cn(
          "absolute top-0 right-0 mt-2 mr-2",
          card.status === "active" && "bg-green-500",
          card.status === "frozen" && "bg-blue-500",
          card.status === "canceled" && "bg-red-500",
          "h-2.5 w-2.5 rounded-full"
        )}
      />
    </div>
  );
}
