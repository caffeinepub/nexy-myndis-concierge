import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Target, CheckCircle } from 'lucide-react';
import type { NDISPlan } from '../../types/mock-types';

interface GoalProgressCardProps {
  plan?: NDISPlan;
}

export default function GoalProgressCard({ plan }: GoalProgressCardProps) {
  if (!plan || plan.goals.length === 0) {
    return (
      <Card className="shadow-layer-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-primary" />
            Goal Progress
          </CardTitle>
          <CardDescription>No goals set</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-layer-2 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-primary" />
          Goal Progress
        </CardTitle>
        <CardDescription>Track your NDIS goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan.goals.map((goal, index) => (
          <div key={index} className="p-4 rounded-xl border border-border bg-muted/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{goal}</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                    style={{ width: `${Math.random() * 40 + 30}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
