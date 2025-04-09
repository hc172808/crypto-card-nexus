
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Download,
  QrCode,
  Phone,
  ExternalLink,
  Globe,
  QrCodeIcon,
  TabletSmartphone,
  Sparkles,
  Smartphone as SmartphoneIcon,
  Tablet,
  AppleIcon,
  AndroidIcon,
  ClipboardCopy,
  Upload,
} from "lucide-react";

// Mock mobile app versions
const appVersions = [
  {
    id: "1",
    platform: "iOS",
    version: "1.2.0",
    buildNumber: "245",
    releaseDate: "2023-04-15",
    status: "live",
    downloads: 12546,
  },
  {
    id: "2",
    platform: "iOS",
    version: "1.1.2",
    buildNumber: "201",
    releaseDate: "2023-03-10",
    status: "archived",
    downloads: 8721,
  },
  {
    id: "3",
    platform: "Android",
    version: "1.2.1",
    buildNumber: "57",
    releaseDate: "2023-04-18",
    status: "live",
    downloads: 18345,
  },
  {
    id: "4",
    platform: "Android",
    version: "1.1.0",
    buildNumber: "45",
    releaseDate: "2023-03-02",
    status: "archived",
    downloads: 15762,
  },
];

// Mock virtual devices for testing
const virtualDevices = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    platform: "iOS",
    osVersion: "15.0",
    resolution: "1170 x 2532",
    status: "available",
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    platform: "Android",
    osVersion: "12",
    resolution: "1080 x 2340",
    status: "available",
  },
  {
    id: "3",
    name: "Pixel 6",
    platform: "Android",
    osVersion: "12",
    resolution: "1080 x 2400",
    status: "in-use",
  },
  {
    id: "4",
    name: "iPhone SE (2022)",
    platform: "iOS",
    osVersion: "15.4",
    resolution: "750 x 1334",
    status: "available",
  },
];

const VersionStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "live":
      return <Badge className="bg-green-500">Live</Badge>;
    case "archived":
      return <Badge variant="secondary">Archived</Badge>;
    case "beta":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Beta</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const DeviceStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500">Available</Badge>;
    case "in-use":
      return <Badge variant="secondary" className="bg-yellow-500">In Use</Badge>;
    case "offline":
      return <Badge variant="outline">Offline</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const MobileAppsAdminPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TabletSmartphone className="h-7 w-7" />
          Mobile App Management
        </h1>
        <p className="text-muted-foreground">
          Manage and monitor your mobile applications, test on virtual devices, and distribute new versions.
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="virtual-testing">Virtual Testing</TabsTrigger>
          <TabsTrigger value="distribution">App Distribution</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AppleIcon className="h-5 w-5" />
                  iOS App
                </CardTitle>
                <CardDescription>
                  Current version and status of iOS application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Version</p>
                    <p className="text-xl font-bold">1.2.0 (245)</p>
                  </div>
                  <VersionStatusBadge status="live" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Released</span>
                    <span>April 15, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Downloads</span>
                    <span>12,546</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Installs</span>
                    <span>9,872</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="flex-1">Update</Button>
                  <Button variant="outline" className="flex-1">
                    <QrCodeIcon className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AndroidIcon className="h-5 w-5" />
                  Android App
                </CardTitle>
                <CardDescription>
                  Current version and status of Android application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Version</p>
                    <p className="text-xl font-bold">1.2.1 (57)</p>
                  </div>
                  <VersionStatusBadge status="live" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Released</span>
                    <span>April 18, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Downloads</span>
                    <span>18,345</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Installs</span>
                    <span>14,421</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="flex-1">Update</Button>
                  <Button variant="outline" className="flex-1">
                    <QrCodeIcon className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>
                All versions of your mobile applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Build</TableHead>
                      <TableHead>Release Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appVersions.map((version) => (
                      <TableRow key={version.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {version.platform === "iOS" ? (
                              <AppleIcon className="h-4 w-4" />
                            ) : (
                              <AndroidIcon className="h-4 w-4" />
                            )}
                            {version.platform}
                          </div>
                        </TableCell>
                        <TableCell>{version.version}</TableCell>
                        <TableCell>{version.buildNumber}</TableCell>
                        <TableCell>{version.releaseDate}</TableCell>
                        <TableCell>
                          <VersionStatusBadge status={version.status} />
                        </TableCell>
                        <TableCell>{version.downloads.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="virtual-testing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Virtual Device Testing</CardTitle>
                <CardDescription>
                  Test your mobile apps on virtual devices before deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>OS Version</TableHead>
                        <TableHead>Resolution</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {virtualDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-medium">{device.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {device.platform === "iOS" ? (
                                <AppleIcon className="h-4 w-4" />
                              ) : (
                                <AndroidIcon className="h-4 w-4" />
                              )}
                              {device.platform}
                            </div>
                          </TableCell>
                          <TableCell>{device.osVersion}</TableCell>
                          <TableCell>{device.resolution}</TableCell>
                          <TableCell>
                            <DeviceStatusBadge status={device.status} />
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={device.status === "in-use"}
                            >
                              Launch
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Build</CardTitle>
                <CardDescription>
                  Upload a new build for testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Platform</label>
                    <select className="w-full p-2 border rounded">
                      <option>iOS</option>
                      <option>Android</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Version</label>
                    <Input placeholder="e.g., 1.2.3" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Build</label>
                    <Input placeholder="e.g., 246" />
                  </div>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop your build file or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upload for Testing</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Virtual Phone Preview
              </CardTitle>
              <CardDescription>
                Preview your app on virtual devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-6">
                <div className="relative w-[270px] h-[550px] bg-black rounded-[36px] border-[14px] border-black overflow-hidden">
                  <div className="absolute top-0 w-full h-6 bg-black flex justify-center items-center">
                    <div className="w-20 h-5 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <SmartphoneIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">
                        Select a device and launch to preview your app
                      </p>
                      <Button size="sm" variant="outline">Launch Demo</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AppleIcon className="h-5 w-5" />
                  iOS Distribution
                </CardTitle>
                <CardDescription>
                  App Store and TestFlight distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">App Store</p>
                      <p className="text-sm text-muted-foreground">Public distribution channel</p>
                    </div>
                    <Badge className="bg-green-500">Published</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">TestFlight</p>
                      <p className="text-sm text-muted-foreground">Beta testing distribution</p>
                    </div>
                    <div className="text-sm font-medium">24 testers</div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">TestFlight Installation QR</p>
                    </div>
                    <div className="flex justify-center bg-muted p-4 rounded-md">
                      <div className="w-32 h-32 bg-white border flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    App Store
                  </Button>
                  <Button className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    New Release
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AndroidIcon className="h-5 w-5" />
                  Android Distribution
                </CardTitle>
                <CardDescription>
                  Google Play Store and direct APK distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Google Play Store</p>
                      <p className="text-sm text-muted-foreground">Public distribution channel</p>
                    </div>
                    <Badge className="bg-green-500">Published</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Internal Testing Track</p>
                      <p className="text-sm text-muted-foreground">Closed beta testing</p>
                    </div>
                    <div className="text-sm font-medium">18 testers</div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Direct APK Download</p>
                    </div>
                    <div className="flex justify-center bg-muted p-4 rounded-md">
                      <div className="w-32 h-32 bg-white border flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Play Store
                  </Button>
                  <Button className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    New Release
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribution Settings</CardTitle>
              <CardDescription>
                Manage app distribution and installation options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Installation Page</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="flex-1 p-4 border rounded-md">
                      <p className="font-medium">Installation URL</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Input 
                          value="https://cryptocard.nexus/install" 
                          readOnly
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <ClipboardCopy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Share this URL with users to download the mobile apps
                      </p>
                    </div>
                    <div className="flex-1 p-4 border rounded-md">
                      <p className="font-medium">Installation QR Code</p>
                      <div className="flex justify-center mt-2">
                        <div className="w-24 h-24 bg-white border flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-primary" />
                        </div>
                      </div>
                      <div className="flex justify-center mt-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Registration Link Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="show-app-download" defaultChecked />
                      <label htmlFor="show-app-download">Show app download option after registration</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="auto-redirect" />
                      <label htmlFor="auto-redirect">Auto-redirect to app stores on mobile devices</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="include-deep-link" defaultChecked />
                      <label htmlFor="include-deep-link">Include deep linking for automatic login after install</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">31,285</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Installations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24,293</div>
                <p className="text-xs text-muted-foreground">77.6% retention rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-center flex-1">
                    <AppleIcon className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-xl font-bold">41%</div>
                    <p className="text-xs text-muted-foreground">iOS</p>
                  </div>
                  <div className="text-center flex-1">
                    <AndroidIcon className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-xl font-bold">59%</div>
                    <p className="text-xs text-muted-foreground">Android</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>App Usage Analytics</CardTitle>
              <CardDescription>
                User engagement metrics for mobile applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">
                  Analytics charts will appear here
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">
                    Retention chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Crash Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">
                    Crash analytics will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileAppsAdminPage;
