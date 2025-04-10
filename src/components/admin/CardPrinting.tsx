
import React, { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Printer, Download, RefreshCw, CreditCard } from "lucide-react";

type CardTemplate = "standard" | "premium" | "metal";

interface User {
  id: string;
  name: string;
  email: string;
  cardNumber?: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", cardNumber: "4111 **** **** 1234" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", cardNumber: "5555 **** **** 4321" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", cardNumber: "3782 **** **** 0001" },
];

const CardPrinting = () => {
  const { toast } = useToast();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [template, setTemplate] = useState<CardTemplate>("standard");
  const [isGenerating, setIsGenerating] = useState(false);
  const printFrameRef = useRef<HTMLIFrameElement>(null);
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const generateCards = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to print cards for.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate card generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Cards generated successfully",
        description: `Generated ${selectedUsers.length} cards ready for printing.`,
      });
    }, 1500);
  };

  const printCards = () => {
    if (printFrameRef.current?.contentWindow) {
      // Create a document with selected users' cards
      const doc = printFrameRef.current.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>Card Printing</title>
            <style>
              @media print {
                @page {
                  size: 3.375in 2.125in; /* Standard credit card size */
                  margin: 0;
                }
              }
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              .card-container {
                width: 3.375in;
                height: 2.125in;
                margin-bottom: 0.25in;
                page-break-after: always;
                position: relative;
                border: 1px solid #ddd;
                border-radius: 10px;
                overflow: hidden;
              }
              .card-front {
                width: 100%;
                height: 100%;
                background: ${template === 'premium' ? 'linear-gradient(135deg, #2a2a72, #009ffd)' : 
                             template === 'metal' ? 'linear-gradient(135deg, #333, #aaa)' : 
                             'linear-gradient(135deg, #7928CA, #FF0080)'};
                color: white;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .card-back {
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .logo {
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
              }
              .card-number {
                font-size: 16px;
                letter-spacing: 2px;
                margin: 15px 0;
              }
              .card-holder {
                font-size: 14px;
                text-transform: uppercase;
              }
              .barcode {
                height: 40px;
                background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px);
                margin-top: 10px;
              }
              .magnetic-strip {
                height: 40px;
                background: #333;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
      `);

      // Add cards for each selected user
      selectedUsers.forEach(userId => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          // Card front
          doc.write(`
            <div class="card-container">
              <div class="card-front">
                <div class="logo">NEXUS CARD</div>
                <div>
                  <div class="card-number">${user.cardNumber || 'XXXX XXXX XXXX XXXX'}</div>
                  <div class="card-holder">${user.name}</div>
                </div>
                <div class="barcode"></div>
              </div>
            </div>
          `);

          // Card back (on new page)
          doc.write(`
            <div class="card-container">
              <div class="card-back">
                <div class="magnetic-strip"></div>
                <div class="card-holder">${user.name}</div>
                <div class="barcode"></div>
              </div>
            </div>
          `);
        }
      });

      doc.write(`
          </body>
        </html>
      `);
      doc.close();
      
      // Print the document
      setTimeout(() => {
        printFrameRef.current?.contentWindow?.print();
      }, 500);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Printing Center
        </CardTitle>
        <CardDescription>
          Generate and print cards for your users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="template">Card Template</Label>
          <Select value={template} onValueChange={(value: CardTemplate) => setTemplate(value)}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Card</SelectItem>
              <SelectItem value="premium">Premium Card</SelectItem>
              <SelectItem value="metal">Metal Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search Users</Label>
          <Input
            id="search"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="grid grid-cols-12 text-xs font-medium">
              <div className="col-span-1">Select</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-3">Card Number</div>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className="grid grid-cols-12 py-2 px-4 hover:bg-muted/50 border-b last:border-0"
                >
                  <div className="col-span-1">
                    <input 
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="col-span-4">{user.name}</div>
                  <div className="col-span-4 text-muted-foreground">{user.email}</div>
                  <div className="col-span-3 font-mono text-xs">{user.cardNumber || "No card"}</div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No users found matching your search
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedUsers.length} users selected
        </div>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={generateCards} 
            disabled={selectedUsers.length === 0 || isGenerating}
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Generate Cards
          </Button>
          <Button 
            onClick={printCards} 
            disabled={selectedUsers.length === 0}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Cards
          </Button>
        </div>
      </CardFooter>
      <iframe 
        ref={printFrameRef} 
        style={{ display: 'none' }} 
        title="Print Frame" 
      />
    </Card>
  );
};

export default CardPrinting;
