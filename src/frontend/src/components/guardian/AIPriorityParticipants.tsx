import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePriorityParticipants } from '../../utils/fakeAIData';

export default function AIPriorityParticipants() {
  const priorities = generatePriorityParticipants();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-destructive/20 bg-destructive/5';
      case 'medium':
        return 'border-warning/20 bg-warning/5';
      default:
        return 'border-success/20 bg-success/5';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Priority Participants
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {priorities.map((participant, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getUrgencyColor(participant.urgency)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{participant.name}</h4>
                <p className="text-sm text-muted-foreground">{participant.reason}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyBadge(participant.urgency)}`}>
                {participant.urgency}
              </span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              {participant.action}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
