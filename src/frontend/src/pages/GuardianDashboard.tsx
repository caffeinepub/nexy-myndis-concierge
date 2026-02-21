import { useGetGuardian, useGetBudgetThresholdAlerts } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import BudgetHealthIndicator from '../components/participant/BudgetHealthIndicator';
import AIRiskAssessmentCard from '../components/guardian/AIRiskAssessmentCard';
import AIBudgetPredictions from '../components/guardian/AIBudgetPredictions';
import AIPriorityParticipants from '../components/guardian/AIPriorityParticipants';
import PageLayout from '../components/layout/PageLayout';
import LoadingState from '../components/common/LoadingState';
import { Users, TrendingUp, Calendar, AlertCircle, Brain } from 'lucide-react';

export default function GuardianDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: guardian, isLoading: guardianLoading, error: guardianError } = useGetGuardian();
  
  // Only fetch alerts if guardian data is available
  const participantPrincipal = guardian?.participant;
  const { data: alerts = [] } = useGetBudgetThresholdAlerts(participantPrincipal);

  // Redirect to get-started if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/get-started' });
    }
  }, [identity, navigate]);

  const participantsWithWarnings = alerts.length > 0 ? 1 : 0;
  const aiInsightsCount = 5;

  if (guardianLoading) {
    return (
      <PageLayout title="Guardian Dashboard">
        <LoadingState message="Loading guardian dashboard..." />
      </PageLayout>
    );
  }

  if (guardianError) {
    return (
      <PageLayout title="Guardian Dashboard">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-destructive mb-4">Error loading guardian data</p>
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
    <PageLayout title="Guardian Dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0d7377] to-[#1a1a2e] rounded-3xl p-12 text-white mb-12">
        <h1 className="text-4xl font-bold mb-4">Guardian Dashboard</h1>
        <p className="text-lg opacity-90">
          Manage and coordinate care for your participants with AI-powered insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Users className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">1</div>
          <div className="text-sm text-[#616161] font-medium">Participants</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Brain className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{aiInsightsCount}</div>
          <div className="text-sm text-[#616161] font-medium">AI Insights</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Calendar className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">0</div>
          <div className="text-sm text-[#616161] font-medium">Upcoming Bookings</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#fff3e0] rounded-xl flex items-center justify-center mb-5">
            <AlertCircle className="w-7 h-7 text-[#ff9800]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{participantsWithWarnings}</div>
          <div className="text-sm text-[#616161] font-medium">Budget Warnings</div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <AIRiskAssessmentCard />
        <AIBudgetPredictions />
      </div>

      <div className="mb-8">
        <AIPriorityParticipants />
      </div>

      {/* Content Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-[#0d7377]" />
            Participants Overview
          </h2>
          <p className="text-[#616161]">Participant management features coming soon...</p>
        </div>

        {guardian && guardian.participant && (
          <BudgetHealthIndicator participant={guardian.participant} />
        )}
      </div>
    </PageLayout>
  );
}
