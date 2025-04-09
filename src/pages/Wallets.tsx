
import React from "react";
import { Grid2X2, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect, WalletProvider } from "@/components/wallets/WalletConnect";
import { WalletItem, WalletType } from "@/components/wallets/WalletItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddFundsModal } from "@/components/modals/AddFundsModal";
import { CardType } from "@/components/cards/CardItem";
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

// Demo card data
const demoCard: CardType = {
  id: "card-1",
  cardNumber: "4111111111111111",
  expiryDate: "09/28",
  cardholderName: "JOHN DOE",
  cvv: "123",
  balance: 2345.67,
  type: "visa",
  status: "active",
};

const Wallets = () => {
  const { toast } = useToast();
  const [wallets, setWallets] = React.useState<WalletType[]>(demoWallets);
  const [isFundModalOpen, setIsFundModalOpen] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = React.useState<WalletType | undefined>();
  const hasWallets = wallets.length > 0;

  const handleConnect = (provider: WalletProvider) => {
    toast({
      title: "Connecting wallet",
      description: `Connecting to ${provider}...`,
    });
  };

  const handleTransact = (wallet: WalletType) => {
    setSelectedWallet(wallet);
    setIsFundModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wallet Management</h1>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Connect New Wallet
        </Button>
      </div>

      {hasWallets ? (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <Grid2X2 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="wallets">
              <Wallet className="h-4 w-4 mr-2" />
              Your Wallets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid gap-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Total Balance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Total USD Value</div>
                    <div className="text-2xl font-bold">
                      $
                      {wallets
                        .reduce((total, wallet) => total + wallet.balance.usdValue, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">Connected Wallets</div>
                    <div className="text-2xl font-bold">{wallets.length}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Your Wallets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wallets.map((wallet) => (
                    <WalletItem
                      key={wallet.id}
                      wallet={wallet}
                      onTransact={handleTransact}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wallets" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <WalletItem
                  key={wallet.id}
                  wallet={wallet}
                  onTransact={handleTransact}
                />
              ))}
              
              <div className="border-2 border-dashed rounded-lg flex items-center justify-center p-6 h-full">
                <Button variant="outline" className="flex flex-col gap-2 h-auto py-8">
                  <Plus className="h-10 w-10" />
                  <span>Connect New Wallet</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Connect Your First Wallet</h2>
            <p className="text-muted-foreground">
              Link your crypto wallet to fund your virtual cards directly from your crypto assets.
              We support multiple blockchain networks and wallets.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Connect MetaMask, WalletConnect, or other providers
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Fund cards directly from your crypto assets
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Monitor your balances across multiple chains
              </li>
            </ul>
          </div>
          
          <WalletConnect onConnect={handleConnect} />
        </div>
      )}
      
      <AddFundsModal
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
        card={demoCard}
        wallets={wallets}
      />
    </div>
  );
};

export default Wallets;
