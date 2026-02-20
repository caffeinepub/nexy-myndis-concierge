import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileText, Calendar, CheckCircle2 } from 'lucide-react';
import type { NDISPlan } from '../../backend';

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
            Your NDIS Plan
          </CardTitle>
          <CardDescription>No active plan found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Upload your NDIS plan to get started with managing your support services.
          </p>
        </CardContent>
      </Card>
    );
  }

  const startDate = new Date(Number(plan.startDate) / 1000000);
  const endDate = new Date(Number(plan.endDate) / 1000000);

  return (
    <Card className="shadow-layer-2 border-border bg-gradient-to-br from-card to-transparent">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary" />
              Your NDIS Plan
            </CardTitle>
            <CardDescription>Plan #{plan.planNumber}</CardDescription>
          </div>
          <Badge variant="default" className="bg-success text-success-foreground rounded-full px-3 py-1 font-medium">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <Calendar size={16} />
          <span>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </span>
        </div>
        
        {plan.goals.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3">Your Goals</h4>
            <ul className="space-y-2">
              {plan.goals.slice(0, 3).map((goal, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan.categories.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3">Budget Categories</h4>
            <div className="flex flex-wrap gap-2">
              {plan.categories.slice(0, 4).map(([name, cat]) => (
                <Badge key={name} variant="outline" className="rounded-lg px-3 py-1.5">
                  {name}
                </Badge>
              ))}
              {plan.categories.length > 4 && (
                <Badge variant="outline" className="rounded-lg px-3 py-1.5">
                  +{plan.categories.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
