
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ClipboardCopy,
  Database,
  Shield,
  Terminal,
  Key,
  Copy,
  ExternalLink,
  BookOpen,
  Lock,
  Save,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MySQLAdminPage = () => {
  const { toast } = useToast();
  const [showPasswords, setShowPasswords] = useState(false);
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: message,
    });
  };

  // Form schema for phpMyAdmin
  const phpMyAdminSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    port: z.string().regex(/^\d+$/, "Port must be a number"),
    host: z.string().min(1, "Host is required"),
  });

  // Form schema for system admin
  const sysAdminSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters and include uppercase, lowercase, numbers")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must include uppercase, lowercase, and numbers"),
    sshKey: z.string().optional(),
  });

  const phpMyAdminForm = useForm<z.infer<typeof phpMyAdminSchema>>({
    resolver: zodResolver(phpMyAdminSchema),
    defaultValues: {
      username: "admin",
      password: "",
      port: "3306",
      host: "localhost",
    },
  });

  const sysAdminForm = useForm<z.infer<typeof sysAdminSchema>>({
    resolver: zodResolver(sysAdminSchema),
    defaultValues: {
      username: "sysadmin",
      password: "",
      sshKey: "",
    },
  });

  const onPhpMyAdminSubmit = (values: z.infer<typeof phpMyAdminSchema>) => {
    toast({
      title: "phpMyAdmin Settings Saved",
      description: "Your phpMyAdmin credentials have been updated successfully.",
    });
    console.log("phpMyAdmin settings:", values);
  };

  const onSysAdminSubmit = (values: z.infer<typeof sysAdminSchema>) => {
    toast({
      title: "System Admin Settings Saved",
      description: "Your system administrator credentials have been updated successfully.",
    });
    console.log("SysAdmin settings:", values);
  };

  const linuxSetupGuide = `
# Ubuntu/Linux Setup Guide for Crypto Card Nexus Server

## System Requirements
- Ubuntu 20.04 LTS or newer (recommended)
- 4GB RAM minimum (8GB recommended)
- 2+ CPU cores
- 40GB disk space

## Step 1: Initial Server Setup

Update system packages:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

Install basic tools:
\`\`\`bash
sudo apt install -y curl wget git htop vim unzip
\`\`\`

## Step 2: Install Docker and Docker Compose

\`\`\`bash
# Install Docker
sudo apt install -y docker.io

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
\`\`\`

## Step 3: Install MySQL Server

\`\`\`bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure the MySQL installation
sudo mysql_secure_installation

# Set up MySQL user with password authentication
sudo mysql
CREATE USER 'nexusadmin'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON *.* TO 'nexusadmin'@'localhost';
FLUSH PRIVILEGES;
exit;
\`\`\`

## Step 4: Install phpMyAdmin

\`\`\`bash
# Install apache2
sudo apt install -y apache2

# Install phpMyAdmin
sudo apt install -y phpmyadmin php-mbstring php-zip php-gd php-json php-curl

# Configure phpMyAdmin with apache
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin
sudo systemctl restart apache2

# Secure phpMyAdmin with .htaccess
sudo cp /usr/share/phpmyadmin/.htaccess.example /usr/share/phpmyadmin/.htaccess
sudo vim /usr/share/phpmyadmin/.htaccess
# Add: 
# AuthType Basic
# AuthName "Restricted Files"
# AuthUserFile /etc/phpmyadmin/.htpasswd
# Require valid-user

# Create an .htpasswd file
sudo htpasswd -c /etc/phpmyadmin/.htpasswd admin
\`\`\`

## Step 5: Configure Firewall

\`\`\`bash
# Enable UFW and allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# Check status
sudo ufw status
\`\`\`

## Step 6: Set Up SSL with Let's Encrypt

\`\`\`bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
\`\`\`

## Step 7: Deploy Crypto Card Nexus Application

\`\`\`bash
# Clone the application repository
git clone https://github.com/your-organization/crypto-card-nexus.git
cd crypto-card-nexus

# Copy environment file and configure
cp .env.example .env
nano .env

# Configure database settings in .env file:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=nexus
# DB_USERNAME=nexusadmin
# DB_PASSWORD=your_strong_password

# Start the application using Docker Compose
docker-compose up -d
\`\`\`

## Step 8: Set Up Automatic Updates

\`\`\`bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
\`\`\`

## Step 9: Configure System Monitoring

\`\`\`bash
# Install Prometheus and Node Exporter
sudo apt install -y prometheus prometheus-node-exporter

# Install and configure Grafana
sudo apt-get install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install -y grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
\`\`\`

## Step 10: Set Up Regular Backups

\`\`\`bash
# Create backup directory
sudo mkdir -p /var/backups/crypto-nexus

# Create backup script
cat > /usr/local/bin/backup-nexus.sh << 'EOL'
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="/var/backups/crypto-nexus"
MYSQL_USER="nexusadmin"
MYSQL_PASSWORD="your_strong_password"

# Backup MySQL databases
mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD --all-databases > $BACKUP_DIR/mysql-all-$TIMESTAMP.sql

# Backup application files
tar -zcf $BACKUP_DIR/app-files-$TIMESTAMP.tar.gz -C /path/to/crypto-card-nexus .

# Keep only last 7 backups
find $BACKUP_DIR -name "mysql-all-*.sql" -type f -mtime +7 -delete
find $BACKUP_DIR -name "app-files-*.tar.gz" -type f -mtime +7 -delete
EOL

# Make script executable
sudo chmod +x /usr/local/bin/backup-nexus.sh

# Add to crontab to run daily at 2 AM
echo "0 2 * * * /usr/local/bin/backup-nexus.sh" | sudo tee -a /etc/crontab
\`\`\`

## Step 11: Securing the System

\`\`\`bash
# Install fail2ban to prevent brute force attacks
sudo apt install -y fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Configure SSH security
sudo nano /etc/ssh/sshd_config
# Set these values:
# PermitRootLogin no
# PasswordAuthentication no
# MaxAuthTries 3
# AllowUsers your_username

# Restart SSH service
sudo systemctl restart sshd
\`\`\`

## Step 12: Additional Security Recommendations

1. Use strong, unique passwords for all accounts
2. Enable 2FA for SSH access using Google Authenticator
3. Set up log monitoring with ELK stack or similar tools
4. Regularly check system logs for suspicious activities
5. Keep all software up-to-date
6. Consider running malware and rootkit scans periodically
7. Implement network intrusion detection
8. Create a disaster recovery plan and test it

For further assistance, please contact the support team.
  `;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">MySQL Administration</h1>
        <p className="text-muted-foreground">
          Manage your database access and system administration credentials
        </p>
      </div>

      <Tabs defaultValue="phpmyadmin">
        <TabsList className="mb-4">
          <TabsTrigger value="phpmyadmin">phpMyAdmin</TabsTrigger>
          <TabsTrigger value="sysadmin">System Admin</TabsTrigger>
          <TabsTrigger value="setup-guide">Ubuntu/Linux Setup Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="phpmyadmin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                phpMyAdmin Configuration
              </CardTitle>
              <CardDescription>
                Configure access to your MySQL database through phpMyAdmin interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...phpMyAdminForm}>
                <form onSubmit={phpMyAdminForm.handleSubmit(onPhpMyAdminSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={phpMyAdminForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Database administrator username</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={phpMyAdminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPasswords ? "text" : "password"} 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Secure password for database access</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={phpMyAdminForm.control}
                      name="host"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Database host address</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={phpMyAdminForm.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>MySQL server port (default: 3306)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowPasswords(!showPasswords)}>
                      {showPasswords ? "Hide Passwords" : "Show Passwords"}
                    </Button>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">phpMyAdmin Access URL</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard("https://your-domain.com/phpmyadmin", "phpMyAdmin URL copied")}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">https://your-domain.com/phpmyadmin</p>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save phpMyAdmin Configuration
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sysadmin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Administrator Access
              </CardTitle>
              <CardDescription>
                Configure system administrator credentials for server access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...sysAdminForm}>
                <form onSubmit={sysAdminForm.handleSubmit(onSysAdminSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={sysAdminForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>System administrator username</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sysAdminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showPasswords ? "text" : "password"} 
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Strong password for system access</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={sysAdminForm.control}
                    name="sshKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SSH Public Key (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="ssh-rsa AAAAB3NzaC1yc2E..." />
                        </FormControl>
                        <FormDescription>For key-based authentication (more secure than password)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowPasswords(!showPasswords)}>
                      {showPasswords ? "Hide Passwords" : "Show Passwords"}
                    </Button>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">SSH Access Command</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard("ssh sysadmin@your-server-ip", "SSH command copied")}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <code className="text-sm bg-muted-foreground/10 p-1 rounded">ssh sysadmin@your-server-ip</code>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save System Admin Configuration
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup-guide">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Ubuntu/Linux Server Setup Guide
              </CardTitle>
              <CardDescription>
                Complete guide for setting up the server environment on Ubuntu/Linux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[600px]">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="text-xs whitespace-pre-wrap">
                    {linuxSetupGuide}
                  </pre>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => copyToClipboard(linuxSetupGuide, "Setup guide copied to clipboard")}>
                <ClipboardCopy className="h-4 w-4 mr-2" />
                Copy Guide
              </Button>
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Detailed Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySQLAdminPage;
