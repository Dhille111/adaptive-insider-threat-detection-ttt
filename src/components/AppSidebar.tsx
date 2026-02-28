import {
  LayoutDashboard, Database, Brain, GitCompare, Settings2, BarChart3,
  Target, Activity, History, FileText, Network, Shield, Users2, Waves
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { useRBAC } from "@/lib/rbac";

const adminItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Dataset Analytics", url: "/dataset", icon: Database },
  { title: "Train Model", url: "/train", icon: Brain },
  { title: "Model Comparison", url: "/comparison", icon: GitCompare },
  { title: "TTT Settings", url: "/ttt", icon: Settings2 },
  { title: "Drift Detection", url: "/drift", icon: Waves },
  { title: "Feature Analysis", url: "/features", icon: BarChart3 },
  { title: "Manual Prediction", url: "/predict", icon: Target },
  { title: "Live Monitoring", url: "/monitoring", icon: Activity },
  { title: "Prediction History", url: "/history", icon: History },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "System Architecture", url: "/architecture", icon: Network },
  { title: "User Management", url: "/users", icon: Users2 },
];

const analystItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Feature Analysis", url: "/features", icon: BarChart3 },
  { title: "Manual Prediction", url: "/predict", icon: Target },
  { title: "Live Monitoring", url: "/monitoring", icon: Activity },
  { title: "Prediction History", url: "/history", icon: History },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "System Architecture", url: "/architecture", icon: Network },
];

const viewerItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Live Monitoring", url: "/monitoring", icon: Activity },
  { title: "System Architecture", url: "/architecture", icon: Network },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { role } = useRBAC();
  const items = role === "admin" ? adminItems : role === "analyst" ? analystItems : viewerItems;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className={`p-4 ${collapsed ? 'px-2' : ''}`}>
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary shrink-0" />
            {!collapsed && (
              <div>
                <h1 className="text-sm font-bold text-foreground tracking-tight">Insider Threat</h1>
                <p className="text-[10px] text-muted-foreground font-mono">TTT Detection System</p>
              </div>
            )}
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-widest">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-accent/60 text-muted-foreground transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium cyber-glow-sm"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
