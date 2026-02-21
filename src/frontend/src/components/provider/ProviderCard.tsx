import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AICompatibilityBadge from './AICompatibilityBadge';
import type { Principal } from '@icp-sdk/core/principal';

interface ServiceProvider {
  principal: Principal;
  name: string;
  abn: string;
  ndisVerified: boolean;
  serviceTypes: string[];
  summary: string;
  availability: any[];
  priceList: any[];
  rating?: number;
}

interface ProviderCardProps {
  provider: ServiceProvider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate({ to: `/booking/${provider.principal.toString()}` });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border hover:shadow-layer-3 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-success/20 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-primary">
              {provider.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{provider.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              {provider.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-semibold text-foreground">{provider.rating}.0</span>
                </div>
              )}
              {provider.ndisVerified && (
                <Badge variant="secondary" className="text-xs">
                  NDIS Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        <AICompatibilityBadge />
      </div>

      <p className="text-sm text-muted-foreground mb-4">{provider.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {provider.serviceTypes.map((service) => (
          <Badge key={service} variant="outline">
            {service}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Available</span>
          </div>
        </div>
        <Button onClick={handleBookNow}>
          Book Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
