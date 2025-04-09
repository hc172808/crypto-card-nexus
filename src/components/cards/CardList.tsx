
import React from "react";
import { CardItem, CardType } from "./CardItem";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const demoCards: CardType[] = [
  {
    id: "card-1",
    cardNumber: "4111111111111111",
    expiryDate: "09/28",
    cardholderName: "JOHN DOE",
    cvv: "123",
    balance: 2345.67,
    type: "visa",
    status: "active",
  },
  {
    id: "card-2",
    cardNumber: "5555555555554444",
    expiryDate: "12/26",
    cardholderName: "JOHN DOE",
    cvv: "321",
    balance: 980.0,
    type: "mastercard",
    status: "frozen",
  },
];

interface CardListProps {
  onCardClick: (card: CardType) => void;
  onAddCard: () => void;
}

export function CardList({ onCardClick, onAddCard }: CardListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Virtual Cards</h2>
        <Button onClick={onAddCard} className="bg-nexus-500 hover:bg-nexus-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Card
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoCards.map((card) => (
          <CardItem key={card.id} card={card} onClick={onCardClick} />
        ))}
        
        <Button
          variant="outline"
          className="h-full min-h-[220px] border-dashed flex flex-col gap-2 hover:border-primary"
          onClick={onAddCard}
        >
          <PlusCircle className="h-10 w-10" />
          <span>Add New Card</span>
        </Button>
      </div>
    </div>
  );
}
