
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Copy, 
  Download, 
  Server, 
  Terminal, 
  ShieldCheck, 
  Database, 
  Globe,
  KeyRound
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ServerSetup() {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: message,
    });
  };
  
  const installScriptContent = `#!/bin/bash
# Crypto Card Nexus - One-Click Production Setup
# -----------------------------------------------

echo "Starting Crypto Card Nexus installation..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx ufw

# Install Node.js and npm
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Setup firewall
echo "Setting up firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Clone repository
echo "Cloning repository..."
git clone https://github.com/yourusername/crypto-card-nexus.git
cd crypto-card-nexus

# Install dependencies
echo "Installing project dependencies..."
npm install

# Build project
echo "Building project..."
npm run build

# Setup PM2 for process management
echo "Setting up PM2..."
pm2 start npm --name "crypto-card-nexus" -- run start
pm2 startup
pm2 save

# Setup Nginx
echo "Setting up Nginx..."
sudo tee /etc/nginx/sites-available/crypto-card-nexus <<EOF
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/crypto-card-nexus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
echo "Setting up SSL with Let's Encrypt..."
sudo certbot --nginx -d your-domain.com

echo "Installation completed!"
echo "Your Crypto Card Nexus application is now running at https://your-domain.com"
echo "Please update your domain name and environment variables as needed."
`;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Production Server Setup</h1>
      <p className="text-muted-foreground mb-8">
        Complete guide for setting up the Crypto Card Nexus platform on Ubuntu/Linux servers.
      </p>
      
      <Tabs defaultValue="one-click">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="one-click">
            <Check className="mr-2 h-4 w-4" /> 
            One-Click Setup
          </TabsTrigger>
          <TabsTrigger value="manual">
            <Terminal className="mr-2 h-4 w-4" />
            Manual Setup
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Security Checklist
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="one-click" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                One-Click Installation Script
              </CardTitle>
              <CardDescription>
                Deploy the entire platform with a single command on Ubuntu 20.04 or later
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md relative">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                  wget -O install.sh https://your-domain.com/install.sh && chmod +x install.sh && sudo ./install.sh
                </pre>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(
                    "wget -O install.sh https://your-domain.com/install.sh && chmod +x install.sh && sudo ./install.sh",
                    "Installation command copied"
                  )}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">What this script does:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Updates your system packages</li>
                  <li>Installs Node.js, Nginx, and other dependencies</li>
                  <li>Sets up your application with PM2 process manager</li>
                  <li>Configures Nginx as a reverse proxy</li>
                  <li>Secures your site with SSL via Let's Encrypt</li>
                  <li>Configures basic firewall rules</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => copyToClipboard(installScriptContent, "Installation script content copied")}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Script Content
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Install Script
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Post-Installation Configuration</CardTitle>
              <CardDescription>
                Required steps after running the installation script
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Update Environment Variables</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a .env file in your project root with all required API keys and secrets.
                  </p>
                </li>
                <li>
                  <strong>Setup Database</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure your database connection and run migrations.
                  </p>
                </li>
                <li>
                  <strong>Configure Web3 Providers</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your Infura/Alchemy API keys for blockchain interaction.
                  </p>
                </li>
                <li>
                  <strong>Set Up Payment Processor</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure your card issuer API keys (Stripe, Marqeta, etc.)
                  </p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="mr-2 h-5 w-5" />
                Step-by-Step Manual Setup
              </CardTitle>
              <CardDescription>
                Complete guide for manual installation on Ubuntu/Debian servers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Server className="mr-2 h-4 w-4" />
                  1. Server Preparation
                </h3>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <p># Update system packages</p>
                  <pre>sudo apt update && sudo apt upgrade -y</pre>
                  
                  <p># Install required dependencies</p>
                  <pre>sudo apt install -y curl git build-essential nginx</pre>
                  
                  <p># Install Node.js and npm</p>
                  <pre>curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -</pre>
                  <pre>sudo apt install -y nodejs</pre>
                  
                  <p># Install PM2 process manager</p>
                  <pre>sudo npm install -g pm2</pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Database className="mr-2 h-4 w-4" />
                  2. Database Setup
                </h3>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <p># Install PostgreSQL</p>
                  <pre>sudo apt install -y postgresql postgresql-contrib</pre>
                  
                  <p># Create database and user</p>
                  <pre>sudo -u postgres psql</pre>
                  <pre>CREATE DATABASE cardnexus;</pre>
                  <pre>CREATE USER cardnexususer WITH ENCRYPTED PASSWORD 'your_secure_password';</pre>
                  <pre>GRANT ALL PRIVILEGES ON DATABASE cardnexus TO cardnexususer;</pre>
                  <pre>\q</pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  3. Application Deployment
                </h3>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <p># Clone repository</p>
                  <pre>git clone https://github.com/yourusername/crypto-card-nexus.git</pre>
                  <pre>cd crypto-card-nexus</pre>
                  
                  <p># Install dependencies</p>
                  <pre>npm install</pre>
                  
                  <p># Create environment file</p>
                  <pre>cp .env.example .env</pre>
                  <pre>nano .env  # Edit with your values</pre>
                  
                  <p># Build the application</p>
                  <pre>npm run build</pre>
                  
                  <p># Start with PM2</p>
                  <pre>pm2 start npm --name "crypto-card-nexus" -- run start</pre>
                  <pre>pm2 startup</pre>
                  <pre>pm2 save</pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <KeyRound className="mr-2 h-4 w-4" />
                  4. Nginx & SSL Configuration
                </h3>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <p># Create Nginx configuration</p>
                  <pre>sudo nano /etc/nginx/sites-available/crypto-card-nexus</pre>
                  
                  <p># Add this configuration</p>
                  <pre>{`server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}</pre>
                  
                  <p># Enable the site and restart Nginx</p>
                  <pre>sudo ln -s /etc/nginx/sites-available/crypto-card-nexus /etc/nginx/sites-enabled/</pre>
                  <pre>sudo nginx -t</pre>
                  <pre>sudo systemctl restart nginx</pre>
                  
                  <p># Install Certbot for SSL</p>
                  <pre>sudo apt install -y certbot python3-certbot-nginx</pre>
                  <pre>sudo certbot --nginx -d your-domain.com</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" />
                Production Security Checklist
              </CardTitle>
              <CardDescription>
                Essential security measures for your production deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Environment Variables</h4>
                    <p className="text-sm text-muted-foreground">
                      Never commit .env files to version control. Use environment variables for API keys and secrets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Firewall Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Only expose necessary ports (80, 443, 22). Use UFW or similar:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      sudo ufw allow 22 && sudo ufw allow 80 && sudo ufw allow 443 && sudo ufw enable
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Regular System Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule regular system updates with:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      sudo apt update && sudo apt upgrade -y
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Database Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Use strong passwords and limit database access to localhost. Add in pg_hba.conf:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      host    all     all     127.0.0.1/32     md5
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">SSL/TLS Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your SSL configuration is secure. Test with:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      https://www.ssllabs.com/ssltest/
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Rate Limiting</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement rate limiting in Nginx to prevent abuse. Add to your server block:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
                      limit_req zone=mylimit burst=20 nodelay;
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Wallet Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Never store private keys on your server. Use hardware security modules (HSMs) or dedicated key management services.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Regular Backups</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement automated database backups with:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded mt-1">
                      pg_dump cardnexus > backup_$(date +%Y%m%d_%H%M%S).sql
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
