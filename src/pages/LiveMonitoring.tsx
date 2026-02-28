import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Activity, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const simulatedEvents = [
  { time: "14:32:05", user: "USR-101", action: "Logged in from VPN", risk: "low" },
  { time: "14:32:18", user: "USR-101", action: "Accessed project files", risk: "low" },
  { time: "14:33:01", user: "USR-101", action: "Downloaded 45 documents", risk: "medium" },
  { time: "14:33:45", user: "USR-101", action: "Connected USB device", risk: "high" },
  { time: "14:34:12", user: "USR-101", action: "Copied files to USB", risk: "high" },
  { time: "14:34:30", user: "USR-101", action: "Downloaded 300+ files", risk: "critical" },
  { time: "14:35:01", user: "USR-101", action: "Accessed restricted folder /admin/secrets", risk: "critical" },
  { time: "14:35:22", user: "USR-101", action: "Attempted to delete audit logs", risk: "critical" },
];

const riskStyles: Record<string, string> = {
  low: "text-success bg-success/10",
  medium: "text-warning bg-warning/10",
  high: "text-threat bg-threat/10",
  critical: "text-threat bg-threat/15 font-bold",
};

const LiveMonitoring = () => {
  const [events, setEvents] = useState<typeof simulatedEvents>([]);
  const [simulating, setSimulating] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

  const highRiskEvents = events.filter((event) => event.risk === "high" || event.risk === "critical").length;
  const alertsTriggered = events.filter((event) => event.risk === "critical").length;
  const activeUsers = new Set(events.map((event) => event.user)).size;

  const generateEvent = () => {
    const users = ["USR-101", "USR-047", "USR-112", "USR-089", "USR-203"];
    const actions = [
      { action: "Logged in from VPN", risk: "low" },
      { action: "Accessed project files", risk: "low" },
      { action: "Uploaded archive to external host", risk: "medium" },
      { action: "Connected USB device", risk: "high" },
      { action: "Downloaded 300+ files", risk: "critical" },
      { action: "Attempted to delete audit logs", risk: "critical" },
    ];
    const selectedUser = users[Math.floor(Math.random() * users.length)];
    const selectedAction = actions[Math.floor(Math.random() * actions.length)];
    const now = new Date();
    const stamp = now.toTimeString().slice(0, 8);

    return {
      time: stamp,
      user: selectedUser,
      action: selectedAction.action,
      risk: selectedAction.risk,
    };
  };

  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      const event = generateEvent();
      setEvents((prev) => [...prev.slice(-29), event]);
      if (event.risk === "critical") setAlertTriggered(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [simulating]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Live Monitoring" description="Real-time user activity monitoring and threat simulation" />

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setSimulating((prev) => !prev)}>
          {simulating ? "Stop Monitoring Simulation" : "Start Monitoring Simulation"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setEvents([]);
            setAlertTriggered(false);
          }}
        >
          Reset Stream
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Active Users</p>
          <p className="text-2xl font-mono font-bold text-foreground mt-1">{activeUsers}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Suspicious Activity Count</p>
          <p className="text-2xl font-mono font-bold text-warning mt-1">{highRiskEvents}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Alerts Triggered</p>
          <p className="text-2xl font-mono font-bold text-threat mt-1">{alertsTriggered}</p>
        </div>
      </div>

      {alertTriggered && (
        <div className="p-4 rounded-lg bg-threat/10 border border-threat/30 threat-glow flex items-center gap-3 animate-fade-in-up">
          <AlertTriangle className="h-6 w-6 text-threat animate-pulse" />
          <div>
            <p className="text-sm font-bold text-threat">🔴 ALERT: High Risk Employee Detected — USR-101</p>
            <p className="text-xs text-muted-foreground">Multiple critical actions detected. Immediate review recommended.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Activity Feed</h3>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] text-muted-foreground font-mono">LIVE</span>
            </div>
          </div>
          <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in-up">
                <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{e.time}</span>
                <span className="text-xs font-mono text-primary w-16 shrink-0">{e.user}</span>
                <span className="text-xs text-foreground flex-1">{e.action}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${riskStyles[e.risk]}`}>{e.risk}</span>
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-30 animate-pulse" />
                <p>Waiting for activity...</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">User Profile: USR-101</h3>
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground">Department</p>
              <p className="text-foreground font-medium">Engineering</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground">Role</p>
              <p className="text-foreground font-medium">Software Engineer</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground">Clearance Level</p>
              <p className="text-foreground font-medium">Level 3</p>
            </div>
            <div className="p-2.5 rounded-lg bg-threat/10 border border-threat/20">
              <p className="text-muted-foreground">Current Risk Score</p>
              <p className="text-threat font-bold text-lg font-mono">0.92</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground">TTT Confidence</p>
              <p className="text-primary font-bold font-mono">0.95</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50">
              <p className="text-muted-foreground">Behavioral Baseline</p>
              <p className="text-foreground font-medium">Login: 08:45–09:15, Files/day: 60–120, USB/week: 0–1</p>
            </div>
            <div className="p-2.5 rounded-lg bg-warning/10 border border-warning/30">
              <p className="text-muted-foreground">Deviation Score</p>
              <p className="text-warning font-bold text-lg font-mono">0.74</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
