import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Users, ArrowUp, ArrowRight } from 'lucide-react';
import { generateClientNeedsPrediction } from '../../utils/fakeAIData';

export default function AIClientNeedsPrediction() {
  const prediction = generateClientNeedsPrediction();

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-success" />;
    return <ArrowRight className="w-4 h-4 text-primary" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-success';
    return 'text-primary';
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
          <div className="space-y-3">
            {prediction.nextMonth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.service}</p>
                  <p className="text-xs text-muted-foreground">{item.recommendation}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(item.trend)}
                  <span className={`text-sm font-semibold ${getTrendColor(item.trend)}`}>
                    {item.predictedBookings} bookings
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
