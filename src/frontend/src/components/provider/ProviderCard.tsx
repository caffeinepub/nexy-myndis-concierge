import { ServiceProvider } from '../../backend';
import { Star, MapPin, Award, Calendar } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface ProviderCardProps {
  provider: ServiceProvider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const navigate = useNavigate();
  const rating = provider.rating ? Number(provider.rating) : 0;
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  const handleBookService = () => {
    navigate({ to: `/booking/${provider.principal.toString()}` });
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-layer-3">
      {/* Provider Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-success/20 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-primary text-2xl font-bold">
            {provider.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {provider.name}
          </h3>
          {provider.ndisVerified && (
            <p className="text-sm text-success mb-2 flex items-center gap-1">
              <Award className="w-4 h-4" />
              NDIS Verified
            </p>
          )}
          <div className="flex items-center gap-2">
            <div className="flex">
              {stars.map((filled, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${filled ? 'text-warning fill-warning' : 'text-muted'}`}
                />
              ))}
            </div>
            {rating > 0 && (
              <span className="text-sm text-muted-foreground">
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Provider Summary */}
      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
        {provider.summary || 'Experienced NDIS service provider committed to quality care and support.'}
      </p>

      {/* Service Types */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Specialties</h4>
        <div className="flex flex-wrap gap-2">
          {provider.serviceTypes.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg"
            >
              {service}
            </span>
          ))}
          {provider.serviceTypes.length > 3 && (
            <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-lg">
              +{provider.serviceTypes.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleBookService}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-success text-primary-foreground rounded-xl font-semibold hover:shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Book Service
        </button>
      </div>
    </div>
  );
}
