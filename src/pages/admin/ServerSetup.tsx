
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardCopy,
  Download,
  Check,
  Shield,
  Terminal,
  Server,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ServerSetup = () => {
  const { toast } = useToast();
  const [showSecrets, setShowSecrets] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can paste the command now.",
    });
  };

  const oneClickSetupScript = `#!/bin/bash
# One-click setup script for Crypto Card Nexus Server
echo "Starting Crypto Card Nexus server setup..."

# Update system
echo "Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker and Docker Compose
echo "Installing Docker and Docker Compose..."
apt-get install -y docker.io docker-compose
systemctl enable docker
systemctl start docker

# Create project directory
mkdir -p /opt/crypto-card-nexus
cd /opt/crypto-card-nexus

# Create docker-compose.yml
echo "Creating docker-compose configuration..."
cat > docker-compose.yml << 'EOL'
version: '3'
services:
  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: nexus
      POSTGRES_PASSWORD: change_this_password
      POSTGRES_DB: nexus
    restart: always
    
  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
    restart: always
    
  backend:
    image: nexusapp/backend:latest
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://nexus:change_this_password@postgres:5432/nexus
      REDIS_URL: redis://redis:6379
      JWT_SECRET: change_this_secret_key
      NODE_ENV: production
      PORT: 3000
    ports:
      - "3000:3000"
    restart: always
    
  frontend:
    image: nexusapp/frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

volumes:
  postgres_data:
  redis_data:
EOL

# Create security configuration
echo "Setting up security configurations..."
cat > security-setup.sh << 'EOL'
#!/bin/bash
# Setup security features

# Configure firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

# Setup automatic updates
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Setup fail2ban
apt-get install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

echo "Security setup complete"
EOL

chmod +x security-setup.sh

# Create SSL setup script
cat > setup-ssl.sh << 'EOL'
#!/bin/bash
# Setup SSL with Let's Encrypt

# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Ask for domain
read -p "Enter your domain name: " DOMAIN

# Get SSL certificate
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "SSL setup complete for $DOMAIN"
EOL

chmod +x setup-ssl.sh

# Start services
echo "Starting services..."
docker-compose pull
docker-compose up -d

echo "===================================="
echo "Crypto Card Nexus setup complete!"
echo "Access your server at http://YOUR_SERVER_IP"
echo "Run ./setup-ssl.sh to configure SSL"
echo "===================================="`;

  const manualSetupInstructions = `
# Manual Setup Instructions for Crypto Card Nexus

## System Requirements
- Ubuntu 20.04 LTS or newer
- 4GB RAM minimum (8GB recommended)
- 2 CPU cores minimum
- 20GB storage

## Step 1: Update System
\`\`\`bash
sudo apt-get update && sudo apt-get upgrade -y
\`\`\`

## Step 2: Install Dependencies
\`\`\`bash
sudo apt-get install -y nodejs npm postgresql redis-server nginx
\`\`\`

## Step 3: Configure PostgreSQL
\`\`\`bash
sudo -u postgres psql -c "CREATE USER nexus WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "CREATE DATABASE nexus OWNER nexus;"
\`\`\`

## Step 4: Clone Repository
\`\`\`bash
git clone https://github.com/your-organization/crypto-card-nexus.git
cd crypto-card-nexus
\`\`\`

## Step 5: Configure Environment
Create a .env file with the following settings:
\`\`\`
DATABASE_URL=postgresql://nexus:your_password@localhost:5432/nexus
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=3000
\`\`\`

## Step 6: Install and Build
\`\`\`bash
npm install
npm run build
\`\`\`

## Step 7: Configure Nginx
\`\`\`bash
sudo nano /etc/nginx/sites-available/crypto-card-nexus
\`\`\`

Add the following configuration:
\`\`\`
server {
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
}
\`\`\`

Enable the site:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/crypto-card-nexus /etc/nginx/sites-enabled/
sudo systemctl restart nginx
\`\`\`

## Step 8: Setup SSL with Certbot
\`\`\`bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
\`\`\`

## Step 9: Start the Application
\`\`\`bash
npm start
\`\`\`

## Step 10: Setup Process Manager (PM2)
\`\`\`bash
sudo npm install -g pm2
pm2 start npm --name "crypto-card-nexus" -- start
pm2 startup
pm2 save
\`\`\`

## Security Recommendations
1. Enable firewall (UFW)
2. Setup automatic updates
3. Use strong passwords
4. Setup fail2ban to prevent brute force attacks
5. Regularly update system and dependencies
`;

  const securityRecommendations = [
    "Use strong, unique passwords for all services",
    "Enable Two-Factor Authentication for admin accounts",
    "Keep system and application regularly updated",
    "Implement IP whitelisting for admin access",
    "Configure automated backups for database",
    "Monitor server logs for suspicious activity",
    "Use dedicated VPS or cloud instance (not shared hosting)",
    "Implement rate limiting for API endpoints",
    "Encrypt sensitive data at rest",
    "Perform regular security audits",
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Server Setup Guide</h1>
        <p className="text-muted-foreground">
          Complete guide for setting up the Crypto Card Nexus server in
          production.
        </p>
      </div>

      <Tabs defaultValue="one-click">
        <TabsList className="mb-4">
          <TabsTrigger value="one-click">One-Click Setup</TabsTrigger>
          <TabsTrigger value="manual">Manual Installation</TabsTrigger>
          <TabsTrigger value="security">Security Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="one-click">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                One-Click Server Setup
              </CardTitle>
              <CardDescription>
                Run our automated script to set up your server in minutes. Works
                on fresh Ubuntu installations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                <pre className="text-xs">{oneClickSetupScript}</pre>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(oneClickSetupScript)}
              >
                <ClipboardCopy className="h-4 w-4 mr-2" />
                Copy Script
              </Button>

              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Script
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Manual Installation Guide
              </CardTitle>
              <CardDescription>
                Follow these step-by-step instructions to set up your server
                manually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none bg-muted p-4 rounded-md overflow-auto max-h-[400px]"
                dangerouslySetInnerHTML={{ __html: manualSetupInstructions }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(manualSetupInstructions)}
              >
                <ClipboardCopy className="h-4 w-4 mr-2" />
                Copy Instructions
              </Button>

              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download as PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Best Practices
              </CardTitle>
              <CardDescription>
                Follow these security guidelines to protect your production
                server.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {securityRecommendations.map((recommendation, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm bg-muted/40 p-3 rounded-md"
                  >
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(securityRecommendations.join("\n"))
                }
              >
                <ClipboardCopy className="h-4 w-4 mr-2" />
                Copy Recommendations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Environment Configuration
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm font-medium mb-1">DATABASE_URL</p>
              <p className="text-xs font-mono">
                {showSecrets ? (
                  "postgresql://nexus:your_password@localhost:5432/nexus"
                ) : (
                  "••••••••••••••••••••••••••••••••••••••••••••••"
                )}
              </p>
            </div>
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm font-medium mb-1">JWT_SECRET</p>
              <p className="text-xs font-mono">
                {showSecrets ? (
                  "change_this_to_a_secure_random_string"
                ) : (
                  "••••••••••••••••••••••••••••••••"
                )}
              </p>
            </div>
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm font-medium mb-1">REDIS_URL</p>
              <p className="text-xs font-mono">
                {showSecrets ? (
                  "redis://localhost:6379"
                ) : (
                  "••••••••••••••••••••"
                )}
              </p>
            </div>
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm font-medium mb-1">CARD_API_KEY</p>
              <p className="text-xs font-mono">
                {showSecrets ? (
                  "sk_test_cardissuer12345678901234567890"
                ) : (
                  "••••••••••••••••••••••••••••••••"
                )}
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground">
          These environment variables should be set in your production server.
          Never share these values with unauthorized individuals.
        </p>
      </div>
    </div>
  );
};

export default ServerSetup;
