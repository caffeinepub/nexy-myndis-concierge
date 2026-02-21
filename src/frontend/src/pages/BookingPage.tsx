import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import AITimeSlotRecommendations from '../components/booking/AITimeSlotRecommendations';
import AIServiceSuggestions from '../components/booking/AIServiceSuggestions';
import AIBookingEstimator from '../components/booking/AIBookingEstimator';
import LoadingState from '../components/common/LoadingState';
import { Calendar, Clock, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Principal } from '@icp-sdk/core/principal';

// Mock types since backend doesn't have them
interface ServiceProvider {
  principal: Principal;
  name: string;
  serviceTypes: string[];
}

export default function BookingPage() {
  const { providerId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const [provider, setProvider] = useState<ServiceProvider | null>({
    principal: { toString: () => providerId || '' } as Principal,
    name: 'Sample Provider',
    serviceTypes: ['Occupational Therapy', 'Physiotherapy', 'Speech Pathology'],
  });
  const [serviceType, setServiceType] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('60');
  const [notes, setNotes] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('Core Supports');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity || !provider) return;

    setIsSubmitting(true);

    // Mock booking creation
    setTimeout(() => {
      setIsSubmitting(false);
      navigate({ to: '/dashboard' });
    }, 1000);
  };

  if (!provider) {
    return (
      <PageLayout title="Book Service">
        <div className="text-center py-12">
          <p className="text-destructive">Provider not found</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Book Service">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Book a Service</h1>
          <p className="text-lg text-muted-foreground">
            Schedule an appointment with {provider.name}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border space-y-6">
              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {provider.serviceTypes.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Budget Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core Supports">Core Supports</SelectItem>
                      <SelectItem value="Capacity Building">Capacity Building</SelectItem>
                      <SelectItem value="Capital Supports">Capital Supports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or notes..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <AITimeSlotRecommendations />
            <AIServiceSuggestions />
            <AIBookingEstimator />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
