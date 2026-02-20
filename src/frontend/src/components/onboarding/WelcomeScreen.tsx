import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Heart, FileText, Users, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[oklch(0.45_0.15_195)] to-[oklch(0.35_0.12_200)] flex items-center justify-center">
          <Heart className="text-white" size={32} />
        </div>
        <CardTitle className="text-3xl">Welcome to NEXY MYNDIS</CardTitle>
        <p className="text-[oklch(0.45_0.02_195)] mt-2">
          Your personal NDIS support coordination platform
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-[oklch(0.45_0.02_195)]">
          We're here to make managing your NDIS plan simple and stress-free. 
          Let's take a quick tour of what you can do.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <FileText className="text-[oklch(0.45_0.15_195)] mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)]">Manage Your Plan</h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Upload and track your NDIS plan and budget
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <Users className="text-[oklch(0.45_0.15_195)] mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)]">Find Providers</h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Search and book services with trusted providers
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <Target className="text-[oklch(0.45_0.15_195)] mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)]">Track Goals</h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Monitor your progress towards your goals
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <Heart className="text-[oklch(0.45_0.15_195)] mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)]">Stay Compliant</h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Automatic compliance tracking and reporting
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button variant="outline" onClick={onSkip} className="rounded-full">
            Skip Tour
          </Button>
          <Button onClick={onNext} size="lg" className="rounded-full min-w-[150px]">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
