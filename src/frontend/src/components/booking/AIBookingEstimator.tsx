import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, DollarSign, Clock, TrendingDown } from 'lucide-react';
import { generateBookingEstimate } from '../../utils/fakeAIData';

export default function AIBookingEstimator() {
  const estimate = generateBookingEstimate();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Booking Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Duration</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{estimate.duration} min</p>
          </div>
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Total Cost</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${estimate.cost}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <h4 className="font-semibold text-foreground mb-2">Budget Impact</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium text-foreground">{estimate.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impact:</span>
              <span className="font-medium text-success">{estimate.budgetImpact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remaining:</span>
              <span className="font-medium text-foreground">${estimate.remainingFunds.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
