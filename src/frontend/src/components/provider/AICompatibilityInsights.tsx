import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle } from 'lucide-react';
import { generateCompatibilityInsights } from '../../utils/fakeAIData';

export default function AICompatibilityInsights() {
  const insights = generateCompatibilityInsights();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Compatibility Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-xs text-muted-foreground mb-1">Service Alignment</p>
            <p className="text-xl font-bold text-foreground">{insights.serviceAlignment}%</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Budget Fit</p>
            <p className="text-xl font-bold text-foreground">{insights.budgetFit}%</p>
          </div>
          <div className="p-3 rounded-xl bg-success/10 border border-success/20">
            <p className="text-xs text-muted-foreground mb-1">Availability</p>
            <p className="text-xl font-bold text-foreground">{insights.availabilityMatch}%</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Performance</p>
            <p className="text-xl font-bold text-foreground">{insights.performanceHistory}%</p>
          </div>
        </div>
        <div className="space-y-2">
          {insights.factors.map((factor, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
