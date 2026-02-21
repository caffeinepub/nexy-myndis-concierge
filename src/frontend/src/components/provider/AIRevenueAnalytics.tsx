import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, DollarSign } from 'lucide-react';
import { generateRevenueAnalytics } from '../../utils/fakeAIData';

export default function AIRevenueAnalytics() {
  const analytics = generateRevenueAnalytics();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Revenue Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Predicted Monthly</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${analytics.predictedMonthly.toLocaleString()}</p>
            <p className="text-xs text-success mt-1">{analytics.monthOverMonth} vs last month</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Growth Trend</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{analytics.growthTrend}</p>
            <p className="text-xs text-primary mt-1">3-month average</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Key Insights</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {analytics.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
