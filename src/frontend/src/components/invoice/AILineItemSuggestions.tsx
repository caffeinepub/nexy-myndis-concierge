import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AILineItemSuggestionsProps {
  onSelectSuggestion: (suggestion: { description: string; quantity: number; price: number }) => void;
}

export default function AILineItemSuggestions({ onSelectSuggestion }: AILineItemSuggestionsProps) {
  const suggestions = [
    { description: 'Occupational Therapy Session (60 min)', quantity: 1, price: 193.99 },
    { description: 'Physiotherapy Session (60 min)', quantity: 1, price: 214.24 },
    { description: 'Speech Pathology Session (60 min)', quantity: 1, price: 193.99 },
  ];

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Line Item Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-3 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{suggestion.description}</p>
                <p className="text-xs text-muted-foreground">Qty: {suggestion.quantity}</p>
              </div>
              <p className="text-sm font-bold text-foreground">${suggestion.price}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Invoice
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
