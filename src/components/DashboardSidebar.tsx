import { useState } from "react";
import { ChatMode, modes } from "@/lib/modes";
import { Plus, MessageSquare, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

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
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const modeConversations = conversations.filter(c => c.mode === currentMode);

  return (
    <div className={cn(
      "flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-sidebar-border p-3">
        {!collapsed && <span className="font-heading text-sm font-bold text-sidebar-primary">SmartAssist</span>}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mode selector */}
      <div className="space-y-1 p-2">
        {(Object.entries(modes) as [ChatMode, typeof modes[ChatMode]][]).map(([key, mode]) => {
          const Icon = mode.icon;
          return (
            <button
              key={key}
              onClick={() => onModeChange(key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                currentMode === key
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", mode.color)} />
              {!collapsed && <span>{mode.label}</span>}
            </button>
          );
        })}
      </div>

      {/* New chat */}
      <div className="px-2 py-1">
        <Button
          onClick={onNewConversation}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
          size="sm"
        >
          <Plus className="h-4 w-4" />
          {!collapsed && "New Chat"}
        </Button>
      </div>

      {/* History */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2 py-1">
          <p className="px-3 py-1.5 text-xs font-medium text-sidebar-foreground/50 uppercase">History</p>
          {modeConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
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

      {/* Logout */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
