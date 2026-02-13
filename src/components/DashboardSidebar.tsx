import { useState } from "react";
import { ChatMode, modes } from "@/lib/modes";
import { Plus, MessageSquare, LogOut, ChevronLeft, ChevronRight, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface Conversation {
  id: string;
  title: string;
  mode: ChatMode;
}

interface DashboardSidebarProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const DashboardSidebar = ({
  currentMode,
  onModeChange,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}: DashboardSidebarProps) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const isVisible = isMobile ? mobileOpen : true;
  const isCollapsedState = isMobile ? false : collapsed;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const modeConversations = conversations.filter(c => c.mode === currentMode);

  return (
    <>
      {/* Mobile hamburger */}
      {isMobile && !mobileOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="fixed left-2 top-2 z-50 h-10 w-10 bg-sidebar text-sidebar-foreground rounded-lg shadow-lg md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}

    <div className={cn(
      "flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
      isMobile ? "fixed inset-y-0 left-0 z-50 w-64 shadow-2xl" : (isCollapsedState ? "w-16" : "w-64"),
      isMobile && !mobileOpen && "-translate-x-full"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-sidebar-border p-3">
        {!isCollapsedState && <span className="font-heading text-sm font-bold text-sidebar-primary">Martha</span>}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mode selector */}
      <div className="space-y-1 p-2">
        {(Object.entries(modes) as [ChatMode, typeof modes[ChatMode]][]).map(([key, mode]) => {
          const Icon = mode.icon;
          return (
            <button
              key={key}
              onClick={() => { onModeChange(key); if (isMobile) setMobileOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                currentMode === key
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", mode.color)} />
              {!isCollapsedState && <span>{mode.label}</span>}
            </button>
          );
        })}
      </div>

      {/* New chat */}
      <div className="px-2 py-1">
        <Button
          onClick={() => { onNewConversation(); if (isMobile) setMobileOpen(false); }}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsedState && "justify-center"
          )}
          size="sm"
        >
          <Plus className="h-4 w-4" />
          {!isCollapsedState && "New Chat"}
        </Button>
      </div>

      {/* History */}
      {!isCollapsedState && (
        <div className="flex-1 overflow-y-auto px-2 py-1">
          <p className="px-3 py-1.5 text-xs font-medium text-sidebar-foreground/50 uppercase">History</p>
          {modeConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => { onSelectConversation(conv.id); if (isMobile) setMobileOpen(false); }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors truncate",
                currentConversationId === conv.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              )}
            >
              <MessageSquare className="h-3 w-3 shrink-0" />
              <span className="truncate">{conv.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Profile & Logout */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <Button
          onClick={() => navigate("/profile")}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsedState && "justify-center"
          )}
          size="sm"
        >
          <User className="h-4 w-4" />
          {!isCollapsedState && "Profile"}
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsedState && "justify-center"
          )}
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsedState && "Sign Out"}
        </Button>
      </div>
    </div>
    </>
  );
};

export default DashboardSidebar;
