import { useState, useMemo } from 'react';
import { useGetAllProviders, useGetParticipantPlans } from '../hooks/useQueries';
import PageLayout from '../components/layout/PageLayout';
import ProviderCard from '../components/provider/ProviderCard';
import LoadingState from '../components/common/LoadingState';
import { Search, Filter, Sparkles } from 'lucide-react';
import type { ServiceProvider } from '../backend';

export default function ProvidersPage() {
  const { data: providers, isLoading } = useGetAllProviders();
  const { data: plans } = useGetParticipantPlans();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const activePlan = plans?.find(p => p.status === 'active');

  // Get unique service types from providers
  const serviceTypes = useMemo(() => {
    if (!providers) return [];
    const types = new Set<string>();
    providers.forEach(p => p.serviceTypes.forEach(t => types.add(t)));
    return Array.from(types).sort();
  }, [providers]);

  // Filter providers
  const filteredProviders = useMemo(() => {
    if (!providers) return [];

    return providers.filter(provider => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.serviceTypes.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Service type filter
      const matchesServiceType = selectedServiceType === 'all' ||
        provider.serviceTypes.includes(selectedServiceType);

      return matchesSearch && matchesServiceType;
    });
  }, [providers, searchQuery, selectedServiceType]);

  // Get recommended providers based on plan budget categories
  const recommendedProviders = useMemo(() => {
    if (!activePlan || !providers) return [];

    const budgetCategories = activePlan.categories.map(([name]) => name.toLowerCase());
    
    return providers
      .map(provider => {
        let score = 0;
        
        // Match service types to budget categories
        provider.serviceTypes.forEach(serviceType => {
          if (budgetCategories.some(cat => 
            cat.includes(serviceType.toLowerCase()) || 
            serviceType.toLowerCase().includes(cat)
          )) {
            score += 10;
          }
        });

        // Boost score for higher ratings
        if (provider.rating) {
          score += Number(provider.rating);
        }

        // Boost score for NDIS verified
        if (provider.ndisVerified) {
          score += 5;
        }

        return { provider, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.provider);
  }, [activePlan, providers]);

  return (
    <PageLayout title="Find Providers">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find NDIS Service Providers
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover qualified providers that match your needs
          </p>
        </div>

        {/* AI Recommendations Banner */}
        {recommendedProviders.length > 0 && (
          <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl p-8 mb-8 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Recommended for You
                </h2>
                <p className="text-muted-foreground">
                  Based on your NDIS plan, we've identified {recommendedProviders.length} providers that match your support needs
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl shadow-layer-1 p-6 mb-8 border border-border">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search providers or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
              />
            </div>

            {/* Service Type Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background appearance-none cursor-pointer"
              >
                <option value="all">All Services</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location Filter (placeholder) */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background appearance-none cursor-pointer"
              >
                <option value="all">All Locations</option>
                <option value="sydney">Sydney</option>
                <option value="melbourne">Melbourne</option>
                <option value="brisbane">Brisbane</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <LoadingState message="Loading providers..." />
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No providers found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedServiceType('all');
                setSelectedLocation('all');
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-md transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Recommended Providers Section */}
            {recommendedProviders.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Recommended for You
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recommendedProviders.map((provider) => (
                    <div key={provider.principal.toString()} className="relative">
                      <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-primary to-success text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                        Recommended
                      </div>
                      <ProviderCard provider={provider} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Providers */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                All Providers ({filteredProviders.length})
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.principal.toString()} provider={provider} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
