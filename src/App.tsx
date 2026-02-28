import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { RBACProvider } from "@/lib/rbac";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DatasetAnalytics from "./pages/DatasetAnalytics";
import TrainModel from "./pages/TrainModel";
import ModelComparison from "./pages/ModelComparison";
import TTTSettings from "./pages/TTTSettings";
import FeatureAnalysis from "./pages/FeatureAnalysis";
import ManualPrediction from "./pages/ManualPrediction";
import LiveMonitoring from "./pages/LiveMonitoring";
import PredictionHistory from "./pages/PredictionHistory";
import Reports from "./pages/Reports";
import SystemArchitecture from "./pages/SystemArchitecture";
import DriftDetection from "./pages/DriftDetection";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RBACProvider>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dataset" element={<RoleProtectedRoute allow={["admin"]}><DatasetAnalytics /></RoleProtectedRoute>} />
              <Route path="/train" element={<RoleProtectedRoute allow={["admin"]}><TrainModel /></RoleProtectedRoute>} />
              <Route path="/comparison" element={<RoleProtectedRoute allow={["admin"]}><ModelComparison /></RoleProtectedRoute>} />
              <Route path="/ttt" element={<RoleProtectedRoute allow={["admin"]}><TTTSettings /></RoleProtectedRoute>} />
              <Route path="/drift" element={<RoleProtectedRoute allow={["admin"]}><DriftDetection /></RoleProtectedRoute>} />
              <Route path="/features" element={<RoleProtectedRoute allow={["admin", "analyst"]}><FeatureAnalysis /></RoleProtectedRoute>} />
              <Route path="/predict" element={<RoleProtectedRoute allow={["admin", "analyst"]}><ManualPrediction /></RoleProtectedRoute>} />
              <Route path="/monitoring" element={<LiveMonitoring />} />
              <Route path="/history" element={<RoleProtectedRoute allow={["admin", "analyst"]}><PredictionHistory /></RoleProtectedRoute>} />
              <Route path="/reports" element={<RoleProtectedRoute allow={["admin", "analyst"]}><Reports /></RoleProtectedRoute>} />
              <Route path="/architecture" element={<SystemArchitecture />} />
              <Route path="/users" element={<RoleProtectedRoute allow={["admin"]}><UserManagement /></RoleProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </RBACProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
