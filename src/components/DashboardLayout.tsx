import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRBAC } from "@/lib/rbac";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, setRole } = useRBAC();
  const roleBadge =
    role === "admin"
      ? { label: "🟢 Admin Access", className: "bg-primary/15 text-primary" }
      : role === "analyst"
        ? { label: "🟡 Analyst Mode", className: "bg-success/15 text-success" }
        : { label: "⚪ Viewer Mode (Read Only)", className: "bg-secondary text-muted-foreground" };
  const roleTone =
    role === "admin"
      ? "bg-primary/5"
      : role === "analyst"
        ? "bg-success/5"
        : "bg-background";

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${roleTone}`}>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="ml-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">System Online</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="w-[180px]">
                <Select value={role} onValueChange={(value) => setRole(value as "admin" | "analyst" | "viewer")}>
                  <SelectTrigger className="h-8 bg-secondary border-border text-xs">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin Login</SelectItem>
                    <SelectItem value="analyst">Security Analyst Login</SelectItem>
                    <SelectItem value="viewer">Viewer Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${roleBadge.className}`}>{roleBadge.label}</span>
              <span className="text-xs font-mono text-muted-foreground">v2.1.0-TTT</span>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
