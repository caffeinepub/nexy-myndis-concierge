import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { DollarSign, AlertTriangle } from 'lucide-react';
import type { NDISPlan } from '../../backend';

interface BudgetSummaryCardProps {
  plan?: NDISPlan;
}

export default function BudgetSummaryCard({ plan }: BudgetSummaryCardProps) {
  if (!plan || plan.categories.length === 0) {
    return (
      <Card className="shadow-layer-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="text-primary" />
            Budget Summary
          </CardTitle>
          <CardDescription>No budget information available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const totalAllocated = plan.categories.reduce((sum, [, cat]) => sum + Number(cat.amount), 0);
  const totalSpent = plan.categories.reduce((sum, [, cat]) => sum + Number(cat.spent), 0);
  const remaining = totalAllocated - totalSpent;
  const utilizationPercent = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  const isWarning = utilizationPercent >= 80;

  return (
    <Card className="shadow-layer-2 border-border bg-gradient-to-br from-card to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="text-primary" />
          Budget Summary
        </CardTitle>
        <CardDescription>Your funding overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Total Allocated</span>
            <span className="font-semibold text-foreground">${totalAllocated.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Spent</span>
            <span className="font-semibold text-foreground">${totalSpent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
            <span className="text-foreground">Remaining</span>
            <span className={isWarning ? 'text-warning' : 'text-success'}>
              ${remaining.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Budget Used</span>
            <span className="font-semibold text-foreground">{utilizationPercent.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden shadow-sm">
            <div
              className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                isWarning 
                  ? 'bg-gradient-to-r from-warning to-destructive' 
                  : 'bg-gradient-to-r from-primary to-success'
              }`}
              style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        {isWarning && (
          <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-xl border border-warning/20">
            <AlertTriangle size={20} className="text-warning mt-0.5 shrink-0" />
            <p className="text-sm text-foreground">
              You've used over 80% of your budget. Consider reviewing your spending.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
