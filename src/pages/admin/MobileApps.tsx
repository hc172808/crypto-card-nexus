
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Download, Smartphone, Apple, Globe, Maximize, RefreshCw, Users } from "lucide-react";

const data = [
  { name: 'Jan', ios: 400, android: 240 },
  { name: 'Feb', ios: 300, android: 139 },
  { name: 'Mar', ios: 200, android: 980 },
  { name: 'Apr', ios: 278, android: 390 },
  { name: 'May', ios: 189, android: 480 },
  { name: 'Jun', ios: 239, android: 380 },
  { name: 'Jul', ios: 349, android: 430 },
];

const MobileAppsAdminPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mobile Apps Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Publish New Version
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,389</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,472</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Android / iOS Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62% / 38%</div>
            <p className="text-xs text-muted-foreground">Android growing faster</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Version</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v1.2.0</div>
            <p className="text-xs text-muted-foreground">Released 3 days ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="android">Android</TabsTrigger>
          <TabsTrigger value="ios">iOS</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="testing">Virtual Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Acquisition</CardTitle>
              <CardDescription>Download trends across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ios" stroke="#8884d8" name="iOS" />
                    <Line type="monotone" dataKey="android" stroke="#82ca9d" name="Android" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Releases</CardTitle>
                <CardDescription>Last 3 app releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Version 1.2.0</h3>
                      <p className="text-sm text-muted-foreground">Released on April 7, 2025</p>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Version 1.1.5</h3>
                      <p className="text-sm text-muted-foreground">Released on March 20, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Version 1.1.0</h3>
                      <p className="text-sm text-muted-foreground">Released on February 12, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>App Performance</CardTitle>
                <CardDescription>Crash rates and user feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Crash Rate</span>
                      <span className="text-sm text-green-500">0.8%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '0.8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">App Rating</span>
                      <span className="text-sm">4.7/5.0</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">User Retention (30 days)</span>
                      <span className="text-sm">76%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="android" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Android App Status
                </CardTitle>
                <CardDescription>
                  Manage your Android app distribution
                </CardDescription>
              </div>
              <Badge className="bg-green-500">Published</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Play Store Status</h3>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Current Version</h3>
                    <p className="text-sm text-muted-foreground">1.2.0 (build 45)</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">April 7, 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Direct APK Available</h3>
                    <p className="text-sm text-muted-foreground">Yes</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Update App
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download APK
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Android Usage Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="android" fill="#82ca9d" name="Android Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Samsung</span>
                      <span className="text-sm">42%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Xiaomi</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Google Pixel</span>
                      <span className="text-sm">18%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Others</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ios" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  iOS App Status
                </CardTitle>
                <CardDescription>
                  Manage your iOS app distribution
                </CardDescription>
              </div>
              <Badge className="bg-green-500">Published</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">App Store Status</h3>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Current Version</h3>
                    <p className="text-sm text-muted-foreground">1.2.0 (build 32)</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">April 5, 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">TestFlight Available</h3>
                    <p className="text-sm text-muted-foreground">Yes (12 testers)</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Update App
              </Button>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Manage Testers
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>iOS Usage Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ios" fill="#8884d8" name="iOS Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>iOS Version Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">iOS 16+</span>
                      <span className="text-sm">72%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">iOS 15</span>
                      <span className="text-sm">19%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '19%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">iOS 14</span>
                      <span className="text-sm">8%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Older</span>
                      <span className="text-sm">1%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="mr-4">
                    <Apple className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">App Store</h3>
                    <p className="text-sm text-muted-foreground">Official iOS app distribution</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <div className="mr-4">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Google Play Store</h3>
                    <p className="text-sm text-muted-foreground">Official Android app distribution</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <div className="mr-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Direct Web Download</h3>
                    <p className="text-sm text-muted-foreground">APK download from website</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <div className="mr-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Enterprise Distribution</h3>
                    <p className="text-sm text-muted-foreground">Internal company distribution</p>
                  </div>
                  <Badge className="bg-gray-500">Setup Required</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direct APK Download</CardTitle>
                <CardDescription>
                  Configure and manage direct APK downloads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2">Download URL</h3>
                  <div className="flex">
                    <div className="flex-1 bg-white border rounded-l-md px-3 py-2 text-sm truncate">
                      https://download.cryptonexus.com/app/android-v1.2.0.apk
                    </div>
                    <Button variant="outline" className="rounded-l-none">Copy</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Installation Instructions</h3>
                  <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                    <li>Download the APK file</li>
                    <li>Enable "Install from Unknown Sources" in settings</li>
                    <li>Open the downloaded file to install</li>
                    <li>Follow the on-screen instructions</li>
                  </ol>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Version History</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>v1.2.0</span>
                      <Button variant="link" className="h-auto p-0">Download</Button>
                    </div>
                    <div className="flex justify-between">
                      <span>v1.1.5</span>
                      <Button variant="link" className="h-auto p-0">Download</Button>
                    </div>
                    <div className="flex justify-between">
                      <span>v1.1.0</span>
                      <Button variant="link" className="h-auto p-0">Download</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Virtual Phone Testing</span>
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4 mr-2" />
                      Full Screen
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Test your mobile app in a virtual environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center p-0">
                  <div className="relative border-8 border-black rounded-[2rem] w-[320px] h-[640px] bg-white overflow-hidden">
                    <div className="absolute top-0 w-full h-6 bg-black"></div>
                    <div className="absolute bottom-0 w-full h-1 bg-black"></div>
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Smartphone className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="font-bold">Virtual Device Preview</h3>
                        <p className="text-sm text-muted-foreground">
                          Click "Start Virtual Device" to begin testing
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Start Virtual Device
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Device Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Device Type</label>
                    <select className="w-full mt-1 border rounded-md p-2">
                      <option>Google Pixel 7</option>
                      <option>Samsung Galaxy S23</option>
                      <option>iPhone 14</option>
                      <option>iPhone 13</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">OS Version</label>
                    <select className="w-full mt-1 border rounded-md p-2">
                      <option>Android 13</option>
                      <option>Android 12</option>
                      <option>iOS 16</option>
                      <option>iOS 15</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">App Version</label>
                    <select className="w-full mt-1 border rounded-md p-2">
                      <option>v1.2.0 (Latest)</option>
                      <option>v1.1.5</option>
                      <option>v1.1.0</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full">
                      Apply Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Test Push Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Test Card Transaction
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Test Wallet Connection
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Network Stress Test
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileAppsAdminPage;
