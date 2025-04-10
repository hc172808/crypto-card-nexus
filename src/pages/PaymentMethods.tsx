
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus, Trash2, Bank, CreditCardIcon, Banknote, CheckCircle, AlertCircle } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "crypto";
  name: string;
  lastDigits?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { 
      id: "1", 
      type: "card", 
      name: "Visa ending in 4242", 
      lastDigits: "4242", 
      expiryDate: "11/25", 
      isDefault: true 
    },
    { 
      id: "2", 
      type: "bank", 
      name: "Chase Bank", 
      lastDigits: "9876", 
      isDefault: false 
    },
  ]);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleAddCard = () => {
    // Validate the card details
    if (cardNumber.length < 16 || !cardName || !expiryDate || !cvc) {
      toast({
        title: "Invalid card details",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
    
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      name: `Card ending in ${lastFour}`,
      lastDigits: lastFour,
      expiryDate,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newCard]);
    
    // Reset form
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvc("");

    toast({
      title: "Card added",
      description: `Successfully added card ending in ${lastFour}.`,
    });
  };

  const handleAddBankAccount = () => {
    if (!bankName || !accountNumber || !routingNumber) {
      toast({
        title: "Invalid bank details",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    const lastFour = accountNumber.slice(-4);
    
    const newBank: PaymentMethod = {
      id: Date.now().toString(),
      type: "bank",
      name: `${bankName} account ending in ${lastFour}`,
      lastDigits: lastFour,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newBank]);
    
    // Reset form
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");

    toast({
      title: "Bank account added",
      description: `Successfully added ${bankName} account.`,
    });
  };

  const handleAddCryptoWallet = () => {
    if (!walletAddress) {
      toast({
        title: "Invalid wallet details",
        description: "Please enter a wallet address.",
        variant: "destructive",
      });
      return;
    }

    const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    
    const newWallet: PaymentMethod = {
      id: Date.now().toString(),
      type: "crypto",
      name: `Crypto wallet ${shortAddress}`,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newWallet]);
    
    // Reset form
    setWalletAddress("");

    toast({
      title: "Crypto wallet added",
      description: "Successfully added crypto wallet.",
    });
  };

  const removePaymentMethod = (id: string) => {
    const method = paymentMethods.find(m => m.id === id);
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: `Successfully removed ${method?.name}.`,
    });
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );

    const method = paymentMethods.find(m => m.id === id);
    
    toast({
      title: "Default payment method updated",
      description: `${method?.name} is now your default payment method.`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CreditCard className="h-7 w-7" />
          Payment Methods
        </h1>
        <p className="text-muted-foreground">
          Manage your payment methods for transactions and subscriptions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>
                Cards, bank accounts, and wallets you've added to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {method.type === "card" && <CreditCardIcon className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full" />}
                        {method.type === "bank" && <Bank className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full" />}
                        {method.type === "crypto" && <Banknote className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full" />}
                        
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {method.name}
                            {method.isDefault && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Default
                              </span>
                            )}
                          </div>
                          
                          {method.type === "card" && method.expiryDate && (
                            <div className="text-sm text-muted-foreground">
                              Expires {method.expiryDate}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDefaultPaymentMethod(method.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removePaymentMethod(method.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-muted/30 rounded-lg border border-dashed">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No payment methods added yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
              <CardDescription>
                Add a new card, bank account, or crypto wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs defaultValue="card" className="mt-4">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration (MM/YY)</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/\D/g, '');
                              if (value.length > 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                              }
                              setExpiryDate(value);
                            }}
                            maxLength={5}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                            maxLength={3}
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleAddCard} className="w-full">
                        Add Card
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="bank" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          placeholder="Bank of America"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          placeholder="123456789"
                          value={routingNumber}
                          onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="123456789012"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                      
                      <Button onClick={handleAddBankAccount} className="w-full">
                        Add Bank Account
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="crypto" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="walletAddress">Wallet Address</Label>
                        <Input
                          id="walletAddress"
                          placeholder="0x1234abcd..."
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={handleAddCryptoWallet} className="w-full">
                        Add Crypto Wallet
                      </Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
