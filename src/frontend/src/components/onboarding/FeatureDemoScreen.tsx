import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles, Upload, Search, Calendar } from 'lucide-react';

interface FeatureDemoScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function FeatureDemoScreen({ onNext, onSkip }: FeatureDemoScreenProps) {
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[oklch(0.45_0.15_195)] to-[oklch(0.35_0.12_200)] flex items-center justify-center">
          <Sparkles className="text-white" size={32} />
        </div>
        <CardTitle className="text-2xl">Key Features</CardTitle>
        <p className="text-[oklch(0.45_0.02_195)]">
          Here's what you can do with NEXY MYNDIS
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[oklch(0.45_0.15_195)]/10 flex items-center justify-center shrink-0">
              <Upload className="text-[oklch(0.45_0.15_195)]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-1">
                Upload Your Plan
              </h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Simply upload your NDIS plan document and we'll help you understand your budget, 
                goals, and available services.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[oklch(0.45_0.15_195)]/10 flex items-center justify-center shrink-0">
              <Search className="text-[oklch(0.45_0.15_195)]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-1">
                Find Providers
              </h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Search for NDIS-registered providers by service type, location, and availability. 
                Read reviews and compare options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[oklch(0.45_0.15_195)]/10 flex items-center justify-center shrink-0">
              <Calendar className="text-[oklch(0.45_0.15_195)]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-1">
                Book Services
              </h3>
              <p className="text-sm text-[oklch(0.45_0.02_195)]">
                Request appointments with providers directly through the platform. 
                Track all your bookings in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[oklch(0.97_0.02_140)] border border-[oklch(0.55_0.15_140)] rounded-lg">
          <p className="text-sm text-[oklch(0.35_0.08_195)] text-center">
            <strong>Tip:</strong> Start by uploading your NDIS plan to unlock all features
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button variant="outline" onClick={onSkip} className="rounded-full">
            Skip Tour
          </Button>
          <Button onClick={onNext} size="lg" className="rounded-full min-w-[150px]">
            Finish Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
