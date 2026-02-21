import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AIComplianceMonitor from '../components/planmanager/AIComplianceMonitor';
import AIInvoiceRecommendations from '../components/planmanager/AIInvoiceRecommendations';
import AIPortfolioOptimization from '../components/planmanager/AIPortfolioOptimization';
import LoadingState from '../components/common/LoadingState';
import { Users, FileText, Shield, Brain } from 'lucide-react';

export default function PlanManagerDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();

  // Redirect to get-started if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/get-started' });
    }
  }, [identity, navigate]);

  const aiInsightsCount = 6;

  if (!identity) {
    return (
      <PageLayout title="Plan Manager Dashboard">
        <LoadingState message="Loading plan manager dashboard..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Plan Manager Dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0d7377] to-[#1a1a2e] rounded-3xl p-12 text-white mb-12">
        <h1 className="text-4xl font-bold mb-4">Plan Manager Dashboard</h1>
        <p className="text-lg opacity-90">
          Oversee participant portfolios, manage invoices, and ensure compliance with AI-powered tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Users className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">0</div>
          <div className="text-sm text-[#616161] font-medium">Managed Participants</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <FileText className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">0</div>
          <div className="text-sm text-[#616161] font-medium">Pending Invoices</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Shield className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">98%</div>
          <div className="text-sm text-[#616161] font-medium">Compliance Score</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <Brain className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{aiInsightsCount}</div>
          <div className="text-sm text-[#616161] font-medium">AI Insights</div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid gap-8 lg:grid-cols-3 mb-8">
        <AIComplianceMonitor />
        <AIInvoiceRecommendations />
        <AIPortfolioOptimization />
      </div>

      {/* Additional Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-[#0d7377]" />
            Participant Portfolio
          </h2>
          <p className="text-[#616161]">Manage your participant portfolio and track their progress</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#0d7377]" />
            Invoice Management
          </h2>
          <p className="text-[#616161]">Review and process invoices with AI assistance</p>
        </div>
      </div>
    </PageLayout>
  );
}
