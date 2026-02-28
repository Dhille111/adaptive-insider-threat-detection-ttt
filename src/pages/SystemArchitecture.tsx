import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRBAC } from "@/lib/rbac";

const steps = [
  { label: "User Activity Logs", desc: "Raw behavioral data collection from endpoints", icon: "📊" },
  { label: "Feature Engineering", desc: "28 behavioral features extracted and normalized", icon: "⚙️" },
  { label: "MLP Neural Network", desc: "Multi-layer perceptron classification model", icon: "🧠" },
  { label: "Test-Time Training", desc: "Self-supervised adaptation at inference time", icon: "🔄" },
  { label: "Risk Scoring", desc: "Probability-based threat level classification", icon: "📈" },
  { label: "Alert Dashboard", desc: "Real-time monitoring and threat notification", icon: "🚨" },
];

const SystemArchitecture = () => {
  const { logs } = useRBAC();
  const [token, setToken] = useState("Bearer analyst-demo-token");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const validateToken = () => {
    setTokenValid(token.trim().startsWith("Bearer ") && token.trim().length > 20);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="System Architecture" description="End-to-end pipeline of the Enhanced Test-Time Training Insider Threat Detection System" />

    <div className="bg-card rounded-lg border border-border p-8">
      <div className="max-w-2xl mx-auto space-y-1">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border/50">
              <span className="text-2xl">{step.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">Step {i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-0.5 h-6 bg-primary/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <p className="text-sm text-foreground">
        <span className="font-semibold text-primary">Research Statement:</span> This project implements and validates the proposed improved Test-Time Training framework for insider threat detection, demonstrating significant accuracy improvements over traditional static models through self-supervised adaptation during inference.
      </p>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { title: "Data Layer", items: ["CERT Dataset v6.2", "10,000 samples", "28 features", "SMOTE balancing"] },
        { title: "Model Layer", items: ["MLP backbone", "Ensemble + IF mode", "TTT adaptation loop", "Cross-entropy loss"] },
        { title: "Application Layer", items: ["Risk classification", "RBAC modes", "SIEM export simulation", "Report export"] },
      ].map(section => (
        <div key={section.title} className="bg-card rounded-lg border border-border p-4">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{section.title}</h4>
          <ul className="space-y-1.5">
            {section.items.map(item => (
              <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">REST API Token Authentication</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <Input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Bearer <JWT token>" className="bg-secondary border-border" />
          <Button onClick={validateToken}>Validate Token</Button>
        </div>
        {tokenValid !== null && (
          <p className={`text-xs mt-3 ${tokenValid ? "text-success" : "text-threat"}`}>
            {tokenValid ? "Token valid. Secure endpoint access granted." : "Token invalid. Access denied."}
          </p>
        )}
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Audit Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Role", "Action", "Timestamp"].map((header) => (
                  <th key={header} className="text-left p-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 8).map((log) => (
                <tr key={log.id} className="border-b border-border/50">
                  <td className="p-2 text-foreground capitalize">{log.actorRole}</td>
                  <td className="p-2 text-muted-foreground">{log.action}</td>
                  <td className="p-2 font-mono text-xs text-muted-foreground">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
