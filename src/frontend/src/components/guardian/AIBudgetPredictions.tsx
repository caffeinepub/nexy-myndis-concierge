import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { generateBudgetPredictions } from '../../utils/fakeAIData';

export default function AIBudgetPredictions() {
  const predictions = generateBudgetPredictions();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Budget Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-warning mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Depletion Forecast</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Budget expected to deplete by: {predictions.depletionDate}
              </p>
              <p className="text-sm text-muted-foreground">
                Current spending rate: {predictions.currentSpendingRate}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Recommendations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {predictions.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
