import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetProvider, useCreateBooking, useValidateBudgetTransaction } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import BudgetValidationAlert from '../components/participant/BudgetValidationAlert';
import ValidationExplanationModal from '../components/common/ValidationExplanationModal';
import { Button } from '../components/ui/button';
import { Calendar, Clock, DollarSign, Loader2, AlertTriangle } from 'lucide-react';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';
import type { Booking, BudgetValidationResult, BookingStatus } from '../backend';

export default function BookingPage() {
  const { providerId } = useParams({ from: '/booking/$providerId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const getProvider = useGetProvider();
  const createBooking = useCreateBooking();
  const validateTransaction = useValidateBudgetTransaction();

  const [provider, setProvider] = useState<any>(null);
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(0);
  const [validation, setValidation] = useState<BudgetValidationResult | null>(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (providerId && identity) {
      const fetchProvider = async () => {
        try {
          const providerPrincipal = Principal.fromText(providerId);
          const result = await getProvider.mutateAsync(providerPrincipal);
          setProvider(result);
          if (result.serviceTypes.length > 0) {
            setServiceType(result.serviceTypes[0]);
          }
        } catch (error) {
          console.error('Failed to fetch provider:', error);
          toast.error('Failed to load provider details');
        }
      };
      fetchProvider();
    }
  }, [providerId, identity]);

  const handleValidate = async () => {
    if (!identity || !provider || !serviceType || price <= 0) {
      toast.error('Please fill in all booking details');
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateTransaction.mutateAsync({
        participant: identity.getPrincipal(),
        category: serviceType,
        amount: BigInt(price),
      });
      setValidation(result);
      setShowValidationModal(true);
    } catch (error: any) {
      console.error('Validation error:', error);
      toast.error(error.message || 'Failed to validate budget');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity || !provider) {
      toast.error('Authentication required');
      return;
    }

    if (!validation || !validation.valid) {
      toast.error('Please validate the booking first');
      return;
    }

    try {
      const startTime = new Date(`${date}T${time}`).getTime() * 1000000;
      const endTime = startTime + (3600000 * 1000000);

      const booking: Booking = {
        participant: identity.getPrincipal(),
        provider: provider.principal,
        serviceType,
        timeSlot: {
          start: BigInt(startTime),
          end: BigInt(endTime),
        },
        status: 'pending' as BookingStatus,
        price: BigInt(price),
      };

      await createBooking.mutateAsync(booking);
      toast.success('Booking created successfully!');
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to create booking');
    }
  };

  if (!provider) {
    return (
      <PageLayout title="Book Service">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Book Service">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl shadow-layer-2 p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Book Service with {provider.name}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Service Type *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
              >
                {provider.serviceTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Time *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Price (AUD) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                placeholder="Enter service price"
              />
            </div>

            {validation && (
              <BudgetValidationAlert validation={validation} className="mt-4" />
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleValidate}
                disabled={isValidating || !serviceType || !date || !time || price <= 0}
                className="flex-1"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Validate Budget
                  </>
                )}
              </Button>

              <Button
                type="submit"
                disabled={createBooking.isPending || !validation || !validation.valid}
                className="flex-1"
              >
                {createBooking.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Booking...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {validation && (
        <ValidationExplanationModal
          isOpen={showValidationModal}
          onClose={() => setShowValidationModal(false)}
          validation={validation}
          transactionDetails={{
            category: serviceType,
            amount: price,
          }}
        />
      )}
    </PageLayout>
  );
}
