import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.45_0.15_195)] mb-4" />
      <p className="text-[oklch(0.45_0.02_195)]">{message}</p>
    </div>
  );
}
