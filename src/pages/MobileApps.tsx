
import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Download, Apple, Info } from "lucide-react";

const MobileApps = () => {
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
                <Button className="w-full">
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
                <Button className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Play Store
                </Button>
                <Button variant="outline" className="w-full">
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
        
        <TabsContent value="developer">
          <MobileCapacitorSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileApps;
