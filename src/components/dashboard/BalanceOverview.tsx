
import { ArrowUp, ArrowDown, DollarSign, Bitcoin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BalanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Balance (USD)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,580.25</div>
          <p className="text-xs text-muted-foreground">
            +20% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Crypto Value
          </CardTitle>
          <Bitcoin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4,205.63</div>
          <div className="flex items-center pt-1">
            <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+12.5%</span>
            <span className="ml-1 text-xs text-muted-foreground">24h</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            This Month Spent
          </CardTitle>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,450.85</div>
          <div className="flex items-center pt-1">
            <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
            <span className="text-xs text-red-500">-8.2%</span>
            <span className="ml-1 text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Cards
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">3</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2 Visa, 1 MC</div>
          <p className="text-xs text-muted-foreground">
            All cards active and ready to use
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
