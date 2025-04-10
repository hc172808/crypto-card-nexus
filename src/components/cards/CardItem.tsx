
import React from "react";
import { CreditCard, Eye, EyeOff, Lock, ShieldCheck, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export type CardType = {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  customCardName?: string;
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
  const [isEditCardOpen, setIsEditCardOpen] = React.useState(false);
  const [editedCardName, setEditedCardName] = React.useState(card.customCardName || card.cardholderName);
  const [editedCardType, setEditedCardType] = React.useState<"visa" | "mastercard">(card.type);
  const { toast } = useToast();

  // Function to mask a card number except the last 4 digits
  const maskCardNumber = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`;
  };

  const handleSaveCardChanges = () => {
    // In a real implementation this would update the card data via an API
    
    // For demo purposes, we'll update the local card data
    card.customCardName = editedCardName;
    card.type = editedCardType;
    
    setIsEditCardOpen(false);
    toast({
      title: "Card updated",
      description: "Card details have been successfully updated.",
    });
  };

  const handlePrintCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a document with the card for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Card</title>
            <style>
              @media print {
                @page {
                  size: 3.375in 2.125in; /* Standard credit card size */
                  margin: 0;
                }
                body {
                  margin: 0;
                }
              }
              body {
                font-family: Arial, sans-serif;
              }
              .card-container {
                width: 3.375in;
                height: 2.125in;
                position: relative;
                border: 1px solid #ddd;
                border-radius: 10px;
                overflow: hidden;
              }
              .card-front {
                width: 100%;
                height: 100%;
                background: ${card.type === 'visa' ? 
                  'linear-gradient(135deg, #7928CA, #FF0080)' : 
                  'linear-gradient(135deg, #2a2a72, #009ffd)'};
                color: white;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .card-number {
                font-size: 16px;
                letter-spacing: 2px;
                margin: 15px 0;
              }
              .card-holder {
                font-size: 12px;
                text-transform: uppercase;
              }
              .card-brand {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 18px;
                font-weight: bold;
              }
              .card-expiry {
                font-size: 12px;
                margin-top: 5px;
              }
              .logo {
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
              }
            </style>
          </head>
          <body>
            <div class="card-container">
              <div class="card-front">
                <div>
                  <div class="logo">NEXUS CARD</div>
                  <div class="card-brand">${card.type.toUpperCase()}</div>
                </div>
                <div>
                  <div class="card-number">${card.cardNumber}</div>
                  <div class="card-holder">${card.customCardName || card.cardholderName}</div>
                  <div class="card-expiry">VALID THRU ${card.expiryDate}</div>
                </div>
              </div>
            </div>
            <script>
              window.onload = () => {
                window.print();
                setTimeout(() => window.close(), 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    
    toast({
      title: "Printing card",
      description: `Virtual card sent to printer.`,
    });
  };

  return (
    <>
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
            <div className="font-medium">{card.customCardName || card.cardholderName}</div>
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
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                setIsEditCardOpen(true);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Card
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrintCard}>
                <Download className="h-4 w-4 mr-2" />
                Print Virtual Card
              </DropdownMenuItem>
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

      {/* Edit Card Dialog */}
      <Dialog open={isEditCardOpen} onOpenChange={setIsEditCardOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
            <DialogDescription>
              Customize card name and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="card-name">Card Display Name</Label>
              <Input
                id="card-name"
                value={editedCardName}
                onChange={(e) => setEditedCardName(e.target.value)}
                placeholder="Enter custom name to display on card"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="card-type">Card Type</Label>
              <Select
                value={editedCardType}
                onValueChange={(value: "visa" | "mastercard") => setEditedCardType(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">MasterCard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Card Preview */}
            <div className="mt-6">
              <Label>Card Preview</Label>
              <div className="mt-2 w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.5),rgba(0,0,0,0))]"></div>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between">
                    <div className="font-bold text-lg">NEXUS CARD</div>
                    <div className="font-bold">{editedCardType.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono my-2">{maskCardNumber(card.cardNumber)}</div>
                    <div className="text-xs uppercase font-bold">{editedCardName}</div>
                    <div className="text-xs">VALID THRU {card.expiryDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCardChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
