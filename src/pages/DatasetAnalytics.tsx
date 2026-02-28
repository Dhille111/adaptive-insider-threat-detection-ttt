import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { Database, FileText, AlertTriangle, Layers } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const classData = [
  { name: "Normal", value: 9450, color: "hsl(217, 91%, 60%)" },
  { name: "Insider Threat", value: 550, color: "hsl(0, 72%, 51%)" },
];

const sampleData = [
  { id: 1, user: "USR-001", logon_count: 45, file_access: 120, usb_usage: 0, after_hours: 2, email_out: 15, label: "Normal" },
  { id: 2, user: "USR-002", logon_count: 12, file_access: 340, usb_usage: 5, after_hours: 8, email_out: 45, label: "Insider" },
  { id: 3, user: "USR-003", logon_count: 38, file_access: 95, usb_usage: 0, after_hours: 1, email_out: 10, label: "Normal" },
  { id: 4, user: "USR-004", logon_count: 8, file_access: 450, usb_usage: 3, after_hours: 12, email_out: 67, label: "Insider" },
  { id: 5, user: "USR-005", logon_count: 52, file_access: 88, usb_usage: 0, after_hours: 0, email_out: 8, label: "Normal" },
];

const DatasetAnalytics = () => (
  <div className="space-y-6 animate-fade-in-up">
    <PageHeader title="Dataset Analytics" description="CERT Insider Threat Dataset v6.2 — Feature engineered for TTT framework" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Total Samples" value="10,000" icon={<Database className="h-5 w-5" />} />
      <MetricCard title="Insider Cases" value="550" icon={<AlertTriangle className="h-5 w-5" />} variant="threat" subtitle="5.5% of dataset" />
      <MetricCard title="Normal Cases" value="9,450" icon={<FileText className="h-5 w-5" />} variant="success" subtitle="94.5% of dataset" />
      <MetricCard title="Features" value="28" icon={<Layers className="h-5 w-5" />} subtitle="Behavioral features" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Class Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={classData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
              {classData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-2">
          {classData.map(d => (
            <div key={d.name} className="text-center">
              <div className="flex items-center gap-1.5 justify-center">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-muted-foreground">{d.name}</span>
              </div>
              <p className="text-lg font-bold font-mono text-foreground">{d.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-xs text-warning font-medium">⚠ Class Imbalance Ratio: 17.2:1</p>
          <p className="text-[11px] text-muted-foreground mt-1">SMOTE oversampling applied during training</p>
        </div>
      </div>

      <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Dataset Preview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {["User", "Logon Count", "File Access", "USB Usage", "After Hours", "Emails Out", "Label"].map(h => (
                  <th key={h} className="text-left p-2 text-muted-foreground font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map(row => (
                <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-2 font-mono text-foreground">{row.user}</td>
                  <td className="p-2 font-mono text-foreground">{row.logon_count}</td>
                  <td className="p-2 font-mono text-foreground">{row.file_access}</td>
                  <td className="p-2 font-mono text-foreground">{row.usb_usage}</td>
                  <td className="p-2 font-mono text-foreground">{row.after_hours}</td>
                  <td className="p-2 font-mono text-foreground">{row.email_out}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${row.label === "Insider" ? "bg-threat/15 text-threat" : "bg-success/15 text-success"}`}>
                      {row.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground"><span className="text-foreground font-medium">Key Features:</span> Logon frequency, file access patterns, USB device usage, after-hours activity, email behavior, HTTP uploads, psychometric indicators</p>
        </div>
      </div>
    </div>
  </div>
);

export default DatasetAnalytics;
