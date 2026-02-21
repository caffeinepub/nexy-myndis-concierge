import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingStateProps {
  message?: string;
  timeout?: number;
  onTimeout?: () => void;
}

export default function LoadingState({ 
  message = 'Loading...', 
  timeout = 15000,
  onTimeout 
}: LoadingStateProps) {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
      onTimeout?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  if (showTimeout) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-destructive mb-4">Loading is taking longer than expected</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
