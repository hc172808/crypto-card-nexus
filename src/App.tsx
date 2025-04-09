
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Cards from "./pages/Cards";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ServerSetup from "./pages/admin/ServerSetup";
import UsersAdminPage from "./pages/admin/Users";
import AgentsAdminPage from "./pages/admin/Agents";
import MobileAppsAdminPage from "./pages/admin/MobileApps";
import AgentDashboard from "./pages/agent/Dashboard";
import AgentUsersPage from "./pages/agent/Users";
import MobileApps from "./pages/MobileApps";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="cards" element={<Cards />} />
            <Route path="wallets" element={<Wallets />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="mobile-apps" element={<MobileApps />} />
            
            {/* Admin Pages */}
            <Route path="admin/server-setup" element={<ServerSetup />} />
            <Route path="admin/users" element={<UsersAdminPage />} />
            <Route path="admin/agents" element={<AgentsAdminPage />} />
            <Route path="admin/mobile-apps" element={<MobileAppsAdminPage />} />
            
            {/* Agent Pages */}
            <Route path="agent/dashboard" element={<AgentDashboard />} />
            <Route path="agent/users" element={<AgentUsersPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
