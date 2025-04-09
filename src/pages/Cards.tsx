
import React from "react";
import { CardList } from "@/components/cards/CardList";
import { CardType } from "@/components/cards/CardItem";
import { AddFundsModal } from "@/components/modals/AddFundsModal";
import { NewCardModal } from "@/components/modals/NewCardModal";
import { WalletType } from "@/components/wallets/WalletItem";
import { useToast } from "@/hooks/use-toast";

// Demo wallet data
const demoWallets: WalletType[] = [
  {
    id: "wallet-1",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    chain: "ethereum",
    balance: {
      coin: "ETH",
      amount: 1.245,
      usdValue: 3200.87,
    },
  },
  {
    id: "wallet-2",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    chain: "binance",
    balance: {
      coin: "BNB",
      amount: 5.78,
      usdValue: 1004.76,
    },
  },
];

const Cards = () => {
  const { toast } = useToast();
  const [isFundModalOpen, setIsFundModalOpen] = React.useState(false);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<CardType | undefined>();

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    toast({
      title: "Card selected",
      description: `Card ending in ${card.cardNumber.slice(-4)} selected`,
    });
  };

  const handleAddCard = () => {
    setIsNewCardModalOpen(true);
  };

  const handleAddFunds = (card: CardType) => {
    setSelectedCard(card);
    setIsFundModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Card Management</h1>
      
      <CardList
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
      />
      
      <AddFundsModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        card={selectedCard}
        wallets={demoWallets}
      />
      
      <NewCardModal
        isOpen={isNewCardModalOpen}
        onClose={() => setIsNewCardModalOpen(false)}
      />
    </div>
  );
};

export default Cards;
