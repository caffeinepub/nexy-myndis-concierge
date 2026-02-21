import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useDetectAnomalies, useGetProviderBookings, useGetProviderInvoices } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AnomalyWarningBanner from '../components/provider/AnomalyWarningBanner';
import AIRevenueAnalytics from '../components/provider/AIRevenueAnalytics';
import AIBookingOptimization from '../components/provider/AIBookingOptimization';
import AIClientNeedsPrediction from '../components/provider/AIClientNeedsPrediction';
import LoadingState from '../components/common/LoadingState';
import { DollarSign, Calendar, Star, TrendingUp, AlertTriangle, Brain } from 'lucide-react';

export default function ProviderDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  
  // Only fetch data if identity is available
  const providerPrincipal = identity?.getPrincipal();
  const { data: anomalies = [], isLoading: anomaliesLoading } = useDetectAnomalies(providerPrincipal);
  const { data: bookings = [], isLoading: bookingsLoading } = useGetProviderBookings();
  const { data: invoices = [], isLoading: invoicesLoading } = useGetProviderInvoices();

  // Redirect to get-started if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/get-started' });
    }
  }, [identity, navigate]);

  const flaggedInvoicesCount = anomalies.length;
  const aiInsightsCount = 8;

  if (anomaliesLoading || bookingsLoading || invoicesLoading) {
    return (
      <PageLayout title="Provider Dashboard">
        <LoadingState message="Loading provider dashboard..." />
      </PageLayout>
    );
  }

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
          Manage your services, bookings, and client relationships with AI-powered analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Calendar className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{bookings.length}</div>
          <div className="text-sm text-[#616161] font-medium">Active Bookings</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <DollarSign className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{invoices.length}</div>
          <div className="text-sm text-[#616161] font-medium">Pending Invoices</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Brain className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{aiInsightsCount}</div>
          <div className="text-sm text-[#616161] font-medium">AI Insights</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#fff3e0] rounded-xl flex items-center justify-center mb-5">
            <AlertTriangle className="w-7 h-7 text-[#ff9800]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{flaggedInvoicesCount}</div>
          <div className="text-sm text-[#616161] font-medium">Flagged Items</div>
        </div>
      </div>

      {/* AI Analytics Section */}
      <div className="grid gap-8 lg:grid-cols-3 mb-8">
        <AIRevenueAnalytics />
        <AIBookingOptimization />
        <AIClientNeedsPrediction />
      </div>

      {/* Additional Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#0d7377]" />
            Recent Bookings
          </h2>
          {bookings.length > 0 ? (
            <p className="text-[#616161]">You have {bookings.length} active bookings</p>
          ) : (
            <p className="text-[#616161]">No active bookings at this time</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-[#0d7377]" />
            Revenue Overview
          </h2>
          <p className="text-[#616161]">Revenue tracking and analytics</p>
        </div>
      </div>
    </PageLayout>
  );
}
