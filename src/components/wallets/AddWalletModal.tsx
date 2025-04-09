
import React, { useState } from "react";
import { X, AlertCircle, Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWallet: (walletData: any) => void;
}

export function AddWalletModal({ isOpen, onClose, onAddWallet }: AddWalletModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("connect");
  const [address, setAddress] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [walletName, setWalletName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPhrase, setGeneratedPhrase] = useState("");
  const [phraseConfirmed, setPhraseConfirmed] = useState(false);

  // Generate a mock recovery phrase (in real life, this would be done securely)
  const generateRecoveryPhrase = () => {
    const mockWords = [
      "apple", "banana", "cherry", "diamond", "elephant", "forest", 
      "guitar", "house", "igloo", "jacket", "kite", "lemon"
    ];
    const selectedWords = [];
    
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * mockWords.length);
      selectedWords.push(mockWords[randomIndex]);
    }
    
    return selectedWords.join(" ");
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Mock connection, in a real app this would connect to an actual wallet
      setTimeout(() => {
        const newWallet = {
          id: `wallet-${Date.now()}`,
          address: address || "0x" + Math.random().toString(16).substring(2, 42),
          chain: "ethereum",
          balance: {
            coin: "ETH",
            amount: 0.5 + Math.random() * 2,
            usdValue: 1000 + Math.random() * 2000,
          },
          name: walletName || "My Wallet",
          hasRecoveryPhrase: !!recoveryPhrase,
        };
        
        onAddWallet(newWallet);
        toast({
          title: "Wallet connected",
          description: "Your wallet has been successfully connected.",
        });
        resetForm();
        onClose();
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "There was an error connecting your wallet.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    const phrase = generateRecoveryPhrase();
    setGeneratedPhrase(phrase);
  };

  const handleConfirmPhrase = () => {
    setPhraseConfirmed(true);
  };

  const handleCopyPhrase = () => {
    navigator.clipboard.writeText(generatedPhrase);
    toast({
      title: "Recovery phrase copied",
      description: "Store this phrase in a secure location.",
    });
  };

  const handleCreateWallet = () => {
    if (!phraseConfirmed) {
      toast({
        variant: "destructive",
        title: "Confirm recovery phrase",
        description: "You must confirm you've saved the recovery phrase.",
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const newWallet = {
        id: `wallet-${Date.now()}`,
        address: "0x" + Math.random().toString(16).substring(2, 42),
        chain: "ethereum",
        balance: {
          coin: "ETH",
          amount: 0,
          usdValue: 0,
        },
        name: walletName || "New Wallet",
        hasRecoveryPhrase: true,
        recoveryPhrase: generatedPhrase,
      };
      
      onAddWallet(newWallet);
      toast({
        title: "Wallet created",
        description: "Your new wallet has been successfully created.",
      });
      resetForm();
      onClose();
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setAddress("");
    setRecoveryPhrase("");
    setWalletName("");
    setGeneratedPhrase("");
    setPhraseConfirmed(false);
    setActiveTab("connect");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription>
            Connect an existing wallet or create a new one to use with your account.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="connect">Connect Wallet</TabsTrigger>
            <TabsTrigger value="create">Create New Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connect" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="wallet-name" className="text-sm font-medium">
                  Wallet Name (Optional)
                </label>
                <Input
                  id="wallet-name"
                  placeholder="My Main Wallet"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="wallet-address" className="text-sm font-medium">
                  Wallet Address
                </label>
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="recovery-phrase" className="text-sm font-medium">
                  Recovery Phrase (Optional but recommended)
                </label>
                <Textarea
                  id="recovery-phrase"
                  placeholder="Enter your 12 or 24 word recovery phrase"
                  value={recoveryPhrase}
                  onChange={(e) => setRecoveryPhrase(e.target.value)}
                  className="h-20"
                />
                <p className="text-xs text-muted-foreground">
                  This is stored encrypted and allows you to recover your wallet if needed.
                </p>
              </div>
            </div>
            
            <Alert variant="outline" className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Security Notice</AlertTitle>
              <AlertDescription className="text-amber-700">
                Only enter your recovery phrase if you're on a secure device. Never share your recovery phrase with anyone.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="new-wallet-name" className="text-sm font-medium">
                  Wallet Name (Optional)
                </label>
                <Input
                  id="new-wallet-name"
                  placeholder="My New Wallet"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
              </div>
              
              {!generatedPhrase ? (
                <Button 
                  onClick={handleCreate} 
                  className="w-full bg-nexus-500 hover:bg-nexus-600"
                >
                  Generate New Wallet
                </Button>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Recovery Phrase</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2" 
                        onClick={handleCopyPhrase}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <div className="p-4 bg-muted rounded-md relative flex flex-wrap gap-2">
                      {generatedPhrase.split(" ").map((word, index) => (
                        <div key={index} className="bg-background rounded px-2 py-1 text-sm border">
                          {index + 1}. {word}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Write down or copy this phrase and keep it in a secure location. You will need it to recover your wallet.
                    </p>
                  </div>
                  
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important!</AlertTitle>
                    <AlertDescription>
                      This recovery phrase is the only way to recover your wallet if you lose access. Nexus cannot help you recover it.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="confirm-phrase"
                      checked={phraseConfirmed}
                      onChange={() => setPhraseConfirmed(!phraseConfirmed)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <label htmlFor="confirm-phrase" className="text-sm">
                      I have safely stored my recovery phrase
                    </label>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === "connect" ? (
            <Button onClick={handleConnect} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            generatedPhrase && (
              <Button 
                onClick={handleCreateWallet} 
                disabled={isLoading || !phraseConfirmed}
                className="bg-nexus-500 hover:bg-nexus-600"
              >
                {isLoading ? "Creating..." : "Create Wallet"}
              </Button>
            )
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
