
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, QrCode, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type WalletProvider = "metamask" | "walletconnect" | "coinbase" | "trust" | "phantom";

interface WalletConnectProps {
  onConnect: (provider: WalletProvider) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Your Wallet
        </CardTitle>
        <CardDescription>
          Link your crypto wallet to fund your virtual cards and manage your assets.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-4">
        <div className="bg-muted p-6 rounded-xl border border-border">
          <QrCode size={150} className="text-primary" />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Scan with your wallet app to connect,
          <br /> or select a provider below
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full relative overflow-hidden bg-[#F6851B] hover:bg-[#E2761B] text-white"
          onClick={() => onConnect("metamask")}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            className="h-5 w-5 mr-2" 
            alt="MetaMask"
          />
          Connect with MetaMask
        </Button>
        <Button
          className="w-full bg-[#3375BB] hover:bg-[#2A65A7] text-white"
          onClick={() => onConnect("trust")}
        >
          <img 
            src="https://trustwallet.com/assets/images/favicon.png"
            className="h-5 w-5 mr-2" 
            alt="Trust Wallet"
          />
          Connect with Trust Wallet
        </Button>
        <Button
          className="w-full bg-[#AB9FF2] hover:bg-[#9D8FE3] text-white"
          onClick={() => onConnect("phantom")}
        >
          <img 
            src="https://phantom.app/favicon.ico"
            className="h-5 w-5 mr-2" 
            alt="Phantom"
          />
          Connect with Phantom (Solana)
        </Button>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => onConnect("walletconnect")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Connect with WalletConnect
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onConnect("coinbase")}
        >
          Connect with Coinbase
        </Button>
      </CardFooter>
    </Card>
  );
}
