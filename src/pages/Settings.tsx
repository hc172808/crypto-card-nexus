import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, CreditCard, Key, Lock, Shield, User, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showChangePinDialog, setShowChangePinDialog] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const { toast } = useToast();
  
  const mockUser = {
    recoveryPhrase: "kernel zebra frost camel aware forest dune question lock chapter match arena",
    publicKey: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    hasPin: true,
  };
  
  const handlePinVerification = () => {
    if (currentPin.length >= 6) {
      setPinVerified(true);
      setShowPinDialog(false);
      toast({
        title: "PIN Verified",
        description: "You can now view your recovery phrase"
      });
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please enter a valid PIN (6-20 digits)",
        variant: "destructive"
      });
    }
  };
  
  const handleChangePin = () => {
    if (newPin.length < 6 || newPin.length > 20) {
      toast({
        title: "Invalid PIN Length",
        description: "PIN must be 6-20 digits long",
        variant: "destructive"
      });
      return;
    }
    
    if (newPin !== confirmPin) {
      toast({
        title: "PINs Don't Match",
        description: "New PIN and confirmation must match",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "PIN Updated",
      description: "Your security PIN has been successfully updated"
    });
    
    setShowChangePinDialog(false);
    setNewPin("");
    setConfirmPin("");
  };
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message
    });
  };
  
  const resetVerification = () => {
    setPinVerified(false);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-5 md:w-fit mb-6">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" /> Payment
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" /> API
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4 md:w-1/3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Update Image</Button>
                </div>
                
                <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Mailing Address</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="San Francisco" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="CA" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input id="zipCode" defaultValue="94103" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="United States" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Security PIN</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your security PIN is used to protect sensitive information and confirm important actions
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setShowChangePinDialog(true)}
                  >
                    <Lock className="h-4 w-4" />
                    {mockUser.hasPin ? "Change PIN" : "Set PIN"}
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Recovery Phrase</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your recovery phrase can be used to restore access to your wallets. Keep it secret and secure.
                  </p>
                  
                  {pinVerified ? (
                    <div className="space-y-4">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <p className="font-mono text-sm">{mockUser.recoveryPhrase}</p>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => copyToClipboard(mockUser.recoveryPhrase, "Recovery phrase copied to clipboard")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          Write this down and store it somewhere safe
                        </p>
                        <Button variant="outline" size="sm" onClick={resetVerification}>
                          Hide
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => setShowPinDialog(true)}
                    >
                      <Lock className="h-4 w-4" />
                      View Recovery Phrase
                    </Button>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Public Key</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your public key is your identity on the blockchain
                  </p>
                  
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-sm truncate">{mockUser.publicKey}</p>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(mockUser.publicKey, "Public key copied to clipboard")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications for Login</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for new sign-ins
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Biometric Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition to access the app
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transaction Security</CardTitle>
              <CardDescription>Set up transaction approval requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Require Password for Transactions</Label>
                  <p className="text-sm text-muted-foreground">
                    Require your password for all transactions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Large Transaction Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Require additional verification for transactions over $1000
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Email Notifications</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-transactions">Transaction Alerts</Label>
                    <Switch id="email-transactions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-offers">Special Offers</Label>
                    <Switch id="email-offers" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-security">Security Alerts</Label>
                    <Switch id="email-security" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newsletter">Monthly Newsletter</Label>
                    <Switch id="email-newsletter" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Push Notifications</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-transactions">Transaction Alerts</Label>
                    <Switch id="push-transactions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-security">Security Alerts</Label>
                    <Switch id="push-security" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-price">Price Alerts</Label>
                    <Switch id="push-price" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-news">News & Updates</Label>
                    <Switch id="push-news" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Payment settings will appear here after setting up your first card.</p>
                <Button className="mt-4">Set Up Card</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage your API keys for integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>API access requires KYC verification.</p>
                <Button className="mt-4">Verify Identity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Your PIN</DialogTitle>
            <DialogDescription>
              Please enter your security PIN to view your recovery phrase
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 space-y-4">
            <InputOTP maxLength={20} value={currentPin} onChange={setCurrentPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
              <p className="text-sm text-muted-foreground mt-2">Continue entering your PIN (6-20 digits)</p>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPinDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePinVerification}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showChangePinDialog} onOpenChange={setShowChangePinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mockUser.hasPin ? "Change" : "Set"} Your PIN</DialogTitle>
            <DialogDescription>
              {mockUser.hasPin 
                ? "Enter a new security PIN (6-20 digits)" 
                : "Create a security PIN to protect your account (6-20 digits)"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {mockUser.hasPin && (
              <div className="grid gap-2">
                <Label htmlFor="current-pin">Current PIN</Label>
                <Input 
                  id="current-pin"
                  type="password" 
                  placeholder="Enter your current PIN" 
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="new-pin">New PIN</Label>
              <Input 
                id="new-pin"
                type="password" 
                placeholder="Enter new PIN (6-20 digits)" 
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-pin">Confirm PIN</Label>
              <Input 
                id="confirm-pin"
                type="password" 
                placeholder="Confirm new PIN" 
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePinDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePin}>
              {mockUser.hasPin ? "Update PIN" : "Set PIN"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
