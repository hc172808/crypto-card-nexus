
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Users,
  Filter,
  X,
  Save,
  CreditCard,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app this would come from the API
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    kycStatus: "verified",
    wallets: 2,
    cards: 1,
    createdAt: "2023-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    kycStatus: "pending",
    wallets: 1,
    cards: 0,
    createdAt: "2023-04-22",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    status: "inactive",
    kycStatus: "rejected",
    wallets: 0,
    cards: 0,
    createdAt: "2023-02-10",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "active",
    kycStatus: "verified",
    wallets: 3,
    cards: 2,
    createdAt: "2023-01-05",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    kycStatus: "verified",
    wallets: 1,
    cards: 1,
    createdAt: "2023-05-18",
  },
];

const UserStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const KYCStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-green-500">Verified</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const UsersAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    status: "active",
    kycStatus: "pending",
  });
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isPrintCardOpen, setIsPrintCardOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newUserId = (users.length + 1).toString();
    const userToAdd = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status,
      kycStatus: newUser.kycStatus,
      wallets: 0,
      cards: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: "", email: "", status: "active", kycStatus: "pending" });
    setIsAddUserOpen(false);
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handlePrintCard = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsPrintCardOpen(true);
  };

  const printCard = () => {
    toast({
      title: "Success",
      description: `Virtual card for ${selectedUser?.name} sent to printing queue`,
    });
    setIsPrintCardOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7" />
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor users, KYC status, and assigned cards.
          </p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Total of {users.length} users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Wallets</TableHead>
                  <TableHead>Cards</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <UserStatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>
                      <KYCStatusBadge status={user.kycStatus} />
                    </TableCell>
                    <TableCell>{user.wallets}</TableCell>
                    <TableCell>{user.cards}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handlePrintCard(user)}>
                            Print Virtual Card
                          </DropdownMenuItem>
                          <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                          <DropdownMenuItem>View KYC Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Print Virtual Card Dialog */}
      <Dialog open={isPrintCardOpen} onOpenChange={setIsPrintCardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Print Virtual Card</DialogTitle>
            <DialogDescription>
              Generate a virtual card for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.5),rgba(0,0,0,0))]"></div>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between">
                    <div className="font-bold text-lg">NEXUS CARD</div>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-mono my-2">**** **** **** 4321</div>
                    <div className="text-xs uppercase">{selectedUser?.name}</div>
                    <div className="text-xs">VALID THRU 04/28</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-md aspect-[1.6/1] bg-gray-100 rounded-xl p-4 relative overflow-hidden">
                <div className="h-10 bg-black w-full my-4"></div>
                <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 w-full my-4"></div>
                <div className="text-xs text-center mt-2">
                  This card remains the property of Nexus Card Ltd.
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={printCard}>
              Print Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersAdminPage;
