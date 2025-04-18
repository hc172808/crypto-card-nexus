
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Copy, ExternalLink, Key, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Chain = "ethereum" | "binance" | "polygon" | "solana";

export type WalletType = {
  id: string;
  address: string;
  chain: Chain;
  balance: {
    coin: string;
    amount: number;
    usdValue: number;
  };
  name?: string;
  hasRecoveryPhrase?: boolean;
  recoveryPhrase?: string;
  verified?: boolean;
  isIdentityVerified?: boolean;
};

interface WalletItemProps {
  wallet: WalletType;
  onTransact: (wallet: WalletType) => void;
  onViewDetails: (wallet: WalletType) => void;
}

const getChainDetails = (chain: Chain) => {
  switch (chain) {
    case "ethereum":
      return { name: "Ethereum", logo: "🔷", explorer: "https://etherscan.io/address/" };
    case "binance":
      return { name: "Binance Smart Chain", logo: "🟡", explorer: "https://bscscan.com/address/" };
    case "polygon":
      return { name: "Polygon", logo: "🟣", explorer: "https://polygonscan.com/address/" };
    case "solana":
      return { name: "Solana", logo: "🟪", explorer: "https://solscan.io/account/" };
  }
};

export function WalletItem({ wallet, onTransact, onViewDetails }: WalletItemProps) {
  const { toast } = useToast();
  
  const chainDetails = getChainDetails(wallet.chain);

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">{chainDetails.logo}</span>
            <div className="font-medium">{wallet.name || chainDetails.name}</div>
            {wallet.hasRecoveryPhrase && <Key size={12} className="text-green-500" />}
            {wallet.verified && <Shield size={12} className="text-blue-500" />}
            {wallet.isIdentityVerified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">ID Verified</span>
            )}
          </div>
          <div 
            className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={copyAddress}
          >
            <span>{truncateAddress(wallet.address)}</span>
            <Copy size={14} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Balance</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">
                {wallet.balance.amount} {wallet.balance.coin}
              </div>
              <div className="text-muted-foreground">
                ${wallet.balance.usdValue.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-nexus-500 hover:bg-nexus-600" 
              onClick={() => onTransact(wallet)}
            >
              Fund Card
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onViewDetails(wallet)}
            >
              <Key className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open(`${chainDetails.explorer}${wallet.address}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
