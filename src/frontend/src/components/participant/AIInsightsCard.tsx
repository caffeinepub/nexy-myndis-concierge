import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { generateAIInsights } from '../../utils/fakeAIData';

export default function AIInsightsCard() {
  const insights = generateAIInsights();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-success" />;
      default:
        return <Lightbulb className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'opportunity':
        return 'bg-success/10 border-success/20';
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Budget Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getBgColor(insight.type)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(insight.type)}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
