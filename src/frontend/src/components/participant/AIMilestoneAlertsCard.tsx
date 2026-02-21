import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { generateMilestoneAlerts } from '../../utils/fakeAIData';

export default function AIMilestoneAlertsCard() {
  const alerts = generateMilestoneAlerts();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-destructive/20 bg-destructive/5';
      case 'medium':
        return 'border-warning/20 bg-warning/5';
      default:
        return 'border-primary/20 bg-primary/5';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'medium':
        return <Calendar className="w-5 h-5 text-warning" />;
      default:
        return <CheckCircle className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Milestone Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getPriorityColor(alert.priority)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              {getPriorityIcon(alert.priority)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-foreground">{alert.title}</h4>
                  <span className="text-sm font-bold text-primary">
                    {alert.daysUntil} days
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.action}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
