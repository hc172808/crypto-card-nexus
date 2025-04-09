
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-nexus-500">404</h1>
          <p className="text-2xl font-semibold">Page not found</p>
        </div>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. Please check the URL and try again, or navigate back to the dashboard.
        </p>
        <Button className="gap-2" asChild>
          <a href="/">
            <Home className="h-4 w-4" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
