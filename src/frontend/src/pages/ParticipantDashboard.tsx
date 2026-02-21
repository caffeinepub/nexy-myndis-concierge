import { useGetParticipantPlans, useGetParticipantBookings } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PlanOverviewCard from '../components/participant/PlanOverviewCard';
import BudgetSummaryCard from '../components/participant/BudgetSummaryCard';
import BudgetHealthIndicator from '../components/participant/BudgetHealthIndicator';
import GoalProgressCard from '../components/participant/GoalProgressCard';
import UpcomingBookingsCard from '../components/participant/UpcomingBookingsCard';
import AIInsightsCard from '../components/participant/AIInsightsCard';
import AIProviderRecommendations from '../components/participant/AIProviderRecommendations';
import AIMilestoneAlertsCard from '../components/participant/AIMilestoneAlertsCard';
import LoadingState from '../components/common/LoadingState';
import { TrendingUp, DollarSign, Target, Calendar, Brain } from 'lucide-react';

export default function ParticipantDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: plans, isLoading: plansLoading, error: plansError } = useGetParticipantPlans();
  const { data: bookings, isLoading: bookingsLoading } = useGetParticipantBookings();

  // Redirect to get-started if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/get-started' });
    }
  }, [identity, navigate]);

  const activePlan = plans?.find(p => p.status === 'active');

  // Calculate budget totals
  const totalBudget = activePlan ? activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.amount), 0) : 0;
  const totalSpent = activePlan ? activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.spent), 0) : 0;

  // AI recommendations count
  const aiRecommendationsCount = 3;

  if (plansLoading) {
    return (
      <PageLayout title="Dashboard">
        <LoadingState message="Loading your dashboard..." />
      </PageLayout>
    );
  }

  if (plansError) {
    return (
      <PageLayout title="Dashboard">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-destructive mb-4">Error loading dashboard data</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-primary-foreground mb-12 relative overflow-hidden shadow-layer-2">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Track your NDIS journey, manage your budget, and achieve your goals with AI-powered insights.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border transition-smooth hover:-translate-y-1 hover:shadow-layer-3 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-success/20 rounded-xl flex items-center justify-center mb-5">
            <DollarSign className="w-7 h-7 text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Total Budget</div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border transition-smooth hover:-translate-y-1 hover:shadow-layer-3 bg-gradient-to-br from-success/5 to-transparent">
          <div className="w-14 h-14 bg-gradient-to-br from-success/20 to-primary/20 rounded-xl flex items-center justify-center mb-5">
            <TrendingUp className="w-7 h-7 text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            ${totalSpent.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Total Spent</div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border transition-smooth hover:-translate-y-1 hover:shadow-layer-3 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-success/20 rounded-xl flex items-center justify-center mb-5">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {activePlan?.goals.length || 0}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Active Goals</div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-layer-2 border border-border transition-smooth hover:-translate-y-1 hover:shadow-layer-3 bg-gradient-to-br from-success/5 to-transparent">
          <div className="w-14 h-14 bg-gradient-to-br from-success/20 to-primary/20 rounded-xl flex items-center justify-center mb-5">
            <Brain className="w-7 h-7 text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {aiRecommendationsCount}
          </div>
          <div className="text-sm text-muted-foreground font-medium">AI Insights</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <PlanOverviewCard plan={activePlan} />
          <BudgetSummaryCard plan={activePlan} />
          <AIInsightsCard />
        </div>
        <div className="space-y-8">
          {identity && <BudgetHealthIndicator participant={identity.getPrincipal()} />}
          <AIProviderRecommendations />
          <AIMilestoneAlertsCard />
          <GoalProgressCard plan={activePlan} />
          <UpcomingBookingsCard bookings={bookings || []} isLoading={bookingsLoading} />
        </div>
      </div>
    </PageLayout>
  );
}
