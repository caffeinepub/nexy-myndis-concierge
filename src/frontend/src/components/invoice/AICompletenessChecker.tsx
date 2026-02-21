import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle, AlertCircle } from 'lucide-react';

export default function AICompletenessChecker() {
  const checks = [
    { label: 'Invoice number provided', passed: true },
    { label: 'Participant identified', passed: true },
    { label: 'Line items detailed', passed: true },
    { label: 'Pricing validated', passed: true },
  ];

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Completeness Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            {check.passed ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <AlertCircle className="w-5 h-5 text-warning" />
            )}
            <span className="text-sm text-foreground">{check.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
