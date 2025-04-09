
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  FileCheck,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

// Mock data - in a real app this would come from the API
const pendingTasks = [
  { 
    id: "1", 
    type: "kyc", 
    user: "John Doe", 
    userEmail: "john.doe@example.com", 
    status: "pending", 
    timeSubmitted: "2 hours ago", 
    urgency: "high"
  },
  { 
    id: "2", 
    type: "card_request", 
    user: "Alice Johnson", 
    userEmail: "alice@example.com", 
    status: "pending", 
    timeSubmitted: "5 hours ago", 
    urgency: "medium"
  },
  { 
    id: "3", 
    type: "support", 
    user: "Mark Williams", 
    userEmail: "mark@example.com", 
    status: "pending", 
    timeSubmitted: "1 day ago", 
    urgency: "low"
  },
  { 
    id: "4", 
    type: "kyc", 
    user: "Emily Davis", 
    userEmail: "emily@example.com", 
    status: "pending", 
    timeSubmitted: "3 hours ago", 
    urgency: "high"
  },
];

const recentCompletions = [
  { 
    id: "101", 
    type: "kyc", 
    user: "Robert Thompson", 
    userEmail: "robert@example.com", 
    result: "approved", 
    completedAt: "1 hour ago"
  },
  { 
    id: "102", 
    type: "card_request", 
    user: "Jennifer Moore", 
    userEmail: "jennifer@example.com", 
    result: "approved", 
    completedAt: "3 hours ago"
  },
  { 
    id: "103", 
    type: "kyc", 
    user: "Michael Brown", 
    userEmail: "michael@example.com", 
    result: "rejected", 
    completedAt: "5 hours ago"
  },
];

const UserStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500">Approved</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const UrgencyBadge = ({ urgency }: { urgency: string }) => {
  switch (urgency) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
    case "low":
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="outline">{urgency}</Badge>;
  }
};

const AgentDashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your assigned tasks and monitor user requests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500">Online</Badge>
          <span className="text-sm font-medium">Agent: Michelle Chang</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Assigned Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">21</div>
                <p className="text-xs text-muted-foreground">Active users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{pendingTasks.length}</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <FileCheck className="h-8 w-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Tasks completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pending Tasks
              </CardTitle>
              <CardDescription>
                Tasks requiring your immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {task.type === "kyc" ? (
                              <UserCheck className="h-4 w-4" />
                            ) : task.type === "card_request" ? (
                              <CreditCard className="h-4 w-4" />
                            ) : (
                              <FileCheck className="h-4 w-4" />
                            )}
                            <span className="capitalize">
                              {task.type.replace("_", " ")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.user}</div>
                            <div className="text-xs text-muted-foreground">
                              {task.userEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{task.timeSubmitted}</TableCell>
                        <TableCell>
                          <UrgencyBadge urgency={task.urgency} />
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            Review
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Recent Completions
            </CardTitle>
            <CardDescription>
              Tasks you've recently completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCompletions.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="mt-0.5">
                    {task.type === "kyc" ? (
                      <UserCheck className="h-5 w-5 text-muted-foreground" />
                    ) : task.type === "card_request" ? (
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <FileCheck className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium capitalize">
                          {task.type.replace("_", " ")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {task.user}
                        </div>
                      </div>
                      <UserStatusBadge status={task.result} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Completed {task.completedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
