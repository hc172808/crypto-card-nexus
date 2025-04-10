
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  HardDrive,
  UploadCloud,
  RefreshCw,
  Clock,
  Calendar,
  Database,
  File,
  FileArchive,
  ServerCog,
  ShieldCheck,
  AlertCircle,
  Info,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// Mock backup data
const mockBackups = [
  {
    id: "1",
    name: "Full System Backup",
    date: "2025-04-08 14:30:25",
    size: "4.2 GB",
    type: "full",
    status: "complete",
  },
  {
    id: "2",
    name: "Database Only Backup",
    date: "2025-04-07 09:15:12",
    size: "1.8 GB",
    type: "database",
    status: "complete",
  },
  {
    id: "3",
    name: "Configuration Files",
    date: "2025-04-05 22:43:01",
    size: "156 MB",
    type: "config",
    status: "complete",
  },
  {
    id: "4",
    name: "Weekly Scheduled Backup",
    date: "2025-04-01 01:00:00",
    size: "4.1 GB",
    type: "full",
    status: "complete",
  },
];

const ServerBackup = () => {
  const { toast } = useToast();
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backups, setBackups] = useState(mockBackups);
  const [includeDatabase, setIncludeDatabase] = useState(true);
  const [includeFiles, setIncludeFiles] = useState(true);
  const [includeConfigs, setIncludeConfigs] = useState(true);
  const [backupName, setBackupName] = useState("");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleBackupNow = () => {
    if (!backupName) {
      toast({
        title: "Backup name required",
        description: "Please enter a name for your backup",
        variant: "destructive",
      });
      return;
    }

    setIsBackupDialogOpen(false);
    setIsBackupInProgress(true);
    setBackupProgress(0);

    const backupInterval = setInterval(() => {
      setBackupProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(backupInterval);
          setIsBackupInProgress(false);
          
          const newBackup = {
            id: (backups.length + 1).toString(),
            name: backupName,
            date: new Date().toISOString().replace("T", " ").slice(0, 19),
            size: `${(Math.random() * 5 + 1).toFixed(1)} GB`,
            type: includeDatabase && includeFiles && includeConfigs ? "full" : "partial",
            status: "complete",
          };
          
          setBackups([newBackup, ...backups]);
          
          toast({
            title: "Backup completed successfully",
            description: `${backupName} has been created and stored securely.`,
          });
        }
        return newProgress;
      });
    }, 300);
  };

  const handleDownload = (backupId: string) => {
    setIsDownloading(backupId);
    
    // Simulate download
    setTimeout(() => {
      setIsDownloading(null);
      toast({
        title: "Backup Downloaded",
        description: "Your backup archive has been downloaded successfully.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HardDrive className="h-8 w-8" />
          Server Backup & Recovery
        </h1>
        <p className="text-muted-foreground">
          Manage server backups, download archives, and perform system recovery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Last Backup:</span>
                <span className="text-sm font-medium">{backups[0].date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Backup Size:</span>
                <span className="text-sm font-medium">{backups[0].size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Backup Storage:</span>
                <span className="text-sm font-medium">42.6 GB / 100 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Backup Status:</span>
                <span className="text-sm font-medium text-green-500">Healthy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" /> 
              Schedule Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Next Backup:</span>
                <span className="text-sm font-medium">2025-04-15 01:00:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Backup Type:</span>
                <span className="text-sm font-medium">Full System</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Schedule:</span>
                <span className="text-sm font-medium">Weekly (Sunday)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Retention Policy:</span>
                <span className="text-sm font-medium">Keep last 4 backups</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ServerCog className="h-5 w-5 text-purple-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                onClick={() => setIsBackupDialogOpen(true)} 
                className="w-full justify-start" 
                disabled={isBackupInProgress}
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                Create New Backup
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Configure Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Backup History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isBackupInProgress && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Backup in Progress
            </CardTitle>
            <CardDescription>
              Creating backup: {backupName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Progress</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} />
              <p className="text-sm text-muted-foreground mt-2">
                Please do not close this page until the backup is complete. This may take several minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="backups">
        <TabsList className="mb-4">
          <TabsTrigger value="backups">Available Backups</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Options</TabsTrigger>
          <TabsTrigger value="settings">Backup Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="backups">
          <Card>
            <CardHeader>
              <CardTitle>Backup Archives</CardTitle>
              <CardDescription>
                View and manage your system backups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="bg-muted py-3 px-4 border-b grid grid-cols-12">
                  <div className="col-span-4 font-medium">Backup Name</div>
                  <div className="col-span-3 font-medium">Date</div>
                  <div className="col-span-1 font-medium">Size</div>
                  <div className="col-span-2 font-medium">Type</div>
                  <div className="col-span-2 font-medium text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {backups.map((backup) => (
                    <div key={backup.id} className="py-3 px-4 grid grid-cols-12 items-center">
                      <div className="col-span-4 flex items-center">
                        <FileArchive className="h-4 w-4 mr-2 text-blue-500" />
                        {backup.name}
                      </div>
                      <div className="col-span-3 text-muted-foreground">{backup.date}</div>
                      <div className="col-span-1">{backup.size}</div>
                      <div className="col-span-2">
                        {backup.type === "full" ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">Full System</span>
                        ) : backup.type === "database" ? (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">Database</span>
                        ) : (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">Config</span>
                        )}
                      </div>
                      <div className="col-span-2 flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleDownload(backup.id)}
                          disabled={isDownloading === backup.id}
                        >
                          {isDownloading === backup.id ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-1" />
                          )}
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServerCog className="h-5 w-5" />
                System Recovery
              </CardTitle>
              <CardDescription>
                Restore your system from a backup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800 mb-1">Caution: System Recovery</h4>
                  <p className="text-sm text-amber-700">
                    Restoring from a backup will overwrite your current system configuration and data.
                    This action cannot be undone. Make sure you have a recent backup before proceeding.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Select Recovery Option</h3>
                  <div className="space-y-4">
                    <Card className="border-2 border-blue-200">
                      <CardContent className="p-4 flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                          <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Database Recovery</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Restore only database content without affecting system files or configuration.
                          </p>
                          <Button className="mt-3" variant="outline" size="sm">
                            Select
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200">
                      <CardContent className="p-4 flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <File className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Configuration Recovery</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Restore system configuration files while preserving data and content.
                          </p>
                          <Button className="mt-3" variant="outline" size="sm">
                            Select
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-200">
                      <CardContent className="p-4 flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-4">
                          <ServerCog className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Full System Recovery</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Complete restoration of all system files, database, and configuration.
                          </p>
                          <Button className="mt-3" variant="outline" size="sm">
                            Select
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Backup Settings</CardTitle>
              <CardDescription>
                Configure your backup preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Schedule Configuration</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Backup Frequency</Label>
                        <Select defaultValue="weekly">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time of Day</Label>
                        <Input type="time" defaultValue="01:00" />
                      </div>

                      <div className="space-y-2">
                        <Label>Backup Retention</Label>
                        <Select defaultValue="4">
                          <SelectTrigger>
                            <SelectValue placeholder="Select retention" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">Keep last 2 backups</SelectItem>
                            <SelectItem value="4">Keep last 4 backups</SelectItem>
                            <SelectItem value="8">Keep last 8 backups</SelectItem>
                            <SelectItem value="all">Keep all backups</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Storage Location</Label>
                        <Select defaultValue="local">
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Local Storage</SelectItem>
                            <SelectItem value="cloud">Cloud Storage</SelectItem>
                            <SelectItem value="both">Both Local & Cloud</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Backup Contents</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="database-backup">Database Backup</Label>
                        <p className="text-sm text-muted-foreground">
                          Include all database content in backups
                        </p>
                      </div>
                      <Switch id="database-backup" checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="files-backup">User Files</Label>
                        <p className="text-sm text-muted-foreground">
                          Include uploaded files and documents
                        </p>
                      </div>
                      <Switch id="files-backup" checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="config-backup">Configuration Files</Label>
                        <p className="text-sm text-muted-foreground">
                          Include system configuration files
                        </p>
                      </div>
                      <Switch id="config-backup" checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="logs-backup">System Logs</Label>
                        <p className="text-sm text-muted-foreground">
                          Include system and error logs in backups
                        </p>
                      </div>
                      <Switch id="logs-backup" checked={false} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-success">Email on Success</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notification when backup completes successfully
                        </p>
                      </div>
                      <Switch id="email-success" checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-failure">Email on Failure</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notification when backup fails
                        </p>
                      </div>
                      <Switch id="email-failure" checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Backup Dialog */}
      <AlertDialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Backup</AlertDialogTitle>
            <AlertDialogDescription>
              Configure what to include in this backup
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="backup-name">Backup Name</Label>
                <Input 
                  id="backup-name" 
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                  placeholder="Enter a name for this backup"
                  className="mt-1"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="include-database" 
                    checked={includeDatabase} 
                    onCheckedChange={setIncludeDatabase}
                  />
                  <Label htmlFor="include-database">Include Database</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="include-files" 
                    checked={includeFiles} 
                    onCheckedChange={setIncludeFiles}
                  />
                  <Label htmlFor="include-files">Include Files</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="include-configs" 
                    checked={includeConfigs} 
                    onCheckedChange={setIncludeConfigs}
                  />
                  <Label htmlFor="include-configs">Include Configurations</Label>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
                <Info className="text-blue-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  Creating a backup may temporarily affect system performance.
                  This process can take several minutes depending on your data size.
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBackupNow}>
              <UploadCloud className="h-4 w-4 mr-2" />
              Start Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServerBackup;
