import { useGetParticipantInvoices } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import LoadingState from '../components/common/LoadingState';
import { Users, DollarSign, FileCheck, AlertCircle } from 'lucide-react';

export default function PlanManagerDashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: invoices = [], isLoading } = useGetParticipantInvoices();

  // Redirect to get-started if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/get-started' });
    }
  }, [identity, navigate]);

  // Count invoices by status
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
  const flaggedInvoices = 0; // Will be populated when AI validation is integrated

  if (isLoading) {
    return (
      <PageLayout title="Plan Manager Dashboard">
        <LoadingState message="Loading your dashboard..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Plan Manager Dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0d7377] to-[#1a1a2e] rounded-3xl p-12 text-white mb-12">
        <h1 className="text-4xl font-bold mb-4">Plan Manager Dashboard</h1>
        <p className="text-lg opacity-90">
          Oversee participant plans, budgets, and compliance
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
            <DollarSign className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">$0</div>
          <div className="text-sm text-[#616161] font-medium">Total Budgets</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#e0f2f1] rounded-xl flex items-center justify-center mb-5">
            <FileCheck className="w-7 h-7 text-[#0d7377]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">100%</div>
          <div className="text-sm text-[#616161] font-medium">Compliance Rate</div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <div className="w-14 h-14 bg-[#fff3e0] rounded-xl flex items-center justify-center mb-5">
            <AlertCircle className="w-7 h-7 text-[#ff9800]" />
          </div>
          <div className="text-3xl font-bold text-[#1a1a2e] mb-2">{pendingInvoices}</div>
          <div className="text-sm text-[#616161] font-medium">Pending Approvals</div>
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

        <div className="bg-white rounded-2xl p-8 shadow-md border border-[#eeeeee]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[#0d7377]" />
            Pending Invoices
          </h2>
          <p className="text-[#616161]">
            {pendingInvoices > 0 
              ? `${pendingInvoices} invoice${pendingInvoices > 1 ? 's' : ''} awaiting approval` 
              : 'No pending invoices'}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
