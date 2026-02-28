import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRBAC } from "@/lib/rbac";

const predictions = [
  { id: "USR-047", risk: "High", probability: 0.87, time: "2025-02-28 14:32", model: "MLP+TTT" },
  { id: "USR-112", risk: "Medium", probability: 0.65, time: "2025-02-28 14:15", model: "MLP+TTT" },
  { id: "USR-089", risk: "High", probability: 0.92, time: "2025-02-28 13:58", model: "MLP+TTT" },
  { id: "USR-203", risk: "Medium", probability: 0.58, time: "2025-02-28 13:42", model: "MLP" },
  { id: "USR-155", risk: "Low", probability: 0.22, time: "2025-02-28 13:30", model: "MLP+TTT" },
  { id: "USR-301", risk: "Low", probability: 0.15, time: "2025-02-28 13:15", model: "Random Forest" },
  { id: "USR-078", risk: "High", probability: 0.89, time: "2025-02-28 12:50", model: "MLP+TTT" },
  { id: "USR-245", risk: "Medium", probability: 0.61, time: "2025-02-28 12:30", model: "SVM" },
];

const incidentSeed = [
  { caseId: "INC-2401", user: "USR-047", status: "Open", analyst: "A. Khan", notes: "Possible USB exfiltration pattern." },
  { caseId: "INC-2402", user: "USR-112", status: "Investigating", analyst: "R. Mehta", notes: "Correlating after-hours access with VPN logs." },
  { caseId: "INC-2403", user: "USR-089", status: "Resolved", analyst: "N. Sharma", notes: "False positive due to approved migration task." },
];

const riskBadge = (r: string) => r === "High" ? "bg-threat/15 text-threat" : r === "Medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success";

const PredictionHistory = () => {
  const [incidents, setIncidents] = useState(incidentSeed);
  const { role, addAudit } = useRBAC();
  const canResolve = role === "admin" || role === "analyst";

  const resolveCase = (caseId: string) => {
    setIncidents((previous) =>
      previous.map((incident) =>
        incident.caseId === caseId ? { ...incident, status: "Resolved" } : incident,
      ),
    );
    addAudit(`${role === "admin" ? "Admin" : "Analyst"} resolved case ${caseId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
    <PageHeader title="Prediction History" description="Historical log of all threat assessment predictions" />
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["User ID", "Risk Level", "Probability", "Model", "Timestamp"].map(h => (
                <th key={h} className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {predictions.map((p, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-3 font-mono text-foreground">{p.id}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${riskBadge(p.risk)}`}>{p.risk}</span></td>
                <td className="p-3 font-mono text-foreground">{p.probability.toFixed(2)}</td>
                <td className="p-3 text-muted-foreground">{p.model}</td>
                <td className="p-3 font-mono text-muted-foreground text-xs">{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Incident Case Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {[
                "Case ID",
                "Employee",
                "Status",
                "Analyst",
                "Notes",
                "Action",
              ].map((header) => (
                <th key={header} className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.caseId} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-3 font-mono text-foreground">{incident.caseId}</td>
                <td className="p-3 font-mono text-foreground">{incident.user}</td>
                <td className="p-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    incident.status === "Open"
                      ? "bg-threat/15 text-threat"
                      : incident.status === "Investigating"
                        ? "bg-warning/15 text-warning"
                        : "bg-success/15 text-success"
                  }`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td className="p-3 text-foreground">{incident.analyst}</td>
                <td className="p-3 text-muted-foreground text-xs">{incident.notes}</td>
                <td className="p-3">
                  {canResolve && incident.status !== "Resolved" ? (
                    <Button size="sm" variant="secondary" onClick={() => resolveCase(incident.caseId)}>
                      Mark Resolved
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default PredictionHistory;
