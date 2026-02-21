import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FileText, Calendar, Target } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { NDISPlan } from '../../types/mock-types';

interface PlanOverviewCardProps {
  plan?: NDISPlan;
}

export default function PlanOverviewCard({ plan }: PlanOverviewCardProps) {
  if (!plan) {
    return (
      <Card className="shadow-layer-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-primary" />
            Plan Overview
          </CardTitle>
          <CardDescription>No active plan found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const startDate = new Date(Number(plan.startDate) / 1000000);
  const endDate = new Date(Number(plan.endDate) / 1000000);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'pendingApproval':
        return <Badge variant="secondary">Pending Approval</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-layer-2 border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary" />
              Plan Overview
            </CardTitle>
            <CardDescription>Plan #{plan.planNumber}</CardDescription>
          </div>
          {getStatusBadge(plan.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Start Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {startDate.toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>End Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {endDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>Goals ({plan.goals.length})</span>
          </div>
          <div className="space-y-1">
            {plan.goals.slice(0, 3).map((goal, index) => (
              <p key={index} className="text-sm text-foreground pl-6">
                • {goal}
              </p>
            ))}
            {plan.goals.length > 3 && (
              <p className="text-sm text-muted-foreground pl-6">
                +{plan.goals.length - 3} more
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
