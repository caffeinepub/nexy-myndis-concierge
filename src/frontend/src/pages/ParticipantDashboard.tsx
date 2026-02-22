import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PlanOverviewCard from '../components/participant/PlanOverviewCard';
import BudgetSummaryCard from '../components/participant/BudgetSummaryCard';
import GoalProgressCard from '../components/participant/GoalProgressCard';
import UpcomingBookingsCard from '../components/participant/UpcomingBookingsCard';
import AIInsightsCard from '../components/participant/AIInsightsCard';
import AIMilestoneAlertsCard from '../components/participant/AIMilestoneAlertsCard';
import AIProviderRecommendations from '../components/participant/AIProviderRecommendations';
import LoadingState from '../components/common/LoadingState';
import { AlertCircle } from 'lucide-react';

export default function ParticipantDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (!identity) {
    return null;
  }

  if (profileLoading) {
    return (
      <PageLayout title="Dashboard">
        <LoadingState message="Loading your dashboard..." />
      </PageLayout>
    );
  }

  // Mock bookings data for Kenyan context
  const mockBookings = [
    {
      participant: identity.getPrincipal(),
      provider: { toString: () => 'provider-wanjiku' } as any,
      serviceType: 'Physiotherapy Session',
      timeSlot: {
        start: BigInt(Date.now() + 86400000) * BigInt(1000000), // Tomorrow
        end: BigInt(Date.now() + 90000000) * BigInt(1000000),
      },
      status: 'confirmed' as const,
      price: BigInt(8500),
      location: 'Westlands, Nairobi',
    },
    {
      participant: identity.getPrincipal(),
      provider: { toString: () => 'provider-ochieng' } as any,
      serviceType: 'Occupational Therapy',
      timeSlot: {
        start: BigInt(Date.now() + 172800000) * BigInt(1000000), // 2 days
        end: BigInt(Date.now() + 176400000) * BigInt(1000000),
      },
      status: 'confirmed' as const,
      price: BigInt(7800),
      location: 'Kilimani, Nairobi',
    },
  ];

  return (
    <PageLayout title="Participant Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.name || 'Participant'}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's an overview of your NDIS plan and upcoming activities
          </p>
        </div>

        {/* AI Insights Banner */}
        <div className="mb-8">
          <AIInsightsCard />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <PlanOverviewCard />
          </div>
          <div>
            <BudgetSummaryCard />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <GoalProgressCard />
          <UpcomingBookingsCard bookings={mockBookings} />
        </div>

        {/* AI Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <AIMilestoneAlertsCard />
          <AIProviderRecommendations />
        </div>
      </div>
    </PageLayout>
  );
}
