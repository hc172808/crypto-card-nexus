
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  UserCog,
  Shield,
  CreditCard,
  Bell,
  KeyRound,
  Eye,
  EyeOff,
  Smartphone,
  RefreshCcw,
  ChevronRight,
  Copy,
  Lock,
  Apple,
  Save,
  Check,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PinModal } from "@/components/PinModal";
import { AppDownloadModal } from "@/components/mobile/AppDownloadModal";
import ProfileLogo from "@/components/settings/ProfileLogo";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { toast } = useToast();
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  const [smsAuthEnabled, setSmsAuthEnabled] = useState(false);
  const [appAuthEnabled, setAppAuthEnabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001"
  });

  const mockRecoveryPhrase = "shock friend hazard speed slim obvious brave token worry find shoe ocean";
  const mockPublicKey = "0x3a54f5c2d78b174b13b48b7f6d244eef1c15a5b9";

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description,
    });
  };

  const verifyPin = () => {
    setShowRecoveryPhrase(true);
    toast({
      title: "PIN Verified",
      description: "You can now view your recovery phrase",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Success",
      description: "Your profile has been updated successfully",
    });
  };

  const handleApplyChanges = (section: string) => {
    toast({
      title: "Changes Applied",
      description: `Your ${section} settings have been updated`,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const toggleSmsAuth = () => {
    setSmsAuthEnabled(!smsAuthEnabled);
    if (!smsAuthEnabled) {
      toast({
        title: "SMS Authentication Enabled",
        description: "You'll now receive verification codes via SMS",
      });
    } else {
      toast({
        title: "SMS Authentication Disabled",
        description: "SMS verification has been turned off",
      });
    }
  };

  const toggleAppAuth = () => {
    setAppAuthEnabled(!appAuthEnabled);
    if (!appAuthEnabled) {
      toast({
        title: "App Authentication Enabled",
        description: "You'll now use an authenticator app for verification",
      });
    } else {
      toast({
        title: "App Authentication Disabled",
        description: "App verification has been turned off",
      });
    }
  };

  const handleDirectApkDownload = () => {
    toast({
      title: "Download Started",
      description: "Your APK download has started",
    });
    // In a real app, this would trigger the download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your APK has been downloaded successfully",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="mobile">Mobile App</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={formData.address}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={formData.city}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        value={formData.state}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input 
                        id="zip" 
                        value={formData.zip}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <div className="space-x-2">
                    <Button variant="secondary" onClick={() => handleApplyChanges("profile")}>
                      <Check className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                    <Button onClick={handleSaveChanges}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <ProfileLogo />
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Public Key</CardTitle>
                    <CardDescription>
                      Your blockchain wallet address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          className="font-mono pr-10"
                          readOnly
                          value={showPublicKey ? mockPublicKey : "••••••••••••••••••••••••••••••••"}
                        />
                        <button
                          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPublicKey(!showPublicKey)}
                        >
                          {showPublicKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          copyToClipboard(mockPublicKey, "Public key copied to clipboard")
                        }
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Public Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5" />
                      Recovery Phrase
                    </CardTitle>
                    <CardDescription>
                      Your wallet recovery phrase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {showRecoveryPhrase ? (
                        <div className="bg-muted p-3 rounded-md">
                          <p className="font-mono text-sm break-all">{mockRecoveryPhrase}</p>
                        </div>
                      ) : (
                        <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                          <p className="font-mono text-sm">••••••• ••••• ••••••</p>
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <Button
                        className="w-full"
                        onClick={() => setIsPinModalOpen(true)}
                        disabled={showRecoveryPhrase}
                      >
                        {showRecoveryPhrase ? "Recovery Phrase Revealed" : "View Recovery Phrase"}
                      </Button>
                      {showRecoveryPhrase && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            copyToClipboard(mockRecoveryPhrase, "Recovery phrase copied to clipboard")
                          }
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Recovery Phrase
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Keep your recovery phrase in a safe place. It provides access to your wallet.
                        Never share it with anyone.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Login PIN
                </CardTitle>
                <CardDescription>
                  Manage your login PIN
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm">
                    Your PIN is required to log in to your account and view sensitive information.
                    Make sure to use a PIN that is between 6-20 digits long and that you can remember.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsChangePinModalOpen(true)}>
                  Change PIN
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive code via text message
                    </p>
                  </div>
                  <Switch
                    checked={smsAuthEnabled}
                    onCheckedChange={toggleSmsAuth}
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use Google Authenticator or similar
                    </p>
                  </div>
                  <Switch
                    checked={appAuthEnabled}
                    onCheckedChange={toggleAppAuth}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleApplyChanges("security")}>
                  <Check className="h-4 w-4 mr-2" />
                  Apply Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>
                  Manage your active sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="text-sm font-medium">Current Session</p>
                    <p className="text-xs text-muted-foreground">
                      Chrome on Windows • New York, USA
                    </p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="text-sm font-medium">Mobile App</p>
                    <p className="text-xs text-muted-foreground">
                      iPhone 13 • Last active: 2 hours ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Logout from All Devices</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>
                  Recent login activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Today, 10:42 AM</p>
                      <p className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</p>
                    </div>
                    <Badge className="bg-green-500">Success</Badge>
                  </div>
                  
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Yesterday, 6:30 PM</p>
                      <p className="text-xs text-muted-foreground">Mobile App • New York, USA</p>
                    </div>
                    <Badge className="bg-green-500">Success</Badge>
                  </div>
                  
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="text-sm font-medium">May 15, 2023, 8:15 AM</p>
                      <p className="text-xs text-muted-foreground">Chrome on Mac • Boston, USA</p>
                    </div>
                    <Badge variant="destructive">Failed</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full History</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card Preferences
              </CardTitle>
              <CardDescription>
                Manage your card settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Default Card</div>
                <select className="w-full p-2 border rounded-md">
                  <option>Virtual Card ending in 3456</option>
                  <option>Physical Card ending in 7890</option>
                </select>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Transaction Notifications</div>
                <div className="flex items-center gap-2 mb-2">
                  <Switch id="all-transactions" defaultChecked />
                  <label htmlFor="all-transactions" className="text-sm">Notify for all transactions</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="large-transactions" defaultChecked />
                  <label htmlFor="large-transactions" className="text-sm">Notify only for transactions over $100</label>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Automatic Top-up</div>
                <div className="flex items-center gap-2">
                  <Switch id="auto-topup" />
                  <label htmlFor="auto-topup" className="text-sm">Enable automatic top-up from wallet</label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleApplyChanges("card preferences")}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Transaction Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive emails for card transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Login attempts, password changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Crypto Price Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified of significant price changes</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Mobile App Notifications</p>
                      <p className="text-sm text-muted-foreground">Enable push notifications on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Card Usage Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts when your card is used</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleApplyChanges("notification")}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mobile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile App
                </CardTitle>
                <CardDescription>
                  Manage the Crypto Card Nexus mobile app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center p-4">
                  <Smartphone className="h-16 w-16 mb-4 text-primary" />
                  <h3 className="text-lg font-medium">Download the Mobile App</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access your cards, wallets, and transactions on the go with our mobile app
                  </p>
                  <Button onClick={() => setIsAppDownloadModalOpen(true)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Mobile App
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>
                  Manage devices linked to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">iPhone 13 Pro</p>
                        <p className="text-xs text-muted-foreground">iOS 16.2 • Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Disconnect</Button>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Samsung Galaxy S22</p>
                        <p className="text-xs text-muted-foreground">Android 13 • Last active: 5 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Disconnect</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh Devices
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Mobile Features</CardTitle>
              <CardDescription>
                Features available in the mobile app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">Biometric Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Secure login with fingerprint or Face ID
                    </p>
                    <p className="flex items-center text-xs text-primary">
                      Learn more
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Real-time alerts for transactions
                    </p>
                    <p className="flex items-center text-xs text-primary">
                      Learn more
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">Wallet Connect</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect to blockchain wallets
                    </p>
                    <p className="flex items-center text-xs text-primary">
                      Learn more
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PinModal 
        open={isPinModalOpen} 
        onOpenChange={setIsPinModalOpen} 
        onSuccess={verifyPin}
        isNewPin={false}
      />
      
      <PinModal 
        open={isChangePinModalOpen} 
        onOpenChange={setIsChangePinModalOpen} 
        onSuccess={() => {
          toast({
            title: "PIN Changed",
            description: "Your PIN has been updated successfully",
          });
        }}
        isNewPin={true}
      />
      
      <AppDownloadModal
        open={isAppDownloadModalOpen}
        onOpenChange={setIsAppDownloadModalOpen}
      />
    </div>
  );
};

export default Settings;
