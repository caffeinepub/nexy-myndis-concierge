import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AnomalyWarningBannerProps {
  anomalies: string[];
  onDismiss?: () => void;
}

export default function AnomalyWarningBanner({ anomalies, onDismiss }: AnomalyWarningBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || anomalies.length === 0) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <Alert className="border-warning bg-warning/10 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
        <div className="flex-1">
          <AlertTitle className="text-base font-semibold text-foreground mb-2">
            Anomaly Detection Alert
          </AlertTitle>
          <AlertDescription className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Our AI system has detected unusual patterns in your recent invoices. Please review the following:
            </p>
            <ul className="space-y-1 text-sm">
              {anomalies.map((anomaly, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>{anomaly}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              If you believe this is an error, please contact support or review your invoice details.
            </p>
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Alert>
  );
}
