import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { generateRiskAssessments } from '../../utils/fakeAIData';

export default function AIRiskAssessmentCard() {
  const risks = generateRiskAssessments();

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <CheckCircle className="w-5 h-5 text-success" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'border-destructive/20 bg-destructive/5';
      case 'medium':
        return 'border-warning/20 bg-warning/5';
      default:
        return 'border-success/20 bg-success/5';
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getRiskColor(risk.riskLevel)}`}
          >
            <div className="flex items-start gap-3 mb-3">
              {getRiskIcon(risk.riskLevel)}
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{risk.participant}</h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {risk.riskLevel} Risk Level
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-3">
              {risk.factors.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-success mt-0.5">•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-sm font-medium text-foreground">{risk.recommendation}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
