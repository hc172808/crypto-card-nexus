
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
  UsersRound,
  Filter,
  UserCheck,
} from "lucide-react";

// Mock data - in a real app this would come from the API
const mockAgents = [
  {
    id: "1",
    name: "Robert Wilson",
    email: "robert@example.com",
    status: "active",
    assignedUsers: 15,
    region: "North America",
    kycApprovals: 25,
    lastActive: "1 hour ago",
  },
  {
    id: "2",
    name: "Amanda Lewis",
    email: "amanda@example.com",
    status: "active",
    assignedUsers: 8,
    region: "Europe",
    kycApprovals: 17,
    lastActive: "3 hours ago",
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    status: "inactive",
    assignedUsers: 0,
    region: "South America",
    kycApprovals: 32,
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Michelle Chang",
    email: "michelle@example.com",
    status: "active",
    assignedUsers: 21,
    region: "Asia Pacific",
    kycApprovals: 41,
    lastActive: "Just now",
  },
  {
    id: "5",
    name: "Kevin Smith",
    email: "kevin@example.com",
    status: "pending",
    assignedUsers: 0,
    region: "Global",
    kycApprovals: 0,
    lastActive: "Never",
  },
];

const AgentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const AgentsAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState(mockAgents);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="h-7 w-7" />
            Agent Management
          </h1>
          <p className="text-muted-foreground">
            Manage support agents and track their performance.
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Agents</CardTitle>
          <CardDescription>
            Total of {mockAgents.length} agents in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or region..."
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
                  <TableHead>Region</TableHead>
                  <TableHead>Assigned Users</TableHead>
                  <TableHead>KYC Approvals</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>
                      <AgentStatusBadge status={agent.status} />
                    </TableCell>
                    <TableCell>{agent.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <UsersRound className="h-4 w-4 mr-2 text-muted-foreground" />
                        {agent.assignedUsers}
                      </div>
                    </TableCell>
                    <TableCell>{agent.kycApprovals}</TableCell>
                    <TableCell>{agent.lastActive}</TableCell>
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
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Assigned Users</DropdownMenuItem>
                          <DropdownMenuItem>Edit Region</DropdownMenuItem>
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

export default AgentsAdminPage;
