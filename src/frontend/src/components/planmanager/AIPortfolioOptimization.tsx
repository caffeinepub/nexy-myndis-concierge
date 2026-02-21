import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Zap } from 'lucide-react';
import { generatePortfolioOptimization } from '../../utils/fakeAIData';

export default function AIPortfolioOptimization() {
  const optimization = generatePortfolioOptimization();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-success';
      case 'Medium':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-success/10 border-success/20';
      case 'Medium':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted/10 border-muted/20';
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Portfolio Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimization.opportunities.map((opp, index) => (
          <div key={index} className={`p-4 rounded-xl border ${getImpactBg(opp.impact)}`}>
            <div className="flex items-start gap-3">
              <TrendingUp className={`w-5 h-5 ${getImpactColor(opp.impact)} mt-0.5`} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-foreground">{opp.title}</h4>
                  <span className={`text-xs font-semibold ${getImpactColor(opp.impact)}`}>
                    {opp.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{opp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
