
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
import { Printer, Download, RefreshCw, CreditCard, Edit, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";

type CardTemplate = "standard" | "premium" | "metal";
type CardType = "virtual" | "physical";

interface User {
  id: string;
  name: string;
  email: string;
  cardNumber?: string;
  customCardName?: string;
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
  const [cardType, setCardType] = useState<CardType>("virtual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const printFrameRef = useRef<HTMLIFrameElement>(null);
  
  // For card customization
  const [isCustomizeCardOpen, setIsCustomizeCardOpen] = useState(false);
  const [customizingUser, setCustomizingUser] = useState<User | null>(null);
  const [customCardName, setCustomCardName] = useState("");
  
  const filteredUsers = users.filter(user => 
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
        description: `Generated ${selectedUsers.length} ${cardType} cards ready for printing.`,
      });
    }, 1500);
  };

  const openCustomizeCard = (user: User) => {
    setCustomizingUser(user);
    setCustomCardName(user.customCardName || user.name);
    setIsCustomizeCardOpen(true);
  };

  const saveCustomCardName = () => {
    if (!customizingUser) return;
    
    setUsers(users.map(user => 
      user.id === customizingUser.id 
        ? { ...user, customCardName: customCardName } 
        : user
    ));
    
    setIsCustomizeCardOpen(false);
    toast({
      title: "Card Customized",
      description: `Custom card name saved for ${customizingUser.name}.`,
    });
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
              .card-type {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 10px;
                text-transform: uppercase;
                background: rgba(255,255,255,0.2);
                padding: 2px 6px;
                border-radius: 10px;
              }
            </style>
          </head>
          <body>
      `);

      // Add cards for each selected user
      selectedUsers.forEach(userId => {
        const user = users.find(u => u.id === userId);
        if (user) {
          // Card front
          doc.write(`
            <div class="card-container">
              <div class="card-front">
                <div class="logo">NEXUS CARD</div>
                <div class="card-type">${cardType}</div>
                <div>
                  <div class="card-number">${user.cardNumber || 'XXXX XXXX XXXX XXXX'}</div>
                  <div class="card-holder">${user.customCardName || user.name}</div>
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
                <div class="card-holder">${user.customCardName || user.name}</div>
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
        <Tabs value={cardType} onValueChange={(value) => setCardType(value as CardType)}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="virtual">Virtual Cards</TabsTrigger>
            <TabsTrigger value="physical">Physical Cards</TabsTrigger>
          </TabsList>
          <TabsContent value="virtual" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Virtual cards can be issued instantly and used for online transactions.
            </p>
          </TabsContent>
          <TabsContent value="physical" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Physical cards will be printed and mailed to the user's registered address.
            </p>
          </TabsContent>
        </Tabs>

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
            <div className="grid grid-cols-[1fr_3fr_3fr_3fr_2fr] text-xs font-medium">
              <div>Select</div>
              <div>Name</div>
              <div>Email</div>
              <div>Card Number</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className="grid grid-cols-[1fr_3fr_3fr_3fr_2fr] py-2 px-4 hover:bg-muted/50 border-b last:border-0 items-center"
                >
                  <div>
                    <input 
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4"
                    />
                  </div>
                  <div>{user.customCardName || user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                  <div className="font-mono text-xs">{user.cardNumber || "No card"}</div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openCustomizeCard(user)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> 
                      Customize Card
                    </Button>
                  </div>
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

      {/* Card Customization Dialog */}
      <Dialog open={isCustomizeCardOpen} onOpenChange={setIsCustomizeCardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize Card</DialogTitle>
            <DialogDescription>
              Customize the card name for {customizingUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="custom-name">Card Display Name</Label>
              <Input
                id="custom-name"
                value={customCardName}
                onChange={(e) => setCustomCardName(e.target.value)}
                placeholder="Enter custom name to display on the card"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This name will be printed on the card. Leave blank to use the user's actual name.
              </p>
            </div>

            {/* Preview of the card */}
            <div className="mt-4">
              <Label>Card Preview</Label>
              <div className="mt-2 w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.5),rgba(0,0,0,0))]"></div>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between">
                    <div className="font-bold text-lg">NEXUS CARD</div>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-mono my-2">**** **** **** {customizingUser?.cardNumber?.slice(-4) || "1234"}</div>
                    <div className="text-xs uppercase font-bold">{customCardName || customizingUser?.name}</div>
                    <div className="text-xs">VALID THRU 04/28</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizeCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCustomCardName}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <iframe 
        ref={printFrameRef} 
        style={{ display: 'none' }} 
        title="Print Frame" 
      />
    </Card>
  );
};

export default CardPrinting;
