
import React, { useState } from "react";
import { AlertCircle, Eye, EyeOff, Check } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WalletType } from "./WalletItem";
import { Separator } from "@/components/ui/separator";

interface WalletDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: (walletId: string) => void;
  wallet: WalletType | undefined;
}

export function WalletDetailsModal({ 
  isOpen, 
  onClose, 
  onRemove,
  wallet 
}: WalletDetailsModalProps) {
  const { toast } = useToast();
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  if (!wallet) return null;
  
  const mockRecoveryPhrase = wallet.recoveryPhrase || "apple banana cherry diamond elephant forest guitar house igloo jacket kite lemon";
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };
  
  const handleRemoveWallet = () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }
    
    onRemove(wallet.id);
    toast({
      title: "Wallet removed",
      description: "Your wallet has been successfully removed.",
    });
    setConfirmRemove(false);
    onClose();
  };
  
  const handleShowRecoveryPhrase = () => {
    setIsVerifying(true);
    
    // Mock verification process
    setTimeout(() => {
      setIsVerifying(false);
      setShowRecoveryPhrase(true);
    }, 1000);
  };
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chain: string) => {
    switch (chain) {
      case "ethereum": return "Ethereum";
      case "binance": return "Binance Smart Chain";
      case "polygon": return "Polygon";
      default: return chain;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Wallet Details</DialogTitle>
          <DialogDescription>
            {wallet.name || truncateAddress(wallet.address)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Blockchain</div>
              <div className="font-medium">{getChainName(wallet.chain)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="font-medium">
                {wallet.balance.amount} {wallet.balance.coin} (${wallet.balance.usdValue.toFixed(2)})
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Wallet Address</div>
            <div className="flex items-center justify-between">
              <div className="font-mono text-sm bg-muted p-2 rounded break-all">
                {wallet.address}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyAddress}>
                Copy
              </Button>
            </div>
          </div>
          
          {wallet.hasRecoveryPhrase && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Recovery Phrase</h3>
                
                {!showRecoveryPhrase ? (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleShowRecoveryPhrase}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      "Verifying..."
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Show Recovery Phrase
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-4 bg-muted rounded-md flex flex-wrap gap-2">
                      {mockRecoveryPhrase.split(" ").map((word, index) => (
                        <div key={index} className="bg-background rounded px-2 py-1 text-sm border">
                          {index + 1}. {word}
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setShowRecoveryPhrase(false)}
                    >
                      <EyeOff className="mr-2 h-4 w-4" />
                      Hide Recovery Phrase
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This recovery phrase can be used to restore your wallet on any device.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Danger Zone</AlertTitle>
            <AlertDescription className="flex flex-col space-y-2">
              <p>Removing this wallet will disconnect it from your account. This action cannot be undone.</p>
              {!confirmRemove ? (
                <Button 
                  variant="destructive" 
                  onClick={handleRemoveWallet}
                >
                  Remove Wallet
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="font-bold">Are you sure you want to remove this wallet?</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setConfirmRemove(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleRemoveWallet}
                      className="flex-1"
                    >
                      Yes, Remove Wallet
                    </Button>
                  </div>
                </div>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
