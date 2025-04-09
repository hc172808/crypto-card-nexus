
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-r from-nexus-700 to-nexus-900 text-white border-none">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="text-white/80">
              Your financial overview is looking good today.
            </p>
          </div>
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
            View Reports <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
