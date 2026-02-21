import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateInvoiceRecommendations } from '../../utils/fakeAIData';

export default function AIInvoiceRecommendations() {
  const recommendations = generateInvoiceRecommendations();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Invoice Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">{rec.invoiceNumber}</h4>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-bold text-success">{rec.confidence}%</span>
              </div>
            </div>
            <Button variant="default" size="sm" className="w-full">
              {rec.action}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
