import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Users, Zap } from 'lucide-react';
import { generateBookingOptimization } from '../../utils/fakeAIData';

export default function AIBookingOptimization() {
  const optimization = generateBookingOptimization();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Booking Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Optimal Time Slots</h4>
              {optimization.optimalSlots.map((slot, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {slot.day} {slot.time} for {slot.increase} more bookings
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-success mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Service Bundling</h4>
              {optimization.bundlingSuggestions.map((suggestion, index) => (
                <p key={index} className="text-sm text-muted-foreground mb-1">
                  {suggestion}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Efficiency Tips</h4>
              {optimization.efficiencyTips.map((tip, index) => (
                <p key={index} className="text-sm text-muted-foreground mb-1">
                  {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
