
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  UserCheck,
  CreditCard,
  Wallet,
  History,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app this would come from the API
const mockAssignedUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    kycStatus: "verified",
    wallets: 2,
    cards: 1,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    kycStatus: "pending",
    wallets: 1,
    cards: 0,
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Mark Williams",
    email: "mark@example.com",
    status: "inactive",
    kycStatus: "rejected",
    wallets: 0,
    cards: 0,
    lastActive: "1 week ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "active",
    kycStatus: "pending",
    wallets: 3,
    cards: 2,
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Robert Thompson",
    email: "robert@example.com",
    status: "active",
    kycStatus: "verified",
    wallets: 1,
    cards: 1,
    lastActive: "Just now",
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

const AgentUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockAssignedUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="h-7 w-7" />
            Assigned Users
          </h1>
          <p className="text-muted-foreground">
            Manage and assist users assigned to you
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>KYC Verification Requests</CardTitle>
          <CardDescription>
            Users awaiting KYC verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.filter(user => user.kycStatus === "pending").map(user => (
              <div key={user.id} className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div>
                  <Button size="sm">Review KYC</Button>
                </div>
              </div>
            ))}
            
            {users.filter(user => user.kycStatus === "pending").length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No pending KYC verification requests
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Assigned Users</CardTitle>
          <CardDescription>
            Total of {users.length} users assigned to you
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
                  <TableHead>Status</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Wallets</TableHead>
                  <TableHead>Cards</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>
                      <KYCStatusBadge status={user.kycStatus} />
                    </TableCell>
                    <TableCell>{user.wallets}</TableCell>
                    <TableCell>{user.cards}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            KYC Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            View Wallets
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Manage Cards
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <History className="h-4 w-4" />
                            Transaction History
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
    </div>
  );
};

export default AgentUsersPage;
