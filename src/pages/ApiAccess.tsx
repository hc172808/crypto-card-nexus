
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  Copy, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Lock,
  Code,
  FileJson,
  Plug,
  AlertTriangle
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: "read" | "write" | "admin";
  createdAt: string;
  expiresAt: string;
  lastUsed: string | null;
}

const API_ENDPOINTS = [
  { id: "users", name: "Users", path: "/api/v1/users", methods: ["GET", "POST", "PUT", "DELETE"] },
  { id: "cards", name: "Cards", path: "/api/v1/cards", methods: ["GET", "POST", "PUT"] },
  { id: "wallets", name: "Wallets", path: "/api/v1/wallets", methods: ["GET", "POST"] },
  { id: "transactions", name: "Transactions", path: "/api/v1/transactions", methods: ["GET"] },
  { id: "mobile-apps", name: "Mobile Apps", path: "/api/v1/mobile-apps", methods: ["GET", "POST"] },
];

const ApiAccess = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Development Key",
      key: "nxs_dev_a1b2c3d4e5f6g7h8i9j0",
      type: "read",
      createdAt: "2024-03-15T10:30:00Z",
      expiresAt: "2024-07-15T10:30:00Z",
      lastUsed: "2025-04-09T15:45:22Z"
    },
    {
      id: "2",
      name: "Production Key",
      key: "nxs_prod_1a2b3c4d5e6f7g8h9i0j",
      type: "admin",
      createdAt: "2024-02-01T08:15:00Z",
      expiresAt: "2024-08-01T08:15:00Z",
      lastUsed: "2025-04-10T08:30:15Z"
    }
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState<"read" | "write" | "admin">("read");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0].id);
  const [codeLanguage, setCodeLanguage] = useState<"curl" | "javascript" | "python">("curl");

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: message,
    });
  };

  const generateKey = () => {
    if (!newKeyName) {
      toast({
        title: "Name is required",
        description: "Please provide a name for your API key.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate key generation delay
    setTimeout(() => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      const prefix = newKeyType === "admin" ? "nxs_admin_" : 
                    newKeyType === "write" ? "nxs_write_" : "nxs_read_";
      
      const newKey = prefix + result;
      
      // Calculate expiry date (6 months from now)
      const now = new Date();
      const expiryDate = new Date(now);
      expiryDate.setMonth(now.getMonth() + 6);

      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: newKey,
        type: newKeyType,
        createdAt: now.toISOString(),
        expiresAt: expiryDate.toISOString(),
        lastUsed: null
      };

      setApiKeys([...apiKeys, newApiKey]);
      setNewKeyName("");
      setNewKeyType("read");
      setIsGenerating(false);
      
      // Show the newly created key
      setShowKeys(prev => ({
        ...prev,
        [newApiKey.id]: true
      }));

      toast({
        title: "API key generated",
        description: "Your new API key has been created successfully.",
      });
    }, 1500);
  };

  const revokeKey = (keyId: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    
    toast({
      title: "API key revoked",
      description: `${key?.name} has been revoked and can no longer be used.`,
    });
  };

  const getEndpointSample = (endpoint: string, method: string) => {
    const endpointInfo = API_ENDPOINTS.find(e => e.id === selectedEndpoint);
    const baseUrl = "https://api.nexus.com";
    const path = endpointInfo?.path || "/api/v1/unknown";
    
    switch (codeLanguage) {
      case "curl":
        return `curl -X ${method} "${baseUrl}${path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
      
      case "javascript":
        return `const response = await fetch("${baseUrl}${path}", {
  method: "${method}",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
});

const data = await response.json();
console.log(data);`;
      
      case "python":
        return `import requests

response = requests.${method.toLowerCase()}(
    "${baseUrl}${path}",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
)

data = response.json()
print(data)`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Key className="h-7 w-7" />
          API Access
        </h1>
        <p className="text-muted-foreground">
          Manage API keys and explore available endpoints
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for programmatic access to the Nexus API
              </CardDescription>
            </CardHeader>
            <CardContent>
              {apiKeys.length > 0 ? (
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div 
                      key={apiKey.id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium flex items-center gap-2">
                          {apiKey.name}
                          <Badge 
                            variant={apiKey.type === "admin" ? "destructive" : 
                                   apiKey.type === "write" ? "default" : "outline"}
                          >
                            {apiKey.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => revokeKey(apiKey.id)}
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-muted p-3 rounded-md flex items-center justify-between">
                        <div className="font-mono text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {showKeys[apiKey.id] ? apiKey.key : "•".repeat(24)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKeys[apiKey.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => copyToClipboard(apiKey.key, "API key copied to clipboard")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
                        <div>Created: {formatDate(apiKey.createdAt)}</div>
                        <div>Expires: {formatDate(apiKey.expiresAt)}</div>
                        {apiKey.lastUsed && (
                          <div>Last used: {formatDate(apiKey.lastUsed)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-muted/30 rounded-lg border border-dashed">
                  <Key className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No API keys created yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Explore available endpoints and learn how to use the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="endpoint">Select Endpoint</Label>
                    <Select 
                      value={selectedEndpoint} 
                      onValueChange={(value) => setSelectedEndpoint(value)}
                    >
                      <SelectTrigger id="endpoint">
                        <SelectValue placeholder="Select endpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        {API_ENDPOINTS.map((endpoint) => (
                          <SelectItem key={endpoint.id} value={endpoint.id}>
                            {endpoint.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-2/3">
                    <Label htmlFor="language">Code Sample Language</Label>
                    <Select 
                      value={codeLanguage} 
                      onValueChange={(value: "curl" | "javascript" | "python") => setCodeLanguage(value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curl">cURL</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {API_ENDPOINTS.map((endpoint) => {
                  if (endpoint.id !== selectedEndpoint) return null;
                  
                  return (
                    <div key={endpoint.id}>
                      <div className="mb-2">
                        <h3 className="text-lg font-medium">{endpoint.name}</h3>
                        <div className="text-sm text-muted-foreground font-mono">{endpoint.path}</div>
                      </div>
                      
                      <div className="space-y-4">
                        {endpoint.methods.map((method) => (
                          <div key={method} className="border rounded-md overflow-hidden">
                            <div className="bg-muted p-2 px-3 border-b flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Badge variant={
                                  method === "GET" ? "outline" :
                                  method === "POST" ? "default" :
                                  method === "PUT" ? "secondary" : "destructive"
                                }>
                                  {method}
                                </Badge>
                                <span className="text-sm font-medium">{endpoint.path}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => copyToClipboard(
                                  getEndpointSample(endpoint.id, method), 
                                  "Code sample copied to clipboard"
                                )}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="bg-muted/40 p-3 text-xs overflow-x-auto">
                              <code>{getEndpointSample(endpoint.id, method)}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">API Rate Limits</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Rate limits vary by API key type: Read-only (1000 requests/hour), 
                      Write (500 requests/hour), Admin (2000 requests/hour).
                      Exceeding these limits will result in 429 Too Many Requests responses.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Generate API Key</CardTitle>
              <CardDescription>
                Create a new API key for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g. Development Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keyType">Permission Level</Label>
                  <Select 
                    value={newKeyType} 
                    onValueChange={(value: "read" | "write" | "admin") => setNewKeyType(value)}
                  >
                    <SelectTrigger id="keyType">
                      <SelectValue placeholder="Select permission level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read-only</SelectItem>
                      <SelectItem value="write">Read & Write</SelectItem>
                      <SelectItem value="admin">Admin (Full Access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {newKeyType === "read" ? 
                      "Read-only access to view resources" : 
                     newKeyType === "write" ? 
                      "Ability to create and modify resources" : 
                      "Full administrative access to all resources"}
                  </span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={generateKey}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Key className="h-4 w-4 mr-2" />
                  )}
                  Generate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Features</CardTitle>
              <CardDescription>
                Available functionality through the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileJson className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">REST API</p>
                    <p className="text-sm text-muted-foreground">
                      Standard RESTful interface with JSON responses
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">SDK Support</p>
                    <p className="text-sm text-muted-foreground">
                      Official client libraries for JavaScript, Python, and more
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Plug className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Webhooks</p>
                    <p className="text-sm text-muted-foreground">
                      Real-time event notifications to your servers
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiAccess;
