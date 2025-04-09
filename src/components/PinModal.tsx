
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  isNewPin?: boolean;
}

export function PinModal({
  open,
  onOpenChange,
  onSuccess,
  isNewPin = false,
}: PinModalProps) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setPin("");
      setConfirmPin("");
      setError(null);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for PIN
    if (pin.length < 6 || pin.length > 20) {
      setError("PIN must be between 6-20 digits long");
      return;
    }

    // If this is a new pin, confirm it matches
    if (isNewPin) {
      if (pin !== confirmPin) {
        setError("PINs do not match");
        return;
      }

      // Save new PIN (in a real app, this would be encrypted and sent to server)
      localStorage.setItem("user_pin", pin);
      toast({
        title: "PIN Created",
        description: "Your PIN has been successfully set",
      });
    } else {
      // Verify existing PIN (in a real app, this would be verified against server)
      const savedPin = localStorage.getItem("user_pin") || "123456"; // Default for demo
      if (pin !== savedPin) {
        setError("Incorrect PIN");
        return;
      }
    }

    setError(null);
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {isNewPin ? "Create Your PIN" : "Enter Your PIN"}
            </DialogTitle>
            <DialogDescription>
              {isNewPin
                ? "Create a secure PIN code between 6-20 digits. You'll use this to access sensitive information."
                : "Enter your PIN code to continue."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="pin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {isNewPin ? "New PIN" : "PIN"}
              </label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="font-mono text-lg tracking-widest"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={6}
                maxLength={20}
                autoComplete="off"
              />
            </div>

            {isNewPin && (
              <div className="space-y-2">
                <label
                  htmlFor="confirm-pin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirm PIN
                </label>
                <Input
                  id="confirm-pin"
                  type="password"
                  placeholder="Confirm your PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="font-mono text-lg tracking-widest"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  minLength={6}
                  maxLength={20}
                  autoComplete="off"
                />
              </div>
            )}

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isNewPin ? "Create PIN" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
