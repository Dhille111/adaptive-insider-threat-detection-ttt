import React from "react";
import { PageHeader } from "@/components/PageHeader";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const distributionSeries = [
  { bucket: "0.0-0.1", baseline: 110, current: 88 },
  { bucket: "0.1-0.2", baseline: 140, current: 122 },
  { bucket: "0.2-0.3", baseline: 172, current: 160 },
  { bucket: "0.3-0.4", baseline: 121, current: 155 },
  { bucket: "0.4-0.5", baseline: 96, current: 133 },
  { bucket: "0.5-0.6", baseline: 72, current: 98 },
];

const driftTimeline = [
  { t: "10:00", kl: 0.14 },
  { t: "10:30", kl: 0.17 },
  { t: "11:00", kl: 0.19 },
  { t: "11:30", kl: 0.24 },
  { t: "12:00", kl: 0.29 },
  { t: "12:30", kl: 0.34 },
  { t: "13:00", kl: 0.39 },
];

const kl = 0.39;
const threshold = 0.3;

const tooltipStyle = {
  background: "hsl(222, 44%, 9%)",
  border: "1px solid hsl(222, 30%, 16%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 93%)",
};

const DriftDetection = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Drift Detection"
        description="Adaptive model drift monitoring and KL divergence based trigger for TTT"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Distribution Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={distributionSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="bucket" stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="baseline" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="current" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">KL Divergence Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={driftTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="t" stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="kl" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current KL</span>
              <span className="font-mono text-foreground">{kl.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-muted-foreground">Threshold</span>
              <span className="font-mono text-foreground">{threshold.toFixed(2)}</span>
            </div>
            <p className={`mt-2 text-xs ${kl > threshold ? "text-threat" : "text-success"}`}>
              {kl > threshold
                ? "Drift alert raised. TTT adaptation trigger enabled."
                : "No significant drift. Model remains stable."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriftDetection;
