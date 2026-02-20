import { useGetGuardian, useGetBudgetThresholdAlerts } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import BudgetHealthIndicator from '../components/participant/BudgetHealthIndicator';
import PageLayout from '../components/layout/PageLayout';
import { Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function GuardianDashboard() {
  const { identity } = useInternetIdentity();
  const { data: guardian } = useGetGuardian();
  
  // Only fetch alerts if guardian data is available
  const participantPrincipal = guardian?.participant;
  const { data: alerts = [] } = useGetBudgetThresholdAlerts(participantPrincipal!);

  const participantsWithWarnings = alerts.length > 0 ? 1 : 0;

  return (
    <PageLayout title="Guardian Dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0d7377] to-[#1a1a2e] rounded-3xl p-12 text-white mb-12">
        <h1 className="text-4xl font-bold mb-4">Guardian Dashboard</h1>
        <p className="text-lg opacity-90">
          Manage and coordinate care for your participants
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Users className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">3</div>
          <div className="text-sm text-[#616161] font-medium">Participants</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <TrendingUp className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">$125K</div>
          <div className="text-sm text-[#616161] font-medium">Total Budgets</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Calendar className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">8</div>
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
