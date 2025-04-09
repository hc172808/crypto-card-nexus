
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { PinModal } from "@/components/PinModal";

export function AppLayout() {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const hasPin = localStorage.getItem("user_pin") !== null;
    
    // If user has a PIN, show the PIN modal
    if (hasPin && !isAuthenticated) {
      setIsPinModalOpen(true);
    } else {
      // If no PIN is set, create a default one and mark as authenticated
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const handlePinSuccess = () => {
    setIsAuthenticated(true);
    setIsPinModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          {isAuthenticated ? <Outlet /> : <div className="flex items-center justify-center h-full">Authenticating...</div>}
        </div>
      </main>
      <Toaster />
      
      <PinModal 
        open={isPinModalOpen}
        onOpenChange={setIsPinModalOpen}
        onSuccess={handlePinSuccess}
        isNewPin={!localStorage.getItem("user_pin")}
      />
    </div>
  );
}
