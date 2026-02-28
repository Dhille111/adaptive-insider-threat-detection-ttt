import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { Shield, Users, AlertTriangle, Activity, TrendingUp, Database } from "lucide-react";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid } from "recharts";
import { useEffect } from "react";
import { useRBAC } from "@/lib/rbac";

const threatTrend = [
  { day: "Mon", threats: 3, normal: 45 },
  { day: "Tue", threats: 5, normal: 42 },
  { day: "Wed", threats: 2, normal: 48 },
  { day: "Thu", threats: 7, normal: 40 },
  { day: "Fri", threats: 4, normal: 44 },
  { day: "Sat", threats: 1, normal: 30 },
  { day: "Sun", threats: 6, normal: 35 },
];

const riskDistribution = [
  { name: "Low Risk", value: 65, color: "hsl(142, 71%, 45%)" },
  { name: "Medium Risk", value: 25, color: "hsl(38, 92%, 50%)" },
  { name: "High Risk", value: 10, color: "hsl(0, 72%, 51%)" },
];

const recentAlerts = [
  { id: "USR-047", action: "Downloaded 300+ files", risk: "High", time: "2 min ago" },
  { id: "USR-112", action: "After-hours access", risk: "Medium", time: "15 min ago" },
  { id: "USR-089", action: "USB device connected", risk: "High", time: "32 min ago" },
  { id: "USR-203", action: "Accessed restricted folder", risk: "Medium", time: "1 hr ago" },
];

const driftSeries = [
  { t: "09:00", baseline: 0.13, current: 0.12 },
  { t: "10:00", baseline: 0.14, current: 0.16 },
  { t: "11:00", baseline: 0.12, current: 0.19 },
  { t: "12:00", baseline: 0.13, current: 0.25 },
  { t: "13:00", baseline: 0.14, current: 0.33 },
  { t: "14:00", baseline: 0.15, current: 0.39 },
];

const riskScore = 72;
const riskBand = riskScore <= 30 ? "Low" : riskScore <= 70 ? "Medium" : "High";
const driftKl = 0.39;
const driftThreshold = 0.30;

const Dashboard = () => {
  const { role, addAudit } = useRBAC();

  useEffect(() => {
    addAudit(`${role === "admin" ? "Admin" : role === "analyst" ? "Analyst" : "Viewer"} accessed dashboard`);
  }, [role, addAudit]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Security Dashboard" description="Insider Threat Detection System — Enhanced Test-Time Training Framework" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Users Monitored" value="1,247" icon={<Users className="h-5 w-5" />} trend="up" trendValue="12% this week" />
        <MetricCard title="Active Threats" value="8" icon={<AlertTriangle className="h-5 w-5" />} variant="threat" trend="down" trendValue="3 from yesterday" />
        <MetricCard title="Model Accuracy" value="94.2%" icon={<TrendingUp className="h-5 w-5" />} variant="success" subtitle="With TTT enabled" />
        <MetricCard title="TTT Adaptations" value="156" icon={<Activity className="h-5 w-5" />} subtitle="Last 24 hours" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Threat Activity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={threatTrend}>
              <defs>
                <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
              <Area type="monotone" dataKey="normal" stroke="hsl(217, 91%, 60%)" fill="url(#normalGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="threats" stroke="hsl(0, 72%, 51%)" fill="url(#threatGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Multi-Level Risk Gauge</h3>
          <div className="relative h-24 rounded-lg bg-secondary/40 border border-border overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[30%] bg-success/30" />
            <div className="absolute inset-y-0 left-[30%] w-[40%] bg-warning/30" />
            <div className="absolute inset-y-0 left-[70%] w-[30%] bg-threat/30" />
            <div className="absolute top-0 bottom-0 left-[72%] w-[2px] bg-primary" />
            <div className="absolute bottom-2 left-3 text-[11px] text-success font-medium">Low 0–30%</div>
            <div className="absolute bottom-2 left-[37%] text-[11px] text-warning font-medium">Medium 30–70%</div>
            <div className="absolute bottom-2 right-3 text-[11px] text-threat font-medium">High 70–100%</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current Risk Score</span>
            <span className="font-mono text-foreground">{riskScore}% ({riskBand})</span>
          </div>
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Risk Distribution</h4>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={4} dataKey="value">
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Model Drift Monitoring</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${driftKl > driftThreshold ? "bg-threat/15 text-threat" : "bg-success/15 text-success"}`}>
            {driftKl > driftThreshold ? "Drift Alert" : "Stable"}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={driftSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="t" stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
            <Line type="monotone" dataKey="baseline" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="current" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">KL Divergence</span>
          <span className="font-mono text-foreground">{driftKl.toFixed(2)} (threshold {driftThreshold.toFixed(2)})</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">TTT adaptation is triggered automatically when distribution shift crosses threshold.</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">🚨 Recent Alerts</h3>
        <div className="space-y-2">
          {recentAlerts.map((alert, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${alert.risk === "High" ? "bg-threat" : "bg-warning"}`} />
                <span className="font-mono text-sm text-foreground">{alert.id}</span>
                <span className="text-sm text-muted-foreground">{alert.action}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${alert.risk === "High" ? "bg-threat/15 text-threat" : "bg-warning/15 text-warning"}`}>
                  {alert.risk}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
