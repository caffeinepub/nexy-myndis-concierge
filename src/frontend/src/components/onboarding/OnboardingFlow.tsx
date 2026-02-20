import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import NDISBasicsScreen from './NDISBasicsScreen';
import FeatureDemoScreen from './FeatureDemoScreen';
import CompletionScreen from './CompletionScreen';
import { Progress } from '../ui/progress';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: WelcomeScreen, title: 'Welcome' },
    { component: NDISBasicsScreen, title: 'NDIS Basics' },
    { component: FeatureDemoScreen, title: 'Features' },
    { component: CompletionScreen, title: 'Complete' },
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[oklch(0.95_0.01_180)] to-[oklch(0.98_0.005_200)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[oklch(0.45_0.02_195)]">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-[oklch(0.45_0.02_195)]">
              ~{Math.max(1, 5 - currentStep * 2)} min remaining
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="flex justify-center py-8">
          <CurrentStepComponent onNext={handleNext} onSkip={handleSkip} />
        </div>
      </div>
    </div>
  );
}
