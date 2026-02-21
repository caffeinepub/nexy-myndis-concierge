import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Users } from 'lucide-react';
import { generateClientNeedsPrediction } from '../../utils/fakeAIData';

export default function AIClientNeedsPrediction() {
  const prediction = generateClientNeedsPrediction();

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-success';
    if (trend === 'Stable') return 'text-primary';
    return 'text-warning';
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Demand Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Next 30 Days</h4>
          </div>
          <div className="space-y-2">
            {prediction.nextMonth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.service}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${getTrendColor(item.trend)}`}>
                    {item.trend}
                  </span>
                  <span className="text-xs text-muted-foreground">({item.demand})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Recommendations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {prediction.recommendations.map((rec, index) => (
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
