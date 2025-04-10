import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WalletItem, WalletType } from "@/components/wallets/WalletItem";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogDescriptionUI,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Plus, RefreshCw, Wallet as WalletIcon } from "lucide-react";

const walletsData: WalletType[] = [
  {
    id: "1",
    name: "Personal Wallet",
    address: "0xAb5801a7D398351b8bE11C439e05C5B3259cbCc7",
    chain: "ethereum",
    balance: {
      coin: "ETH",
      amount: 3.25,
      usdValue: 6500.00,
    },
    hasRecoveryPhrase: true,
    verified: true,
    isIdentityVerified: true,
  },
  {
    id: "2",
    address: "0x47e172F6CfB6c7D01C1574fa3E69739916f85E69",
    chain: "binance",
    balance: {
      coin: "BNB",
      amount: 15.50,
      usdValue: 4500.00,
    },
  },
  {
    id: "3",
    address: "0x593169B961d66198e29208Ca46f64D2B939A237E",
    chain: "polygon",
    balance: {
      coin: "MATIC",
      amount: 250.75,
      usdValue: 225.50,
    },
    hasRecoveryPhrase: true,
    verified: false,
    isIdentityVerified: false,
  },
  {
    id: "4",
    address: "0x6aB499Ac59ca51Be8e5D84A013981343264148E7",
    chain: "solana",
    balance: {
      coin: "SOL",
      amount: 8.12,
      usdValue: 1624.00,
    },
    verified: true,
    isIdentityVerified: true,
  },
];

const Wallets = () => {
  const { toast } = useToast();
  const [wallets, setWallets] = useState<WalletType[]>(walletsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newWalletChain, setNewWalletChain] = useState<string>("ethereum");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);

  const handleTransact = (wallet: WalletType) => {
    toast({
      title: "Initiate Transaction",
      description: `You are about to transact with wallet: ${wallet.address}`,
    });
  };

  const handleViewDetails = (wallet: WalletType) => {
    setSelectedWallet(wallet);
  };

  const handleCloseDetails = () => {
    setSelectedWallet(null);
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const addWallet = () => {
    setIsLoading(true);

    // Simulate adding a wallet
    setTimeout(() => {
      const newWallet: WalletType = {
        id: Date.now().toString(),
        address: newWalletAddress,
        chain: newWalletChain as WalletType["chain"],
        balance: {
          coin: "N/A",
          amount: 0,
          usdValue: 0,
        },
      };

      setWallets([...wallets, newWallet]);
      setIsModalOpen(false);
      setNewWalletAddress("");
      setIsLoading(false);

      toast({
        title: "Wallet Added",
        description: `Wallet ${newWalletAddress} added successfully.`,
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <WalletIcon className="h-7 w-7" />
          Wallets
        </h1>
        <p className="text-muted-foreground">
          Manage your cryptocurrency wallets and track balances
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={newWalletAddress}
                  onChange={(e) => setNewWalletAddress(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chain" className="text-right">
                  Chain
                </Label>
                <Select onValueChange={setNewWalletChain} defaultValue="ethereum">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addWallet} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Wallet"
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            onTransact={handleTransact}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedWallet && (
        <Dialog open={!!selectedWallet} onOpenChange={handleCloseDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Wallet Details</DialogTitle>
              <DialogDescriptionUI>
                Details for wallet: {selectedWallet.address}
              </DialogDescriptionUI>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Address:</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm">{selectedWallet.address}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyAddress(selectedWallet.address)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Chain:</p>
                <p className="text-sm">{selectedWallet.chain}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Balance:</p>
                <p className="text-sm">
                  {selectedWallet.balance.amount} {selectedWallet.balance.coin} (${selectedWallet.balance.usdValue.toFixed(2)})
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Recovery Phrase:</p>
                <p className="text-sm">
                  {selectedWallet.hasRecoveryPhrase ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Verification:</p>
                <p className="text-sm">
                  {selectedWallet.verified ? (
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">Verified</Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Identity Verification:</p>
                <p className="text-sm">
                  {selectedWallet.isIdentityVerified ? (
                    <Badge variant="success">Verified</Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Wallets;
