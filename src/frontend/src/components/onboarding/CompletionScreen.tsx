import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';

interface CompletionScreenProps {
  onNext: () => void;
}

export default function CompletionScreen({ onNext }: CompletionScreenProps) {
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.15_140)] flex items-center justify-center">
          <CheckCircle2 className="text-white" size={40} />
        </div>
        <CardTitle className="text-3xl">You're All Set!</CardTitle>
        <p className="text-[oklch(0.45_0.02_195)] mt-2">
          Welcome to your NDIS support coordination platform
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <p className="text-[oklch(0.45_0.02_195)]">
            You've completed the tour and you're ready to start managing your NDIS plan.
          </p>

          <div className="p-6 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-3">
              Recommended Next Steps:
            </h3>
            <ol className="text-left space-y-2 text-sm text-[oklch(0.45_0.02_195)]">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[oklch(0.45_0.15_195)]">1.</span>
                <span>Upload your NDIS plan document</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[oklch(0.45_0.15_195)]">2.</span>
                <span>Review your budget and goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[oklch(0.45_0.15_195)]">3.</span>
                <span>Search for service providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[oklch(0.45_0.15_195)]">4.</span>
                <span>Book your first appointment</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={onNext} size="lg" className="rounded-full min-w-[200px]">
            Go to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
