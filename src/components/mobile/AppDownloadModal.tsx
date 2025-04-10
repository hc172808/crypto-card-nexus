
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QrCode, Download, Smartphone, Apple, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppDownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppDownloadModal({ open, onOpenChange }: AppDownloadModalProps) {
  const { toast } = useToast();
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  const handleDirectDownload = () => {
    setDownloadStarted(true);
    toast({
      title: "Download Started",
      description: "Your Direct APK download has started"
    });
    
    // Simulate download completion after a delay
    setTimeout(() => {
      setDownloadStarted(false);
      toast({
        title: "Download Complete",
        description: "APK file downloaded successfully"
      });
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Download Mobile App
          </DialogTitle>
          <DialogDescription>
            Get the Crypto Card Nexus mobile app for iOS or Android
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ios" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="ios" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              iOS App
            </TabsTrigger>
            <TabsTrigger value="android" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Android App
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ios" className="flex flex-col items-center space-y-4">
            <div className="bg-muted p-4 rounded-xl border border-border">
              <QrCode size={150} className="text-primary" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Scan with your iPhone camera to download the app,
              <br /> or click below to visit the App Store
            </p>
            <Button className="w-full" variant="outline">
              <Apple className="h-4 w-4 mr-2" />
              Download on the App Store
            </Button>
          </TabsContent>
          
          <TabsContent value="android" className="flex flex-col items-center space-y-4">
            <div className="bg-muted p-4 rounded-xl border border-border">
              <QrCode size={150} className="text-primary" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Scan with your Android device to download the app,
              <br /> or click below for direct APK download
            </p>
            <Button className="w-full" variant="outline">
              <Smartphone className="h-4 w-4 mr-2" />
              Download on Google Play
            </Button>
            <Button 
              className="w-full" 
              variant="secondary"
              onClick={handleDirectDownload}
              disabled={downloadStarted}
            >
              {downloadStarted ? (
                <>
                  <Check className="h-4 w-4 mr-2 animate-pulse" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Direct APK Download
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <p className="text-xs text-muted-foreground ml-auto">
            App v1.2.0
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
