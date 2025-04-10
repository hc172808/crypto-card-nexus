
import React, { useState, useEffect } from "react";
import { Grid2X2, Plus, Wallet, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect, WalletProvider } from "@/components/wallets/WalletConnect";
import { WalletItem, WalletType } from "@/components/wallets/WalletItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddFundsModal } from "@/components/modals/AddFundsModal";
import { CardType } from "@/components/cards/CardItem";
import { useToast } from "@/hooks/use-toast";
import { AddWalletModal } from "@/components/wallets/AddWalletModal";
import { WalletDetailsModal } from "@/components/wallets/WalletDetailsModal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

// Demo wallet data with recovery phrases
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
    name: "My Ethereum Wallet",
    hasRecoveryPhrase: true,
    verified: true,
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
    hasRecoveryPhrase: false,
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
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = React.useState(false);
  const [isWalletDetailsModalOpen, setIsWalletDetailsModalOpen] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = React.useState<WalletType | undefined>();
  const [isIdVerificationOpen, setIsIdVerificationOpen] = useState(false);
  const hasWallets = wallets.length > 0;
  
  const idVerificationForm = useForm({
    defaultValues: {
      fullName: "",
      idType: "",
      idNumber: "",
      idFile: "",
    }
  });

  const handleConnect = (provider: WalletProvider) => {
    toast({
      title: "Connecting wallet",
      description: `Connecting to ${provider}...`,
    });
    setIsAddWalletModalOpen(true);
  };

  const handleTransact = (wallet: WalletType) => {
    setSelectedWallet(wallet);
    setIsFundModalOpen(true);
  };
  
  const handleAddWallet = (walletData: WalletType) => {
    setWallets((prev) => [...prev, walletData]);
    
    toast({
      title: "Wallet added",
      description: "Your wallet has been successfully added to your account",
    });
  };
  
  const handleRemoveWallet = (walletId: string) => {
    setWallets((prev) => prev.filter(wallet => wallet.id !== walletId));
  };
  
  const handleViewWalletDetails = (wallet: WalletType) => {
    setSelectedWallet(wallet);
    setIsWalletDetailsModalOpen(true);
  };
  
  const handleAutoCreateWallet = () => {
    // Generate a random Ethereum address
    const randomAddress = "0x" + Array.from({length: 40}, () => 
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join('');
    
    const newWallet: WalletType = {
      id: `wallet-auto-${Date.now()}`,
      address: randomAddress,
      chain: "ethereum",
      balance: {
        coin: "ETH",
        amount: 0,
        usdValue: 0,
      },
      name: "My Auto-Created Wallet",
      hasRecoveryPhrase: true,
      recoveryPhrase: "auto generate twelve words for recovery phrase security backup wallet access",
      verified: true,
    };
    
    setWallets((prev) => [...prev, newWallet]);
    
    toast({
      title: "Wallet created",
      description: "Your new wallet has been automatically created",
      variant: "success",
    });
  };
  
  const handleIdVerification = () => {
    setIsIdVerificationOpen(false);
    
    // Update the currently selected wallet with ID verification
    if (selectedWallet) {
      const updatedWallets = wallets.map(wallet => 
        wallet.id === selectedWallet.id ? { ...wallet, isIdentityVerified: true } : wallet
      );
      setWallets(updatedWallets);
    }
    
    toast({
      title: "ID Verification submitted",
      description: "Your identity verification is being processed",
    });
  };

  useEffect(() => {
    // Check if user has no wallets after first render
    if (!localStorage.getItem("wallets-initialized") && wallets.length === 0) {
      localStorage.setItem("wallets-initialized", "true");
      handleAutoCreateWallet();
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wallet Management</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAutoCreateWallet}>
            <Plus className="mr-2 h-4 w-4" />
            Auto-Create Wallet
          </Button>
          <Button onClick={() => setIsAddWalletModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Connect Your Wallet
          </Button>
        </div>
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
                  
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">With Recovery Phrase</div>
                    <div className="text-2xl font-bold">
                      {wallets.filter(w => w.hasRecoveryPhrase).length}/{wallets.length}
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground">ID Verified</div>
                    <div className="text-2xl font-bold">
                      {wallets.filter(w => w.isIdentityVerified).length}/{wallets.length}
                    </div>
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
                      onViewDetails={handleViewWalletDetails}
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
                  onViewDetails={handleViewWalletDetails}
                />
              ))}
              
              <div className="border-2 border-dashed rounded-lg flex items-center justify-center p-6 h-full">
                <Button 
                  variant="outline" 
                  className="flex flex-col gap-2 h-auto py-8"
                  onClick={() => setIsAddWalletModalOpen(true)}
                >
                  <Plus className="h-10 w-10" />
                  <span>Connect Your Wallet</span>
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
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Secure your assets with recovery phrases
              </li>
            </ul>
            
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAutoCreateWallet} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Auto-Create Wallet
              </Button>
              <Button onClick={() => setIsAddWalletModalOpen(true)}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Existing Wallet
              </Button>
            </div>
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
      
      <AddWalletModal
        open={isAddWalletModalOpen}
        onOpenChange={setIsAddWalletModalOpen}
        onAddWallet={handleAddWallet}
      />
      
      <WalletDetailsModal
        isOpen={isWalletDetailsModalOpen}
        onClose={() => setIsWalletDetailsModalOpen(false)}
        onRemove={handleRemoveWallet}
        wallet={selectedWallet}
        onVerifyIdentity={() => {
          setIsWalletDetailsModalOpen(false);
          setIsIdVerificationOpen(true);
        }}
      />
      
      <Drawer open={isIdVerificationOpen} onOpenChange={setIsIdVerificationOpen}>
        <DrawerContent className="p-6 max-h-[85vh]">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Verify Your Identity
            </h2>
            
            <p className="text-muted-foreground mb-6">
              To comply with regulations and secure your wallet, please provide identity verification.
            </p>
            
            <Form {...idVerificationForm}>
              <form onSubmit={idVerificationForm.handleSubmit(handleIdVerification)} className="space-y-4">
                <FormField
                  control={idVerificationForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Legal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={idVerificationForm.control}
                  name="idType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Passport, Driver's License, National ID" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={idVerificationForm.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ID Number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={idVerificationForm.control}
                  name="idFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload ID Document</FormLabel>
                      <FormControl>
                        <Input type="file" className="cursor-pointer" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Submit Verification
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Wallets;
