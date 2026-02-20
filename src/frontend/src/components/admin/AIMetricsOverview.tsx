import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import type { AIAgentMetrics } from '../../backend';

interface AIMetricsOverviewProps {
  metrics: AIAgentMetrics;
}

export default function AIMetricsOverview({ metrics }: AIMetricsOverviewProps) {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatTime = (nanoseconds: bigint) => `${Number(nanoseconds) / 1000000}ms`;

  const avgConfidence = metrics.confidenceScores.length > 0
    ? metrics.confidenceScores.reduce((a, b) => a + b, 0) / metrics.confidenceScores.length
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Validation Accuracy */}
      <Card className="shadow-layer-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            Validation Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {formatPercentage(metrics.validationAccuracy)}
          </div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>Target: &gt;95%</span>
          </div>
        </CardContent>
      </Card>

      {/* False Positive Rate */}
      <Card className="shadow-layer-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            False Positive Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {formatPercentage(metrics.falsePositiveRate)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Target: &lt;5%</span>
          </div>
        </CardContent>
      </Card>

      {/* False Negative Rate */}
      <Card className="shadow-layer-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            False Negative Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {formatPercentage(metrics.falseNegativeRate)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Target: &lt;2%</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Processing Time */}
      <Card className="shadow-layer-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg Processing Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {formatTime(metrics.averageProcessingTime)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Target: &lt;2000ms</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Confidence Score */}
      <Card className="shadow-layer-2 border-border md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Confidence Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-1">
            {formatPercentage(avgConfidence)}
          </div>
          <div className="text-xs text-muted-foreground">
            Based on {metrics.confidenceScores.length} validation{metrics.confidenceScores.length !== 1 ? 's' : ''}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
