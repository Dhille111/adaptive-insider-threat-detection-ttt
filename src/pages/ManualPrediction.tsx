import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Target, AlertTriangle, CheckCircle, Shield } from "lucide-react";

const ManualPrediction = () => {
  const [features, setFeatures] = useState({
    logon_count: "12", file_access: "340", usb_usage: "5", after_hours: "8",
    email_out: "45", http_uploads: "12", login_failures: "3", vpn: "1",
  });
  const [tttOn, setTttOn] = useState(true);
  const [result, setResult] = useState<null | { risk: string; probability: number; confidence: number }>(null);

  const predict = () => {
    // Simulated prediction based on feature values
    const score = (parseInt(features.usb_usage) * 3 + parseInt(features.after_hours) * 2 + parseInt(features.file_access) / 50 + parseInt(features.email_out) / 10) / 40;
    const adjustedScore = tttOn ? Math.min(score * 1.3, 1) : score;
    const risk = adjustedScore > 0.7 ? "High Risk" : adjustedScore > 0.4 ? "Medium Risk" : "Low Risk";
    setResult({ risk, probability: Math.min(adjustedScore, 0.99), confidence: tttOn ? 0.92 : 0.74 });
  };

  const riskConfig = {
    "High Risk": { icon: AlertTriangle, color: "text-threat", bg: "bg-threat/10 border-threat/30", glow: "threat-glow" },
    "Medium Risk": { icon: Shield, color: "text-warning", bg: "bg-warning/10 border-warning/30", glow: "" },
    "Low Risk": { icon: CheckCircle, color: "text-success", bg: "bg-success/10 border-success/30", glow: "safe-glow" },
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Manual Prediction" description="Input user behavioral features for real-time insider threat assessment" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Input Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(features).map(([key, val]) => (
              <div key={key}>
                <label className="text-[11px] text-muted-foreground mb-1 block capitalize">{key.replace(/_/g, " ")}</label>
                <Input value={val} onChange={e => setFeatures(p => ({ ...p, [key]: e.target.value }))} className="bg-secondary border-border font-mono text-sm" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium text-foreground">Test-Time Training</p>
              <p className="text-xs text-muted-foreground">Enable TTT adaptation</p>
            </div>
            <Switch checked={tttOn} onCheckedChange={setTttOn} />
          </div>
          <Button onClick={predict} className="w-full" size="lg">
            <Target className="h-4 w-4 mr-2" /> Analyze Threat Level
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 flex items-center justify-center">
          {result ? (() => {
            const config = riskConfig[result.risk as keyof typeof riskConfig];
            const Icon = config.icon;
            return (
              <div className={`w-full p-6 rounded-lg border ${config.bg} ${config.glow} text-center`}>
                <Icon className={`h-12 w-12 mx-auto mb-3 ${config.color}`} />
                <p className={`text-2xl font-bold ${config.color}`}>{result.risk}</p>
                <p className="text-sm text-muted-foreground mt-2">Threat Probability</p>
                <p className="text-3xl font-bold font-mono text-foreground mt-1">{(result.probability * 100).toFixed(1)}%</p>
                <Progress value={result.probability * 100} className="h-2 mt-3" />
                <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
                  <div><p className="font-medium text-foreground">{result.confidence.toFixed(2)}</p><p>Confidence</p></div>
                  <div><p className="font-medium text-foreground">{tttOn ? "Enabled" : "Disabled"}</p><p>TTT Status</p></div>
                </div>
              </div>
            );
          })() : (
            <div className="text-center text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Enter features and click Analyze</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualPrediction;
