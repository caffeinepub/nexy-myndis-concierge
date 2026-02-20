import { useGetBudgetThresholdAlerts, useGetParticipantPlans } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle, TrendingDown, Calendar, CheckCircle } from 'lucide-react';
import { Progress } from '../ui/progress';
import type { Principal } from '@icp-sdk/core/principal';

interface BudgetHealthIndicatorProps {
  participant: Principal;
}

export default function BudgetHealthIndicator({ participant }: BudgetHealthIndicatorProps) {
  const { data: alerts = [], isLoading: alertsLoading } = useGetBudgetThresholdAlerts(participant);
  const { data: plans = [] } = useGetParticipantPlans();

  const activePlan = plans.find(p => p.status === 'active');

  if (!activePlan) {
    return null;
  }

  // Calculate overall budget utilization
  const totalBudget = activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.amount), 0);
  const totalSpent = activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.spent), 0);
  const utilizationPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Determine health status
  const getHealthStatus = () => {
    if (utilizationPercentage >= 90) return { color: 'destructive', label: 'Critical', icon: AlertTriangle };
    if (utilizationPercentage >= 75) return { color: 'warning', label: 'Warning', icon: TrendingDown };
    return { color: 'success', label: 'Healthy', icon: CheckCircle };
  };

  const healthStatus = getHealthStatus();

  return (
    <Card className="shadow-layer-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <healthStatus.icon className={`w-5 h-5 ${
            healthStatus.color === 'destructive' ? 'text-destructive' : 
            healthStatus.color === 'warning' ? 'text-warning' : 
            'text-success'
          }`} />
          Budget Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Utilization */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Overall Utilization</span>
            <span className={`text-sm font-bold ${
              healthStatus.color === 'destructive' ? 'text-destructive' : 
              healthStatus.color === 'warning' ? 'text-warning' : 
              'text-success'
            }`}>
              {utilizationPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={utilizationPercentage} 
            className={`h-2 ${
              healthStatus.color === 'destructive' ? '[&>div]:bg-destructive' : 
              healthStatus.color === 'warning' ? '[&>div]:bg-warning' : 
              '[&>div]:bg-success'
            }`}
          />
        </div>

        {/* Health Status Badge */}
        <div className={`rounded-lg p-3 ${
          healthStatus.color === 'destructive' ? 'bg-destructive/10' : 
          healthStatus.color === 'warning' ? 'bg-warning/10' : 
          'bg-success/10'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <span className={`text-sm font-bold ${
              healthStatus.color === 'destructive' ? 'text-destructive' : 
              healthStatus.color === 'warning' ? 'text-warning' : 
              'text-success'
            }`}>
              {healthStatus.label}
            </span>
          </div>
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Active Alerts ({alerts.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {alerts.map((alert, index) => {
                const utilizationPercent = Number(alert.threshold) > 0 
                  ? (Number(alert.utilized) / Number(alert.threshold)) * 100 
                  : 0;
                
                return (
                  <Alert key={index} className="py-2">
                    <AlertDescription className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{alert.category}</span>
                        <span className="text-warning font-bold">{utilizationPercent.toFixed(0)}%</span>
                      </div>
                      <div className="text-muted-foreground">
                        ${Number(alert.utilized).toLocaleString()} of ${Number(alert.threshold).toLocaleString()} used
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </div>
        )}

        {/* No Alerts Message */}
        {alerts.length === 0 && !alertsLoading && (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No budget alerts at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
