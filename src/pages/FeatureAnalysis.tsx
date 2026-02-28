import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const featureImportance = [
  { feature: "USB Activity", importance: 25.3, fill: "hsl(0, 72%, 51%)" },
  { feature: "After-Hours Login", importance: 18.7, fill: "hsl(0, 72%, 51%)" },
  { feature: "File Downloads", importance: 15.2, fill: "hsl(38, 92%, 50%)" },
  { feature: "Email Attachments", importance: 12.8, fill: "hsl(38, 92%, 50%)" },
  { feature: "Restricted Access", importance: 8.5, fill: "hsl(217, 91%, 60%)" },
  { feature: "HTTP Uploads", importance: 6.3, fill: "hsl(217, 91%, 60%)" },
  { feature: "Login Failures", importance: 4.9, fill: "hsl(217, 91%, 60%)" },
  { feature: "VPN Usage", importance: 3.8, fill: "hsl(215, 20%, 55%)" },
  { feature: "Print Jobs", importance: 2.6, fill: "hsl(215, 20%, 55%)" },
  { feature: "Logon Count", importance: 1.9, fill: "hsl(215, 20%, 55%)" },
];

const explanations = [
  { feature: "USB Activity", contribution: "25.3%", description: "External device connections for data exfiltration detection", severity: "Critical" },
  { feature: "After-Hours Login", contribution: "18.7%", description: "Authentication events outside normal working hours", severity: "High" },
  { feature: "File Downloads", contribution: "15.2%", description: "Bulk file download patterns indicating data harvesting", severity: "High" },
  { feature: "Email Attachments", contribution: "12.8%", description: "Outbound emails with sensitive attachments", severity: "Medium" },
];

const shapRows = [
  { feature: "USB usage", contribution: "+0.32" },
  { feature: "After-hours login", contribution: "+0.21" },
  { feature: "Sensitive access", contribution: "+0.18" },
  { feature: "Bulk downloads", contribution: "+0.14" },
];

const FeatureAnalysis = () => (
  <div className="space-y-6 animate-fade-in-up">
    <PageHeader title="Feature Analysis" description="Feature importance rankings and explainability for insider threat detection" />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top 10 Feature Importance</h3>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={11} />
            <YAxis type="category" dataKey="feature" stroke="hsl(215, 20%, 55%)" fontSize={11} width={120} />
            <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} formatter={(v: number) => `${v}%`} />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {featureImportance.map((entry, i) => (
                <Bar key={i} dataKey="importance" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">🧠 Explainable AI — Why Was a User Flagged?</h3>
          <div className="p-4 rounded-lg bg-threat/5 border border-threat/20 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Example: User USR-047 flagged as</p>
            <p className="text-sm font-bold text-threat">🔴 HIGH RISK</p>
            <p className="text-xs text-muted-foreground mt-2">Contributing factors:</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 rounded-full bg-threat w-3/5" />
                <span className="text-[11px] text-foreground">High USB usage (score: 0.92)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 rounded-full bg-warning w-[45%]" />
                <span className="text-[11px] text-foreground">After-hours login (score: 0.78)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 rounded-full bg-warning w-[35%]" />
                <span className="text-[11px] text-foreground">Sensitive file access (score: 0.65)</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground font-medium">Feature</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {shapRows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="p-2 text-foreground">{row.feature}</td>
                    <td className="p-2 font-mono text-threat">{row.contribution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Interpretability improves trust and transparency for analyst decisions.</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Feature Descriptions</h3>
          <div className="space-y-2">
            {explanations.map((e, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-secondary/50 flex items-start gap-3">
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${e.severity === "Critical" ? "bg-threat/15 text-threat" : e.severity === "High" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"}`}>{e.severity}</span>
                <div>
                  <p className="text-xs font-medium text-foreground">{e.feature} ({e.contribution})</p>
                  <p className="text-[11px] text-muted-foreground">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeatureAnalysis;
