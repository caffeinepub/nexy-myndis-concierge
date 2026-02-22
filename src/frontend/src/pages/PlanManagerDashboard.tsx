import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AIComplianceMonitor from '../components/planmanager/AIComplianceMonitor';
import AIInvoiceRecommendations from '../components/planmanager/AIInvoiceRecommendations';
import AIPortfolioOptimization from '../components/planmanager/AIPortfolioOptimization';
import LoadingState from '../components/common/LoadingState';
import { Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PlanManagerDashboard() {
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

  // Mock data for plan manager stats
  const stats = {
    managedPortfolios: 15,
    pendingInvoices: 8,
    complianceScore: 94,
    activeParticipants: 42,
  };

  // Mock portfolio data
  const portfolios = [
    { name: 'Kamau Kariuki', budget: 'KES 850,000', used: 68, status: 'On Track', location: 'Nairobi' },
    { name: 'Njoki Wambui', budget: 'KES 620,000', used: 45, status: 'On Track', location: 'Mombasa' },
    { name: 'Achieng Omondi', budget: 'KES 480,000', used: 92, status: 'Attention Needed', location: 'Kisumu' },
  ];

  return (
    <PageLayout title="Plan Manager Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Plan Manager Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {userProfile?.name || 'Plan Manager'}! Manage your portfolio efficiently
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.managedPortfolios}
            </div>
            <div className="text-sm text-muted-foreground">Managed Portfolios</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-warning" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.pendingInvoices}
            </div>
            <div className="text-sm text-muted-foreground">Pending Invoices</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.complianceScore}%
            </div>
            <div className="text-sm text-muted-foreground">Compliance Score</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats.activeParticipants}
            </div>
            <div className="text-sm text-muted-foreground">Active Participants</div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Portfolio Overview</h2>
          <div className="grid gap-4">
            {portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border hover:shadow-layer-3 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {portfolio.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{portfolio.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground mb-1">
                      {portfolio.budget}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        portfolio.status === 'On Track' ? 'text-success' : 'text-warning'
                      }`}
                    >
                      {portfolio.status}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span className="font-medium text-foreground">{portfolio.used}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        portfolio.used > 85
                          ? 'bg-destructive'
                          : portfolio.used > 70
                          ? 'bg-warning'
                          : 'bg-success'
                      }`}
                      style={{ width: `${portfolio.used}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Components */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <AIComplianceMonitor />
          <AIInvoiceRecommendations />
        </div>

        <div className="mb-8">
          <AIPortfolioOptimization />
        </div>
      </div>
    </PageLayout>
  );
}
