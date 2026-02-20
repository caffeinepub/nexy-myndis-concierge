import { useGetParticipantPlans, useGetParticipantBookings } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import PlanOverviewCard from '../components/participant/PlanOverviewCard';
import BudgetSummaryCard from '../components/participant/BudgetSummaryCard';
import BudgetHealthIndicator from '../components/participant/BudgetHealthIndicator';
import GoalProgressCard from '../components/participant/GoalProgressCard';
import UpcomingBookingsCard from '../components/participant/UpcomingBookingsCard';
import LoadingState from '../components/common/LoadingState';
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';

export default function ParticipantDashboard() {
  const { data: plans, isLoading: plansLoading } = useGetParticipantPlans();
  const { data: bookings, isLoading: bookingsLoading } = useGetParticipantBookings();
  const { identity } = useInternetIdentity();

  const activePlan = plans?.find(p => p.status === 'active');

  // Calculate budget totals
  const totalBudget = activePlan ? activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.amount), 0) : 0;
  const totalSpent = activePlan ? activePlan.categories.reduce((sum, [, cat]) => sum + Number(cat.spent), 0) : 0;
  const remainingBudget = totalBudget - totalSpent;

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
            Track your NDIS journey, manage your budget, and achieve your goals with confidence.
          </p>
        </div>
      </div>

      {plansLoading ? (
        <LoadingState message="Loading your dashboard..." />
      ) : (
        <>
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
                <Calendar className="w-7 h-7 text-success" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {bookings?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Upcoming Bookings</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <PlanOverviewCard plan={activePlan} />
              <BudgetSummaryCard plan={activePlan} />
            </div>
            <div className="space-y-8">
              {identity && <BudgetHealthIndicator participant={identity.getPrincipal()} />}
              <GoalProgressCard plan={activePlan} />
              <UpcomingBookingsCard bookings={bookings || []} isLoading={bookingsLoading} />
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
