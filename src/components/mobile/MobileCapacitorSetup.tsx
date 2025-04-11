
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
import {
  Smartphone,
  Download,
  Server,
  Code,
  CopyCheck,
  ExternalLink,
  Apple,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function MobileCapacitorSetup() {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: description,
    });
  };
  
  const capacitorConfig = `{
  "appId": "app.lovable.af6b19ed1b30403ebd85da01164bdbe2",
  "appName": "crypto-card-nexus",
  "webDir": "dist",
  "server": {
    "url": "https://af6b19ed-1b30-403e-bd85-da01164bdbe2.lovableproject.com?forceHideBadge=true",
    "cleartext": true
  }
}`;

  const setupInstructions = `
# Setting Up Mobile Development Environment

1. **Install Dependencies**
\`\`\`bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
\`\`\`

2. **Initialize Capacitor**
\`\`\`bash
npx cap init
\`\`\`

3. **Add platforms**
\`\`\`bash
npx cap add ios
npx cap add android
\`\`\`

4. **Build the project**
\`\`\`bash
npm run build
\`\`\`

5. **Sync with native projects**
\`\`\`bash
npx cap sync
\`\`\`

6. **Open native IDE**
\`\`\`bash
npx cap open ios     # For iOS
npx cap open android # For Android
\`\`\`
`;

  const handleGenerateIOSProject = () => {
    toast({
      title: "Generating iOS Project",
      description: "iOS project generation started. This may take a few moments."
    });
    
    // Simulate project generation
    setTimeout(() => {
      toast({
        title: "iOS Project Ready",
        description: "iOS project has been successfully generated."
      });
    }, 3000);
  };

  const handleGenerateAndroidProject = () => {
    toast({
      title: "Generating Android Project",
      description: "Android project generation started. This may take a few moments."
    });
    
    // Simulate project generation
    setTimeout(() => {
      toast({
        title: "Android Project Ready",
        description: "Android project has been successfully generated."
      });
    }, 3000);
  };

  const openCapacitorDocs = () => {
    window.open("https://capacitorjs.com/docs", "_blank");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile App Setup
          </CardTitle>
          <CardDescription>
            Configure and build the mobile app using Capacitor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">capacitor.config.ts</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(capacitorConfig, "Capacitor config copied")}
              >
                <CopyCheck className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
              {capacitorConfig}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Setup Instructions</h3>
            <div className="bg-muted p-4 rounded-md text-xs overflow-auto whitespace-pre">
              {setupInstructions}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button className="flex-1" onClick={openCapacitorDocs}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Capacitor Docs
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => copyToClipboard(setupInstructions, "Setup instructions copied")}
            >
              <CopyCheck className="h-4 w-4 mr-2" />
              Copy Instructions
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              iOS Setup
            </CardTitle>
            <CardDescription>
              Build and run the iOS app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• macOS computer</li>
                  <li>• Xcode 13+ installed</li>
                  <li>• iOS device or simulator</li>
                  <li>• Apple Developer account (for distribution)</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Commands</h4>
                <div className="bg-muted p-2 rounded-md text-xs mb-2">
                  <code>npx cap add ios</code>
                </div>
                <div className="bg-muted p-2 rounded-md text-xs mb-2">
                  <code>npx cap sync ios</code>
                </div>
                <div className="bg-muted p-2 rounded-md text-xs">
                  <code>npx cap open ios</code>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleGenerateIOSProject}
            >
              <Code className="h-4 w-4 mr-2" />
              Generate iOS Project
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Android Setup
            </CardTitle>
            <CardDescription>
              Build and run the Android app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Android Studio installed</li>
                  <li>• Android device or emulator</li>
                  <li>• Java JDK 11+</li>
                  <li>• Gradle 7+</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Commands</h4>
                <div className="bg-muted p-2 rounded-md text-xs mb-2">
                  <code>npx cap add android</code>
                </div>
                <div className="bg-muted p-2 rounded-md text-xs mb-2">
                  <code>npx cap sync android</code>
                </div>
                <div className="bg-muted p-2 rounded-md text-xs">
                  <code>npx cap open android</code>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleGenerateAndroidProject}
            >
              <Code className="h-4 w-4 mr-2" />
              Generate Android Project
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
