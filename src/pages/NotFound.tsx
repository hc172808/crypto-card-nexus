
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="flex flex-col items-center">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-nexus-500">404</h1>
          <p className="text-2xl font-semibold">Page not found</p>
        </div>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. The URL <span className="font-mono bg-muted px-2 py-1 rounded text-xs">{location.pathname}</span> doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="gap-2" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button className="gap-2" variant="default" asChild>
            <a href="/">
              <Home className="h-4 w-4" />
              Return to Dashboard
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
