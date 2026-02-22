import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AIRevenueAnalytics from '../components/provider/AIRevenueAnalytics';
import AIBookingOptimization from '../components/provider/AIBookingOptimization';
import AIClientNeedsPrediction from '../components/provider/AIClientNeedsPrediction';
import AnomalyWarningBanner from '../components/provider/AnomalyWarningBanner';
import LoadingState from '../components/common/LoadingState';
import { DollarSign, Calendar, Users, TrendingUp } from 'lucide-react';

export default function ProviderDashboard() {
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

  // Mock data for provider stats
  const stats = {
    monthlyRevenue: 'KES 385,000',
    upcomingBookings: 18,
    activeClients: 24,
    growthRate: '+12%',
  };

  // Mock bookings data
  const upcomingBookings = [
    { client: 'Wanjiku Kamau', service: 'Physiotherapy', time: 'Today, 10:00 AM', location: 'Westlands' },
    { client: 'Ochieng Otieno', service: 'Occupational Therapy', time: 'Today, 2:00 PM', location: 'Kilimani' },
    { client: 'Akinyi Njeri', service: 'Speech Therapy', time: 'Tomorrow, 9:00 AM', location: 'Nyali' },
  ];

  // Mock anomalies for Kenyan context
  const mockAnomalies = [
    'Invoice #INV-2026-045 shows 30% higher rate than usual for physiotherapy sessions in Nairobi',
    'Unusual service frequency detected for participant Kamau Kariuki - 5 sessions in 2 days',
  ];

  return (
    <PageLayout title="Provider Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Provider Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {userProfile?.name || 'Provider'}! Here's your business overview
          </p>
        </div>

        {/* Anomaly Warning */}
        <div className="mb-8">
          <AnomalyWarningBanner anomalies={mockAnomalies} />
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.monthlyRevenue}
            </div>
            <div className="text-sm text-muted-foreground">Monthly Revenue</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.upcomingBookings}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Bookings</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.activeClients}
            </div>
            <div className="text-sm text-muted-foreground">Active Clients</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.growthRate}
            </div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Upcoming Bookings</h2>
          <div className="bg-card rounded-2xl shadow-layer-2 border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {upcomingBookings.map((booking, index) => (
                <div key={index} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{booking.client}</h3>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{booking.time}</p>
                      <p className="text-sm text-muted-foreground">{booking.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Analytics */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <AIRevenueAnalytics />
          <AIBookingOptimization />
        </div>

        <div className="mb-8">
          <AIClientNeedsPrediction />
        </div>
      </div>
    </PageLayout>
  );
}
