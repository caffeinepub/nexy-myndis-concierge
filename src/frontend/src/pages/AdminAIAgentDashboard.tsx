import { useGetAIAgentMetrics } from '../hooks/useQueries';
import { useUserRole } from '../hooks/useUserRole';
import PageLayout from '../components/layout/PageLayout';
import AIMetricsOverview from '../components/admin/AIMetricsOverview';
import ThresholdConfigurationPanel from '../components/admin/ThresholdConfigurationPanel';
import LoadingState from '../components/common/LoadingState';
import { Brain, Settings, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function AdminAIAgentDashboard() {
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const { data: metrics, isLoading: metricsLoading } = useGetAIAgentMetrics();

  if (roleLoading || metricsLoading) {
    return (
      <PageLayout title="AI Agent Monitoring">
        <LoadingState message="Loading AI agent metrics..." />
      </PageLayout>
    );
  }

  if (!isAdmin()) {
    return (
      <PageLayout title="AI Agent Monitoring">
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this page. Only administrators can view AI agent monitoring.
          </AlertDescription>
        </Alert>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="AI Agent Monitoring">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-primary-foreground mb-12 relative overflow-hidden shadow-layer-2">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-10 h-10" />
            <h1 className="text-4xl font-bold">AI Agent Monitoring</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Monitor AI agent performance, review validation metrics, and configure thresholds
          </p>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Performance Metrics
        </h2>
        {metrics && <AIMetricsOverview metrics={metrics} />}
      </div>

      {/* Configuration Panel */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Threshold Configuration
        </h2>
        <ThresholdConfigurationPanel />
      </div>
    </PageLayout>
  );
}
