import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, CheckCircle } from 'lucide-react';
import { generateComplianceMetrics } from '../../utils/fakeAIData';

export default function AIComplianceMonitor() {
  const metrics = generateComplianceMetrics();

  return (
    <Card className="shadow-layer-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Compliance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Compliance Score</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.score}%</p>
            <p className="text-xs text-success mt-1">Excellent</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Audits Passed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.auditsPassed}/{metrics.auditsTotal}</p>
            <p className="text-xs text-primary mt-1">Last 30 days</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Recent Checks</h4>
          <div className="space-y-2">
            {metrics.recentChecks.map((check, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{check.name}</p>
                  <p className="text-xs text-muted-foreground">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
