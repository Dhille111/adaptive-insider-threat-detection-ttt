import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

const Reports = () => {
  const { toast } = useToast();

  const generateReport = () => {
    const report = new jsPDF();
    const timestamp = new Date().toISOString();

    report.setFontSize(14);
    report.text("Insider Threat Assessment Report", 14, 18);
    report.setFontSize(10);
    report.text(`Employee ID: USR-047`, 14, 30);
    report.text(`Risk Score: 87% (High)`, 14, 38);
    report.text(`Top Explanation: USB usage +0.32, After-hours login +0.21`, 14, 46);
    report.text(`Model: MLP+TTT | Drift KL: 0.39`, 14, 54);
    report.text(`Generated: ${timestamp}`, 14, 62);
    report.save("insider-threat-report.pdf");

    toast({ title: "PDF Generated", description: "insider-threat-report.pdf downloaded successfully." });
  };

  const exportToSiem = () => {
    toast({ title: "SIEM Export Simulated", description: "Alert batch exported to Splunk / Elastic-compatible payload." });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Report Generation" description="Generate comprehensive threat assessment reports" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Generate Threat Report</h3>
          <p className="text-xs text-muted-foreground">Generate a detailed PDF report including user risk assessment, model confidence scores, feature contributions, and recommended actions.</p>

          <div className="p-4 rounded-lg bg-secondary/50 space-y-2 text-xs">
            <p className="text-foreground font-medium mb-2">Report Contents:</p>
            <p className="text-muted-foreground">✓ Executive Summary</p>
            <p className="text-muted-foreground">✓ User Risk Assessment (ID, Score, Level)</p>
            <p className="text-muted-foreground">✓ Feature Contribution Analysis</p>
            <p className="text-muted-foreground">✓ Model Confidence & TTT Status</p>
            <p className="text-muted-foreground">✓ Confusion Matrix & ROC Curve</p>
            <p className="text-muted-foreground">✓ Recommended Actions</p>
          </div>

          <Button onClick={generateReport} className="w-full" size="lg">
            <FileText className="h-4 w-4 mr-2" /> Generate Threat Report
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Export Data</h3>
          <div className="space-y-3">
            {["Prediction History (CSV)", "Model Metrics (JSON)", "Feature Importance (CSV)", "Alert Logs (CSV)"].map(item => (
              <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <span className="text-sm text-foreground">{item}</span>
                <Button variant="ghost" size="sm" onClick={() => toast({ title: "Downloaded", description: `${item} exported successfully.` })}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={exportToSiem} className="w-full">
            Export to SIEM (Simulation)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
