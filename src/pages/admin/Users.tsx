
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
} from "lucide-react";

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
            <Users className="h-7 w-7" />
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor users, KYC status, and assigned cards.
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Total of {mockUsers.length} users in the system
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
    </div>
  );
};

export default UsersAdminPage;
