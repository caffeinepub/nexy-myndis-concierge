import { CheckCircle, AlertCircle } from 'lucide-react';

interface AIPricingValidatorProps {
  price: number;
  serviceType: string;
}

export default function AIPricingValidator({ price, serviceType }: AIPricingValidatorProps) {
  // Mock validation - in real app would check against NDIS price guide
  const isValid = price > 0 && price < 500;
  const message = isValid
    ? 'Price within NDIS guidelines'
    : price === 0
    ? 'Please enter a price'
    : 'Price may exceed NDIS guidelines';

  if (price === 0) return null;

  return (
    <div className={`flex items-center gap-2 text-xs ${isValid ? 'text-success' : 'text-warning'}`}>
      {isValid ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span>{message}</span>
    </div>
  );
}
