
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Chain } from "./WalletItem";

interface AddWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWallet: (wallet: any) => void;
}

export function AddWalletModal({ open, onOpenChange, onAddWallet }: AddWalletModalProps) {
  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [chain, setChain] = useState<Chain>("ethereum");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [includeRecoveryPhrase, setIncludeRecoveryPhrase] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      toast({
        title: "Missing information",
        description: "Please enter a wallet address",
        variant: "destructive",
      });
      return;
    }
    
    // Validate address format based on chain
    if (!isValidAddress(walletAddress, chain)) {
      toast({
        title: "Invalid address format",
        description: `Please enter a valid ${getChainName(chain)} address`,
        variant: "destructive",
      });
      return;
    }
    
    // Create a new wallet
    const newWallet = {
      id: `wallet-${Date.now()}`,
      address: walletAddress,
      chain,
      balance: {
        coin: getChainCoin(chain),
        amount: 0,
        usdValue: 0,
      },
      name: walletName || `${chain.charAt(0).toUpperCase() + chain.slice(1)} Wallet`,
      hasRecoveryPhrase: includeRecoveryPhrase && recoveryPhrase.length > 0,
      recoveryPhrase: includeRecoveryPhrase ? recoveryPhrase : undefined,
    };
    
    onAddWallet(newWallet);
    resetForm();
    
    toast({
      title: "Wallet added",
      description: "Your wallet has been successfully added",
    });
  };
  
  const isValidAddress = (address: string, chain: Chain): boolean => {
    // Basic validation patterns for different blockchains
    const patterns = {
      ethereum: /^0x[a-fA-F0-9]{40}$/,
      binance: /^0x[a-fA-F0-9]{40}$/,
      polygon: /^0x[a-fA-F0-9]{40}$/,
      solana: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    };
    
    return patterns[chain].test(address);
  };
  
  const getChainCoin = (chain: Chain): string => {
    switch (chain) {
      case "ethereum": return "ETH";
      case "binance": return "BNB";
      case "polygon": return "MATIC";
      case "solana": return "SOL";
      default: return "ETH";
    }
  };
  
  const getChainName = (chain: Chain): string => {
    switch (chain) {
      case "ethereum": return "Ethereum";
      case "binance": return "Binance Smart Chain";
      case "polygon": return "Polygon";
      case "solana": return "Solana";
      default: return "Ethereum";
    }
  };
  
  const resetForm = () => {
    setWalletName("");
    setWalletAddress("");
    setChain("ethereum");
    setRecoveryPhrase("");
    setIncludeRecoveryPhrase(false);
  };
  
  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
          <DialogDescription>
            Link a blockchain wallet to your account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="wallet-name">Wallet Name (Optional)</Label>
              <Input
                id="wallet-name"
                placeholder="My Ethereum Wallet"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="wallet-address" className="required">Wallet Address</Label>
              <Input
                id="wallet-address"
                placeholder={chain === "solana" ? "Enter Solana address" : "0x..."}
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="blockchain">Blockchain</Label>
              <Select value={chain} onValueChange={(value: Chain) => setChain(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="binance">Binance Smart Chain</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="include-recovery" 
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                checked={includeRecoveryPhrase}
                onChange={(e) => setIncludeRecoveryPhrase(e.target.checked)}
              />
              <Label htmlFor="include-recovery">Add recovery phrase for this wallet</Label>
            </div>
            
            {includeRecoveryPhrase && (
              <div className="grid gap-2">
                <Label htmlFor="recovery-phrase">Recovery Phrase</Label>
                <Textarea
                  id="recovery-phrase"
                  placeholder="Enter your 12/24 word recovery phrase"
                  rows={3}
                  value={recoveryPhrase}
                  onChange={(e) => setRecoveryPhrase(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This will be encrypted and stored securely
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="outline" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">Add Wallet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
