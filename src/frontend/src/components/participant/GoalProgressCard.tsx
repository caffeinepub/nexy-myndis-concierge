import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Target, CheckCircle2 } from 'lucide-react';
import type { NDISPlan } from '../../backend';

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
          <CardDescription>No goals set yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-layer-2 border-border bg-gradient-to-br from-card to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-primary" />
          Goal Progress
        </CardTitle>
        <CardDescription>{plan.goals.length} goals in your plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan.goals.slice(0, 3).map((goal, index) => (
          <div key={index} className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex justify-between items-start gap-3">
              <span className="text-foreground font-medium line-clamp-2 flex-1">
                {goal}
              </span>
              <span className="text-sm text-muted-foreground shrink-0">0%</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">Track your progress towards this goal</p>
          </div>
        ))}
        
        {plan.goals.length > 3 && (
          <p className="text-sm text-muted-foreground text-center pt-2">
            +{plan.goals.length - 3} more goals
          </p>
        )}
      </CardContent>
    </Card>
  );
}
