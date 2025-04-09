
import React from "react";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { BalanceOverview } from "@/components/dashboard/BalanceOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionModal, TransactionType } from "@/components/modals/TransactionModal";

const Index = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<TransactionType | undefined>();

  const handleTransactionClick = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <WelcomeCard />
      
      <div className="pt-4">
        <BalanceOverview />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions />
      </div>
      
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Index;
