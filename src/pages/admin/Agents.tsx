
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
  Save,
  X,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const regions = [
  "North America",
  "Europe",
  "South America",
  "Asia Pacific",
  "Africa",
  "Middle East",
  "Global"
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
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    status: "active",
    region: "Global",
  });
  const [selectedAgent, setSelectedAgent] = useState<typeof mockAgents[0] | null>(null);
  const { toast } = useToast();

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAgentId = (agents.length + 1).toString();
    const agentToAdd = {
      id: newAgentId,
      name: newAgent.name,
      email: newAgent.email,
      status: newAgent.status,
      region: newAgent.region,
      assignedUsers: 0,
      kycApprovals: 0,
      lastActive: "Never",
    };

    setAgents([...agents, agentToAdd]);
    setNewAgent({ name: "", email: "", status: "active", region: "Global" });
    setIsAddAgentOpen(false);
    toast({
      title: "Success",
      description: "Agent added successfully",
    });
  };

  const handleEditAgent = () => {
    if (!selectedAgent) return;
    
    setAgents(
      agents.map((agent) => (agent.id === selectedAgent.id ? selectedAgent : agent))
    );
    
    setIsEditAgentOpen(false);
    toast({
      title: "Success",
      description: "Agent updated successfully",
    });
  };

  const openEditDialog = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setIsEditAgentOpen(true);
  };

  const updateSelectedAgentField = (field: string, value: string) => {
    if (!selectedAgent) return;
    setSelectedAgent({ ...selectedAgent, [field]: value });
  };

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
        <Button onClick={() => setIsAddAgentOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Agents</CardTitle>
          <CardDescription>
            Total of {agents.length} agents in the system
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
                          <DropdownMenuItem onClick={() => openEditDialog(agent)}>Edit Agent</DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Assigned Users</DropdownMenuItem>
                          <DropdownMenuItem>Edit Region</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            {agent.status === "active" ? "Deactivate" : "Activate"}
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

      {/* Add Agent Dialog */}
      <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Agent</DialogTitle>
            <DialogDescription>
              Create a new support agent account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
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
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={newAgent.status}
                onValueChange={(value) => setNewAgent({ ...newAgent, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Region
              </Label>
              <Select 
                value={newAgent.region}
                onValueChange={(value) => setNewAgent({ ...newAgent, region: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAgent}>
              Add Agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Agent Dialog */}
      <Dialog open={isEditAgentOpen} onOpenChange={setIsEditAgentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
            <DialogDescription>
              Update agent information
            </DialogDescription>
          </DialogHeader>
          {selectedAgent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedAgent.name}
                  onChange={(e) => updateSelectedAgentField("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedAgent.email}
                  onChange={(e) => updateSelectedAgentField("email", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={selectedAgent.status}
                  onValueChange={(value) => updateSelectedAgentField("status", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-region" className="text-right">
                  Region
                </Label>
                <Select 
                  value={selectedAgent.region}
                  onValueChange={(value) => updateSelectedAgentField("region", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditAgentOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleEditAgent}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentsAdminPage;
