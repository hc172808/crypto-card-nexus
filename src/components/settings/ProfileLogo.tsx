
import { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Image, Upload, Trash2, X, Check } from "lucide-react";

const ProfileLogo = () => {
  const { toast } = useToast();
  const [logo, setLogo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndSetLogo(file);
    }
  };

  const validateAndSetLogo = (file: File) => {
    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, SVG).",
        variant: "destructive",
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setLogo(e.target?.result as string);
      toast({
        title: "Logo uploaded",
        description: "Your profile logo has been updated successfully.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      validateAndSetLogo(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeLogo = () => {
    setLogo(null);
    toast({
      title: "Logo removed",
      description: "Your profile logo has been removed.",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Profile Logo
        </CardTitle>
        <CardDescription>
          Upload your organization or personal logo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logo ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <img
                src={logo}
                alt="Profile Logo"
                className="w-full h-full object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={removeLogo}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Your logo will appear on cards, reports, and the mobile app
            </div>
            <Button
              variant="outline"
              onClick={triggerFileInput}
            >
              Change Logo
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">Upload your logo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <div className="text-xs text-muted-foreground mb-4">
              Accepted formats: JPG, PNG, SVG. Max size: 5MB
            </div>
            <Button
              variant="outline"
              onClick={triggerFileInput}
            >
              Choose File
            </Button>
          </div>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {logo && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-2">Logo Usage</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Mobile app branding</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Printed cards</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Reports and statements</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">White-labeled dashboard</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileLogo;
