import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useDetectAnomalies } from '../hooks/useQueries';
import PageLayout from '../components/layout/PageLayout';
import AnomalyWarningBanner from '../components/provider/AnomalyWarningBanner';
import { DollarSign, Calendar, Star, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ProviderDashboard() {
  const { identity } = useInternetIdentity();
  
  // Only fetch anomalies if identity is available
  const providerPrincipal = identity?.getPrincipal();
  const { data: anomalies = [] } = useDetectAnomalies(providerPrincipal!);

  const flaggedInvoicesCount = anomalies.length;

  return (
    <PageLayout title="Provider Dashboard">
      {/* Anomaly Warning Banner */}
      {anomalies.length > 0 && (
        <AnomalyWarningBanner anomalies={anomalies} />
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0d7377] to-[#1a1a2e] rounded-3xl p-12 text-white mb-12">
        <h1 className="text-4xl font-bold mb-4">Provider Dashboard</h1>
        <p className="text-lg opacity-90">
          Manage your services, bookings, and client relationships
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Calendar className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">12</div>
          <div className="text-sm text-[#616161] font-medium">Bookings This Week</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <DollarSign className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">$8,500</div>
          <div className="text-sm text-[#616161] font-medium">Revenue This Month</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Star className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">4.8</div>
          <div className="text-sm text-[#616161] font-medium">Average Rating</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#fff3e0] rounded-xl flex items-center justify-center mb-5">
            <AlertTriangle className="w-7 h-7 text-[#ff9800]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{flaggedInvoicesCount}</div>
          <div className="text-sm text-[#616161] font-medium">Flagged Invoices</div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#0d7377]" />
            Upcoming Appointments
          </h2>
          <p className="text-[#616161]">Appointment management features coming soon...</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-[#0d7377]" />
            Recent Invoices
          </h2>
          <p className="text-[#616161]">Invoice management features coming soon...</p>
        </div>
      </div>
    </PageLayout>
  );
}
