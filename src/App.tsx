
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
import MySQLAdminPage from "./pages/admin/MySQLAdmin";
import AgentDashboard from "./pages/agent/Dashboard";
import AgentUsersPage from "./pages/agent/Users";
import AgentCardPrinting from "./pages/agent/CardPrinting";
import MobileApps from "./pages/MobileApps";
import PaymentMethods from "./pages/PaymentMethods";
import ApiAccess from "./pages/ApiAccess";
import ServerBackup from "./pages/admin/ServerBackup";
import WalletConnect from "./components/wallets/WalletConnect";

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
            <Route path="wallets/connect" element={<WalletConnect />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="mobile-apps" element={<MobileApps />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="api-access" element={<ApiAccess />} />
            
            {/* Admin Pages */}
            <Route path="admin/server-setup" element={<ServerSetup />} />
            <Route path="admin/users" element={<UsersAdminPage />} />
            <Route path="admin/agents" element={<AgentsAdminPage />} />
            <Route path="admin/mobile-apps" element={<MobileAppsAdminPage />} />
            <Route path="admin/mysql-admin" element={<MySQLAdminPage />} />
            <Route path="admin/backup" element={<ServerBackup />} />
            
            {/* Agent Pages */}
            <Route path="agent/dashboard" element={<AgentDashboard />} />
            <Route path="agent/users" element={<AgentUsersPage />} />
            <Route path="agent/card-printing" element={<AgentCardPrinting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
