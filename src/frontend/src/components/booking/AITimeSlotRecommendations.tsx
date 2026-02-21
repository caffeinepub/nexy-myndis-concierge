import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateTimeSlotRecommendations } from '../../utils/fakeAIData';

export default function AITimeSlotRecommendations() {
  const recommendations = generateTimeSlotRecommendations();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-primary';
    return 'text-warning';
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Time Slot Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((slot, index) => (
          <div key={index} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">{slot.time}</h4>
              </div>
              <div className="flex items-center gap-1">
                <Star className={`w-4 h-4 ${getConfidenceColor(slot.confidence)}`} />
                <span className={`text-sm font-bold ${getConfidenceColor(slot.confidence)}`}>
                  {slot.confidence}%
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{slot.reason}</p>
            <Button variant="outline" size="sm" className="w-full">
              Select This Time
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
