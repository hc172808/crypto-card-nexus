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
import { MobileCapacitorSetup } from "@/components/mobile/MobileCapacitorSetup";
import { AppDownloadModal } from "@/components/mobile/AppDownloadModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smartphone, Download, Apple, Info, Users, History, Laptop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MobileApps = () => {
  const { toast } = useToast();
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false);
  const [isTestersDialogOpen, setIsTestersDialogOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isVirtualTestingOpen, setIsVirtualTestingOpen] = useState(false);

  const handleAppStoreClick = () => {
    window.open("https://apps.apple.com/app/crypto-card-nexus", "_blank");
    toast({
      title: "Opening App Store",
      description: "Redirecting to the iOS App Store"
    });
  };

  const handlePlayStoreClick = () => {
    window.open("https://play.google.com/store/apps/details?id=app.lovable.cryptocardnexus", "_blank");
    toast({
      title: "Opening Play Store",
      description: "Redirecting to Google Play Store"
    });
  };

  const handleDirectAPKDownload = () => {
    toast({
      title: "Download Started",
      description: "Your Direct APK download has started"
    });
    
    // Simulate download completion after a delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "APK file downloaded successfully"
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Smartphone className="h-7 w-7" />
          Mobile Applications
        </h1>
        <p className="text-muted-foreground">
          Download, configure and manage mobile applications for iOS and Android
        </p>
      </div>

      <div className="bg-muted/40 border rounded-md p-4 mb-8 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Mobile Apps Overview</p>
          <p className="text-sm text-muted-foreground mt-1">
            The Crypto Card Nexus mobile apps allow your users to manage their cards, wallets, and 
            transactions on the go. You can distribute these apps to your users after they register, 
            or make them available through app stores.
          </p>
        </div>
      </div>

      <Tabs defaultValue="download">
        <TabsList className="mb-4">
          <TabsTrigger value="download">Download Apps</TabsTrigger>
          <TabsTrigger value="management">App Management</TabsTrigger>
          <TabsTrigger value="developer">Developer Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="download">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  iOS Application
                </CardTitle>
                <CardDescription>
                  Native iOS app for iPhone and iPad
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="flex flex-col items-center">
                  <div className="mb-6 bg-muted p-4 rounded-xl border border-border">
                    <img 
                      src="https://chart.googleapis.com/chart?cht=qr&chl=https://cryptocard.nexus/ios&chs=200x200" 
                      alt="iOS App QR Code"
                      className="w-[150px] h-[150px]"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Scan with your iPhone camera to download<br />or use the button below
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAppStoreClick}>
                  <Apple className="h-4 w-4 mr-2" />
                  Download iOS App
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Android Application
                </CardTitle>
                <CardDescription>
                  Native Android app for phones and tablets
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="flex flex-col items-center">
                  <div className="mb-6 bg-muted p-4 rounded-xl border border-border">
                    <img 
                      src="https://chart.googleapis.com/chart?cht=qr&chl=https://cryptocard.nexus/android&chs=200x200" 
                      alt="Android App QR Code"
                      className="w-[150px] h-[150px]"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Scan with your Android device to download<br />or use the buttons below
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={handlePlayStoreClick}>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Play Store
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsAppDownloadModalOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Direct APK Download
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Key features available in the Crypto Card Nexus mobile apps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Card Management</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• View virtual and physical cards</li>
                    <li>• Freeze/unfreeze cards</li>
                    <li>• View PIN and card details</li>
                    <li>• Track delivery status</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Wallet Integration</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Connect crypto wallets</li>
                    <li>• View wallet balances</li>
                    <li>• Transfer funds between wallets</li>
                    <li>• Fund cards from wallets</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Security</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Biometric authentication</li>
                    <li>• PIN protection</li>
                    <li>• Push notifications for transactions</li>
                    <li>• Activity monitoring</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Transactions</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• View transaction history</li>
                    <li>• Filter and search transactions</li>
                    <li>• Export transaction data</li>
                    <li>• Spending analytics</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">KYC & Support</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Complete KYC verification</li>
                    <li>• In-app customer support</li>
                    <li>• Document upload</li>
                    <li>• FAQ and help center</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Payment Methods</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Apple Pay / Google Pay</li>
                    <li>• QR code payments</li>
                    <li>• Card tokenization</li>
                    <li>• Contactless payments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="management">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  App Testers
                </CardTitle>
                <CardDescription>
                  Manage testers for your mobile applications
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex flex-col justify-center items-center text-center">
                <p className="text-muted-foreground mb-6">
                  Add and manage users who can test your app before public release
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setIsTestersDialogOpen(true)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Testers
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  App Versions
                </CardTitle>
                <CardDescription>
                  Review and manage app version history
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex flex-col justify-center items-center text-center">
                <p className="text-muted-foreground mb-6">
                  Track changes, updates and releases across different versions
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => setIsVersionHistoryOpen(true)}
                >
                  <History className="h-4 w-4 mr-2" />
                  Version History
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Virtual Testing
                </CardTitle>
                <CardDescription>
                  Test your app on virtual devices
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex flex-col justify-center items-center text-center">
                <p className="text-muted-foreground mb-6">
                  Preview and test the app on virtual iOS and Android devices
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => setIsVirtualTestingOpen(true)}
                >
                  <Laptop className="h-4 w-4 mr-2" />
                  Virtual Phone Testing
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="developer">
          <MobileCapacitorSetup />
        </TabsContent>
      </Tabs>
      
      <AppDownloadModal 
        open={isAppDownloadModalOpen} 
        onOpenChange={setIsAppDownloadModalOpen} 
      />
      
      <Dialog open={isTestersDialogOpen} onOpenChange={setIsTestersDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>App Testers Management</DialogTitle>
            <DialogDescription>
              Add or remove users who can test your app before public release
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <div className="bg-muted py-3 px-4 border-b grid grid-cols-4">
                <div className="font-medium">User</div>
                <div className="font-medium">Email</div>
                <div className="font-medium">Device</div>
                <div className="font-medium text-right">Actions</div>
              </div>
              <div className="divide-y">
                <div className="py-3 px-4 grid grid-cols-4 items-center">
                  <div>Alex Johnson</div>
                  <div>alex@example.com</div>
                  <div>iPhone 14</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
                <div className="py-3 px-4 grid grid-cols-4 items-center">
                  <div>Maria Garcia</div>
                  <div>maria@example.com</div>
                  <div>Samsung S22</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
                <div className="py-3 px-4 grid grid-cols-4 items-center">
                  <div>James Wilson</div>
                  <div>james@example.com</div>
                  <div>iPad Pro</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add New Tester
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>App Version History</DialogTitle>
            <DialogDescription>
              Track changes and updates across different app versions
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <div className="bg-muted py-3 px-4 border-b grid grid-cols-12">
                <div className="col-span-2 font-medium">Version</div>
                <div className="col-span-3 font-medium">Release Date</div>
                <div className="col-span-5 font-medium">Changes</div>
                <div className="col-span-2 font-medium text-right">Actions</div>
              </div>
              <div className="divide-y">
                <div className="py-3 px-4 grid grid-cols-12 items-center">
                  <div className="col-span-2">v1.2.0</div>
                  <div className="col-span-3">Apr 10, 2025</div>
                  <div className="col-span-5 text-sm">Added wallet connection, improved performance</div>
                  <div className="col-span-2 text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                <div className="py-3 px-4 grid grid-cols-12 items-center">
                  <div className="col-span-2">v1.1.0</div>
                  <div className="col-span-3">Mar 22, 2025</div>
                  <div className="col-span-5 text-sm">Added card freeze feature, bug fixes</div>
                  <div className="col-span-2 text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                <div className="py-3 px-4 grid grid-cols-12 items-center">
                  <div className="col-span-2">v1.0.0</div>
                  <div className="col-span-3">Feb 15, 2025</div>
                  <div className="col-span-5 text-sm">Initial release</div>
                  <div className="col-span-2 text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isVirtualTestingOpen} onOpenChange={setIsVirtualTestingOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Virtual Phone Testing</DialogTitle>
            <DialogDescription>
              Test your app on virtual iOS and Android devices
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">iOS Device</h3>
                <div className="border rounded-md p-6 flex items-center justify-center">
                  <div className="bg-gray-100 w-60 h-96 rounded-3xl border-4 border-gray-300 flex flex-col">
                    <div className="h-6 bg-gray-200 rounded-t-3xl flex items-center justify-center">
                      <div className="w-20 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white p-2 flex items-center justify-center">
                      <p className="text-center text-sm text-muted-foreground">
                        Virtual iOS device preview would appear here
                      </p>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-b-3xl flex items-center justify-center">
                      <div className="w-20 h-6 rounded-full border border-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Android Device</h3>
                <div className="border rounded-md p-6 flex items-center justify-center">
                  <div className="bg-gray-800 w-60 h-96 rounded-2xl border-4 border-black flex flex-col">
                    <div className="h-6 bg-black rounded-t-xl flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white p-2 flex items-center justify-center">
                      <p className="text-center text-sm text-muted-foreground">
                        Virtual Android device preview would appear here
                      </p>
                    </div>
                    <div className="h-12 bg-black rounded-b-xl flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full border border-gray-600"></div>
                      <div className="w-12 h-2 bg-gray-600 rounded-full"></div>
                      <div className="w-6 h-6 rounded-full border border-gray-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Screenshots
            </Button>
            <Button>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileApps;
