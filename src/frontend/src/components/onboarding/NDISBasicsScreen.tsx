import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BookOpen } from 'lucide-react';

interface NDISBasicsScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function NDISBasicsScreen({ onNext, onSkip }: NDISBasicsScreenProps) {
  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[oklch(0.45_0.15_195)] to-[oklch(0.35_0.12_200)] flex items-center justify-center">
          <BookOpen className="text-white" size={32} />
        </div>
        <CardTitle className="text-2xl">Understanding Your NDIS Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-2">
              What is an NDIS Plan?
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_195)]">
              Your NDIS plan is a document that outlines the support and funding you'll receive. 
              It includes your goals, the services you need, and how much funding you have for each type of support.
            </p>
          </div>

          <div className="p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-2">
              Budget Categories
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_195)]">
              Your funding is divided into categories like Core Supports, Capacity Building, and Capital Supports. 
              Each category has its own budget that you can use for specific types of services.
            </p>
          </div>

          <div className="p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-2">
              Service Providers
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_195)]">
              Service providers are professionals and organizations registered with the NDIS who deliver 
              the supports outlined in your plan. You can choose which providers you want to work with.
            </p>
          </div>

          <div className="p-4 bg-[oklch(0.98_0.005_195)] rounded-lg">
            <h3 className="font-semibold text-[oklch(0.35_0.08_195)] mb-2">
              Plan Management
            </h3>
            <p className="text-sm text-[oklch(0.45_0.02_195)]">
              Plan management helps you keep track of your spending, pay invoices, and ensure you're 
              using your funding correctly. This platform makes plan management easy and automatic.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button variant="outline" onClick={onSkip} className="rounded-full">
            Skip Tour
          </Button>
          <Button onClick={onNext} size="lg" className="rounded-full min-w-[150px]">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
