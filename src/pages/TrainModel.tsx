import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Brain, Play, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useRBAC } from "@/lib/rbac";

const confusionMatrix = { tp: 487, fp: 23, fn: 63, tn: 9427 };

const TrainModel = () => {
  const { addAudit } = useRBAC();
  const [algorithm, setAlgorithm] = useState("mlp");
  const [training, setTraining] = useState(false);
  const [trained, setTrained] = useState(false);
  const [progress, setProgress] = useState(0);
  const [anomalyMode, setAnomalyMode] = useState(false);
  const [adversarialScore, setAdversarialScore] = useState<number | null>(null);

  const metrics = { accuracy: 94.2, precision: 95.5, recall: 88.5, f1: 91.9 };
  const metricBars = [
    { name: "Accuracy", value: metrics.accuracy, fill: "hsl(217, 91%, 60%)" },
    { name: "Precision", value: metrics.precision, fill: "hsl(142, 71%, 45%)" },
    { name: "Recall", value: metrics.recall, fill: "hsl(38, 92%, 50%)" },
    { name: "F1-Score", value: metrics.f1, fill: "hsl(280, 70%, 55%)" },
  ];

  const startTraining = () => {
    setTraining(true);
    setTrained(false);
    setProgress(0);
    addAudit(`Admin started model training (${algorithm})`);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTraining(false);
          setTrained(true);
          addAudit(`Admin completed model training (${algorithm})`);
          return 100;
        }
        return p + 2;
      });
    }, 80);
  };

  const deleteModel = () => {
    setTrained(false);
    setProgress(0);
    addAudit("Admin deleted deployed model");
  };

  const runAdversarialSimulation = () => {
    const robustness = 86 + Math.random() * 10;
    setAdversarialScore(Number(robustness.toFixed(1)));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Model Training" description="Train and evaluate insider threat detection models" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Training Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Algorithm</label>
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mlp">MLP Neural Network</SelectItem>
                  <SelectItem value="rf">Random Forest</SelectItem>
                  <SelectItem value="svm">Support Vector Machine</SelectItem>
                  <SelectItem value="ensemble">Ensemble (MLP + RF + Isolation Forest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="text-sm font-medium text-foreground">Unsupervised Anomaly Mode</p>
                <p className="text-xs text-muted-foreground">Isolation Forest + One-Class SVM for unknown threats</p>
              </div>
              <Switch checked={anomalyMode} onCheckedChange={setAnomalyMode} />
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 space-y-2 text-xs text-muted-foreground">
              <p><span className="text-foreground font-medium">Epochs:</span> 100</p>
              <p><span className="text-foreground font-medium">Batch Size:</span> 32</p>
              <p><span className="text-foreground font-medium">Learning Rate:</span> 0.001</p>
              <p><span className="text-foreground font-medium">Train/Test Split:</span> 80/20</p>
              {algorithm === "ensemble" && <p><span className="text-foreground font-medium">Final Score:</span> 0.5×MLP + 0.3×RF + 0.2×IF</p>}
            </div>
            <Button onClick={startTraining} disabled={training} className="w-full" size="lg">
              {training ? <><Brain className="h-4 w-4 mr-2 animate-spin" /> Training...</> :
               trained ? <><CheckCircle className="h-4 w-4 mr-2" /> Retrain Model</> :
               <><Play className="h-4 w-4 mr-2" /> Start Training</>}
            </Button>
            {trained && (
              <Button onClick={deleteModel} variant="destructive" className="w-full" size="sm">
                Delete Model
              </Button>
            )}
            {training && (
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span><span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {trained && (
          <>
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={metricBars} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(215, 20%, 55%)" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={11} width={70} />
                  <Tooltip contentStyle={{ background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Confusion Matrix</h3>
              <div className="grid grid-cols-2 gap-2 max-w-[220px] mx-auto mt-8">
                <div className="p-4 rounded-lg bg-success/15 text-center border border-success/20">
                  <p className="text-lg font-bold font-mono text-success">{confusionMatrix.tp}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">True Positive</p>
                </div>
                <div className="p-4 rounded-lg bg-threat/15 text-center border border-threat/20">
                  <p className="text-lg font-bold font-mono text-threat">{confusionMatrix.fp}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">False Positive</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/15 text-center border border-warning/20">
                  <p className="text-lg font-bold font-mono text-warning">{confusionMatrix.fn}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">False Negative</p>
                </div>
                <div className="p-4 rounded-lg bg-success/15 text-center border border-success/20">
                  <p className="text-lg font-bold font-mono text-success">{confusionMatrix.tn}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">True Negative</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-[11px] text-muted-foreground">Predicted → | Actual ↓</p>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-foreground">Adversarial Attack Simulation</p>
                  <Button size="sm" variant="secondary" onClick={runAdversarialSimulation}>Simulate Evasive Insider</Button>
                </div>
                <p className="text-[11px] text-muted-foreground">Tests robustness against subtle behavior manipulation attacks.</p>
                {adversarialScore !== null && (
                  <p className="mt-2 text-xs text-foreground">Detection robustness: <span className="font-mono text-primary">{adversarialScore}%</span></p>
                )}
              </div>
            </div>
          </>
        )}

        {!trained && !training && (
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an algorithm and click Train to begin</p>
              <p className="text-xs mt-1">Results will appear here after training</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainModel;
