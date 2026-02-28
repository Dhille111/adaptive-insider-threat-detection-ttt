import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";

const models = [
  { model: "MLP (TTT)", accuracy: 94.2, precision: 95.5, recall: 88.5, f1: 91.9, auc: 0.96 },
  { model: "MLP (No TTT)", accuracy: 91.0, precision: 92.1, recall: 84.2, f1: 87.9, auc: 0.93 },
  { model: "Random Forest", accuracy: 89.3, precision: 90.8, recall: 81.7, f1: 85.0, auc: 0.91 },
  { model: "SVM", accuracy: 86.1, precision: 88.2, recall: 78.5, f1: 82.0, auc: 0.88 },
];

const rocData = [
  { fpr: 0, mlp_ttt: 0, mlp: 0, rf: 0, svm: 0 },
  { fpr: 0.02, mlp_ttt: 0.65, mlp: 0.55, rf: 0.48, svm: 0.40 },
  { fpr: 0.05, mlp_ttt: 0.82, mlp: 0.72, rf: 0.65, svm: 0.58 },
  { fpr: 0.1, mlp_ttt: 0.90, mlp: 0.83, rf: 0.77, svm: 0.70 },
  { fpr: 0.2, mlp_ttt: 0.95, mlp: 0.90, rf: 0.85, svm: 0.80 },
  { fpr: 0.4, mlp_ttt: 0.98, mlp: 0.95, rf: 0.92, svm: 0.88 },
  { fpr: 0.6, mlp_ttt: 0.99, mlp: 0.97, rf: 0.95, svm: 0.93 },
  { fpr: 0.8, mlp_ttt: 1.0, mlp: 0.99, rf: 0.98, svm: 0.96 },
  { fpr: 1.0, mlp_ttt: 1.0, mlp: 1.0, rf: 1.0, svm: 1.0 },
];

const performanceOverTime = [
  { day: "Mon", accuracy: 90.8, drift: 0.16, tttGain: 1.8 },
  { day: "Tue", accuracy: 91.3, drift: 0.18, tttGain: 2.0 },
  { day: "Wed", accuracy: 92.1, drift: 0.22, tttGain: 2.4 },
  { day: "Thu", accuracy: 93.0, drift: 0.27, tttGain: 2.9 },
  { day: "Fri", accuracy: 94.2, drift: 0.31, tttGain: 3.2 },
];

const tooltipStyle = { background: "hsl(222, 44%, 9%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" };

const ModelComparison = () => (
  <div className="space-y-6 animate-fade-in-up">
    <PageHeader title="Model Comparison" description="Comparative analysis of classification algorithms with and without Test-Time Training" />

    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Performance Summary</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Model", "Accuracy", "Precision", "Recall", "F1-Score", "AUC"].map(h => (
                <th key={h} className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((m, i) => (
              <tr key={i} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
                <td className="p-3 font-medium text-foreground">{m.model} {i === 0 && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full ml-2">Best</span>}</td>
                <td className="p-3 font-mono text-foreground">{m.accuracy}%</td>
                <td className="p-3 font-mono text-foreground">{m.precision}%</td>
                <td className="p-3 font-mono text-foreground">{m.recall}%</td>
                <td className="p-3 font-mono text-foreground">{m.f1}%</td>
                <td className="p-3 font-mono text-foreground">{m.auc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Performance Analytics Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={performanceOverTime}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
          <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={11} />
          <YAxis yAxisId="left" stroke="hsl(215, 20%, 55%)" fontSize={11} />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(215, 20%, 55%)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          <Line yAxisId="left" type="monotone" dataKey="accuracy" name="Accuracy %" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="drift" name="Drift (KL)" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="tttGain" name="TTT Gain %" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={models}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="model" stroke="hsl(215, 20%, 55%)" fontSize={11} />
            <YAxis domain={[80, 100]} stroke="hsl(215, 20%, 55%)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="accuracy" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">ROC Curve</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={rocData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="fpr" label={{ value: "FPR", position: "bottom", fill: "hsl(215, 20%, 55%)", fontSize: 11 }} stroke="hsl(215, 20%, 55%)" fontSize={11} />
            <YAxis label={{ value: "TPR", angle: -90, position: "insideLeft", fill: "hsl(215, 20%, 55%)", fontSize: 11 }} stroke="hsl(215, 20%, 55%)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="mlp_ttt" name="MLP+TTT" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="mlp" name="MLP" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="rf" name="RF" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="svm" name="SVM" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <p className="text-sm text-foreground"><span className="font-semibold text-primary">Key Finding:</span> The enhanced TTT framework improves MLP accuracy by <span className="font-mono font-bold text-primary">+3.2%</span> and F1-score by <span className="font-mono font-bold text-primary">+4.0%</span> compared to standard training, validating the proposed approach.</p>
    </div>
  </div>
);

export default ModelComparison;
