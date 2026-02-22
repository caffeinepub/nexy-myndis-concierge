import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProviderCard from '../components/provider/ProviderCard';
import AIFilterSuggestions from '../components/provider/AIFilterSuggestions';
import AICompatibilityInsights from '../components/provider/AICompatibilityInsights';
import LoadingState from '../components/common/LoadingState';
import { Search, Filter, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Principal } from '@icp-sdk/core/principal';

// Mock provider type
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
  location: string;
  phone: string;
}

// Mock providers data - Kenyan localized
const mockProviders: ServiceProvider[] = [
  {
    principal: { toString: () => 'provider-1' } as Principal,
    name: 'Wanjiku Mwangi',
    abn: '12345678901',
    ndisVerified: true,
    serviceTypes: ['Occupational Therapy'],
    summary: 'Experienced OT specializing in mobility and daily living skills',
    availability: [],
    priceList: [],
    rating: 5,
    location: 'Westlands, Nairobi',
    phone: '+254 722 345 678',
  },
  {
    principal: { toString: () => 'provider-2' } as Principal,
    name: 'Nairobi Physio Care',
    abn: '98765432109',
    ndisVerified: true,
    serviceTypes: ['Physiotherapy'],
    summary: 'Professional physiotherapy services for all ages',
    availability: [],
    priceList: [],
    rating: 4,
    location: 'Kilimani, Nairobi',
    phone: '+254 733 456 789',
  },
  {
    principal: { toString: () => 'provider-3' } as Principal,
    name: 'Community Connect Kenya',
    abn: '55566677788',
    ndisVerified: true,
    serviceTypes: ['Social Participation', 'Community Access'],
    summary: 'Building connections and community engagement',
    availability: [],
    priceList: [],
    rating: 5,
    location: 'Nyali, Mombasa',
    phone: '+254 711 234 567',
  },
  {
    principal: { toString: () => 'provider-4' } as Principal,
    name: 'Ochieng Otieno',
    abn: '44455566677',
    ndisVerified: true,
    serviceTypes: ['Speech Therapy'],
    summary: 'Specialized speech and language therapy services',
    availability: [],
    priceList: [],
    rating: 5,
    location: 'Nakuru',
    phone: '+254 720 987 654',
  },
  {
    principal: { toString: () => 'provider-5' } as Principal,
    name: 'Kisumu Wellness Center',
    abn: '33344455566',
    ndisVerified: true,
    serviceTypes: ['Physiotherapy', 'Occupational Therapy'],
    summary: 'Comprehensive rehabilitation and therapy services',
    availability: [],
    priceList: [],
    rating: 4,
    location: 'Kisumu',
    phone: '+254 712 345 678',
  },
];

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  const providers = mockProviders;
  const isLoading = false;

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = !selectedService || provider.serviceTypes.includes(selectedService);
    return matchesSearch && matchesService;
  });

  const allServices = Array.from(new Set(providers.flatMap(p => p.serviceTypes)));

  if (isLoading) {
    return (
      <PageLayout title="Find Providers">
        <LoadingState message="Loading providers..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Find Providers">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Service Providers</h1>
          <p className="text-lg text-muted-foreground">
            Discover NDIS-registered providers with AI-powered recommendations
          </p>
        </div>

        {/* AI Recommendation Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI-Powered Provider Matching
              </h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your plan goals, budget, and preferences to recommend the best providers for your needs.
                Providers are ranked by compatibility score.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Type
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  >
                    <option value="">All Services</option>
                    {allServices.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <AIFilterSuggestions />
            <AICompatibilityInsights />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search providers by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base"
              />
            </div>

            {/* Results */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Found {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
              </p>

              <div className="grid gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.principal.toString()} provider={provider} />
                ))}
              </div>

              {filteredProviders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No providers found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
