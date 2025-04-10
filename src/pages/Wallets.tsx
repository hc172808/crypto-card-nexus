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
  CreditCard,
  Wallet,
  RefreshCw,
  Building, // Using Building instead of Bank
  CreditCardIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { MoreVertical, Copy, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Wallets = () => {
  const { toast } = useToast();

  const onConnect = () => {
    toast({
      title: "Connect Wallet",
      description: "Connecting to your crypto wallet...",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wallet className="h-7 w-7" />
          Wallets
        </h1>
        <p className="text-muted-foreground">
          Manage your crypto wallets and connect them to your cards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Virtual Card
            </CardTitle>
            <CardDescription>Your primary virtual card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      John Doe
                    </p>
                    <p className="text-sm text-muted-foreground">
                      johndoe@example.com
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  $1,250.00
                </h3>
                <p className="text-sm text-muted-foreground">
                  Available balance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Crypto Wallet
            </CardTitle>
            <CardDescription>Connect your crypto wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Ethereum Wallet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      0x1234...5678
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Connected</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  5.25 ETH
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wallet balance
                </p>
              </div>
            </div>
          </CardContent>
          <Button
            variant="outline" // Change from "success" to "outline"
            size="sm"
            onClick={onConnect}
          >
            Connect
          </Button>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Bank Account
            </CardTitle>
            <CardDescription>Link your bank account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Bank of America
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ****1234
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Linked</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  $10,000.00
                </h3>
                <p className="text-sm text-muted-foreground">
                  Account balance
                </p>
              </div>
            </div>
          </CardContent>
          <Button
            variant="outline" // Change from "success" to "outline"
            size="sm"
            onClick={onConnect}
          >
            Connect
          </Button>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent transactions across all wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Jan 9, 2024</TableCell>
                  <TableCell>Payment to John Doe</TableCell>
                  <TableCell>Virtual Card</TableCell>
                  <TableCell className="text-right">-$50.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jan 8, 2024</TableCell>
                  <TableCell>Received from Jane Smith</TableCell>
                  <TableCell>Ethereum Wallet</TableCell>
                  <TableCell className="text-right">+$100.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jan 7, 2024</TableCell>
                  <TableCell>Transfer to Bank of America</TableCell>
                  <TableCell>Virtual Card</TableCell>
                  <TableCell className="text-right">-$200.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallets;
