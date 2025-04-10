
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Home,
  Wallet,
  History,
  Settings,
  Menu,
  X,
  ServerCog,
  Users,
  UserCheck,
  Shield,
  Smartphone,
  Key,
  Printer,
  CreditCardIcon,
} from "lucide-react";

const SidebarLink = ({
  to,
  icon: Icon,
  children,
  collapsed,
}: {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  collapsed: boolean;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{children}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  
  // Determine user role based on pathname
  const isAdmin = pathname.startsWith("/admin");
  const isAgent = pathname.startsWith("/agent");

  return (
    <div
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="text-sidebar-foreground font-bold text-xl">Nexus</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex-1 py-4 px-2 space-y-1">
        {/* User Navigation */}
        {!isAdmin && !isAgent && (
          <>
            <SidebarLink to="/" icon={Home} collapsed={collapsed}>
              Dashboard
            </SidebarLink>
            <SidebarLink to="/cards" icon={CreditCard} collapsed={collapsed}>
              Cards
            </SidebarLink>
            <SidebarLink to="/wallets" icon={Wallet} collapsed={collapsed}>
              Wallets
            </SidebarLink>
            <SidebarLink to="/transactions" icon={History} collapsed={collapsed}>
              Transactions
            </SidebarLink>
            <SidebarLink to="/mobile-apps" icon={Smartphone} collapsed={collapsed}>
              Mobile Apps
            </SidebarLink>
            <SidebarLink to="/payment-methods" icon={CreditCardIcon} collapsed={collapsed}>
              Payment Methods
            </SidebarLink>
            <SidebarLink to="/api-access" icon={Key} collapsed={collapsed}>
              API Access
            </SidebarLink>
            <SidebarLink to="/settings" icon={Settings} collapsed={collapsed}>
              Settings
            </SidebarLink>
          </>
        )}

        {/* Admin Navigation */}
        {isAdmin && (
          <>
            <SidebarLink to="/admin/server-setup" icon={ServerCog} collapsed={collapsed}>
              Server Setup
            </SidebarLink>
            <SidebarLink to="/admin/users" icon={Users} collapsed={collapsed}>
              Users
            </SidebarLink>
            <SidebarLink to="/admin/agents" icon={UserCheck} collapsed={collapsed}>
              Agents
            </SidebarLink>
            <SidebarLink to="/admin/mobile-apps" icon={Smartphone} collapsed={collapsed}>
              Mobile Apps
            </SidebarLink>
            <SidebarLink to="/" icon={Home} collapsed={collapsed}>
              Back to Dashboard
            </SidebarLink>
          </>
        )}

        {/* Agent Navigation */}
        {isAgent && (
          <>
            <SidebarLink to="/agent/dashboard" icon={Home} collapsed={collapsed}>
              Agent Dashboard
            </SidebarLink>
            <SidebarLink to="/agent/users" icon={Users} collapsed={collapsed}>
              Assigned Users
            </SidebarLink>
            <SidebarLink to="/agent/card-printing" icon={Printer} collapsed={collapsed}>
              Card Printing
            </SidebarLink>
            <SidebarLink to="/" icon={Home} collapsed={collapsed}>
              Back to Dashboard
            </SidebarLink>
          </>
        )}

        {/* Link to admin section for regular users */}
        {!isAdmin && !isAgent && (
          <>
            <Separator className="my-2 bg-sidebar-border" />
            <SidebarLink to="/admin/server-setup" icon={Shield} collapsed={collapsed}>
              Admin Area
            </SidebarLink>
          </>
        )}
      </div>

      <div className="p-4">
        {!collapsed && (
          <div className="bg-sidebar-accent rounded-lg p-3 text-xs text-sidebar-foreground">
            <p className="font-medium mb-1">Need help?</p>
            <p className="opacity-80">
              Our support team is available 24/7
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
