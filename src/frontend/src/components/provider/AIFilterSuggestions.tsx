import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateFilterSuggestions } from '../../utils/fakeAIData';

export default function AIFilterSuggestions() {
  const suggestions = generateFilterSuggestions();

  const getRelevanceBadge = (relevance: number) => {
    if (relevance >= 90) return 'bg-success text-success-foreground';
    if (relevance >= 75) return 'bg-primary text-primary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getRelevanceLabel = (relevance: number) => {
    if (relevance >= 90) return 'High';
    if (relevance >= 75) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Filter Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm text-foreground">{suggestion.filter}</p>
                <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRelevanceBadge(suggestion.relevance)}`}>
              {getRelevanceLabel(suggestion.relevance)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
