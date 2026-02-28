import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings2, Zap } from "lucide-react";

const comparisons = [
  { user: "USR-047", without: { prediction: "Medium Risk", confidence: 0.62 }, with: { prediction: "High Risk", confidence: 0.87 } },
  { user: "USR-112", without: { prediction: "Low Risk", confidence: 0.45 }, with: { prediction: "Medium Risk", confidence: 0.71 } },
  { user: "USR-089", without: { prediction: "Medium Risk", confidence: 0.58 }, with: { prediction: "High Risk", confidence: 0.92 } },
  { user: "USR-203", without: { prediction: "Low Risk", confidence: 0.38 }, with: { prediction: "Medium Risk", confidence: 0.65 } },
];

const riskColor = (r: string) => r === "High Risk" ? "text-threat" : r === "Medium Risk" ? "text-warning" : "text-success";
const riskBg = (r: string) => r === "High Risk" ? "bg-threat/15" : r === "Medium Risk" ? "bg-warning/15" : "bg-success/15";

const TTTSettings = () => {
  const [tttEnabled, setTttEnabled] = useState(true);
  const [onlineLearning, setOnlineLearning] = useState(true);
  const [adaptSteps, setAdaptSteps] = useState([5]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Test-Time Training Settings" description="Configure and compare TTT adaptation parameters" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 space-y-6">
          <div className="flex items-center gap-3">
            <Settings2 className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">TTT Configuration</h3>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium text-foreground">Enable TTT</p>
              <p className="text-xs text-muted-foreground">Adapt model at test time</p>
            </div>
            <Switch checked={tttEnabled} onCheckedChange={setTttEnabled} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium text-foreground">Continuous Learning</p>
              <p className="text-xs text-muted-foreground">Update model after each behavior batch</p>
            </div>
            <Switch checked={onlineLearning} onCheckedChange={setOnlineLearning} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs text-muted-foreground">Adaptation Steps</label>
              <span className="text-xs font-mono text-primary">{adaptSteps[0]}</span>
            </div>
            <Slider value={adaptSteps} onValueChange={setAdaptSteps} min={1} max={20} step={1} />
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 space-y-2 text-xs text-muted-foreground">
            <p><span className="text-foreground font-medium">Self-supervised Loss:</span> Rotation Prediction</p>
            <p><span className="text-foreground font-medium">Adaptation LR:</span> 0.0001</p>
            <p><span className="text-foreground font-medium">Auxiliary Head:</span> Enabled</p>
            <p><span className="text-foreground font-medium">Pattern Memory:</span> 12,842 behavioral vectors</p>
          </div>
          {tttEnabled && (
            <div className="flex items-center gap-2 text-success text-xs">
              <Zap className="h-3.5 w-3.5" />
              <span className="font-medium">TTT Active — Model adapts during inference</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Prediction Comparison: With vs Without TTT</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">User</th>
                  <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider" colSpan={2}>Without TTT</th>
                  <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider" colSpan={2}>With TTT</th>
                  <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3 font-mono text-foreground">{c.user}</td>
                    <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${riskBg(c.without.prediction)} ${riskColor(c.without.prediction)}`}>{c.without.prediction}</span></td>
                    <td className="p-3 font-mono text-muted-foreground">{c.without.confidence.toFixed(2)}</td>
                    <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${riskBg(c.with.prediction)} ${riskColor(c.with.prediction)}`}>{c.with.prediction}</span></td>
                    <td className="p-3 font-mono text-foreground">{c.with.confidence.toFixed(2)}</td>
                    <td className="p-3 font-mono text-success">+{((c.with.confidence - c.without.confidence) * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-foreground"><span className="font-semibold text-primary">Research Insight:</span> TTT improves prediction confidence by an average of 25% by adapting the model's internal representations to each test sample's distribution characteristics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTTSettings;
