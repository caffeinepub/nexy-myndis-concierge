import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateServiceSuggestions } from '../../utils/fakeAIData';

export default function AIServiceSuggestions() {
  const suggestions = generateServiceSuggestions();

  const getBudgetFitColor = (fit: string) => {
    switch (fit) {
      case 'Excellent':
        return 'text-success';
      case 'Good':
        return 'text-primary';
      default:
        return 'text-warning';
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Service Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((service, index) => (
          <div key={index} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{service.service}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">${service.price}</p>
                <p className={`text-xs font-semibold ${getBudgetFitColor(service.budgetFit)}`}>
                  {service.budgetFit}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>{service.goalAlignment}% goal alignment</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
