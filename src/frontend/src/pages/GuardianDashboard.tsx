import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AIBudgetPredictions from '../components/guardian/AIBudgetPredictions';
import AIPriorityParticipants from '../components/guardian/AIPriorityParticipants';
import AIRiskAssessmentCard from '../components/guardian/AIRiskAssessmentCard';
import LoadingState from '../components/common/LoadingState';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function GuardianDashboard() {
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

  // Mock data for managed participants
  const managedParticipants = [
    { name: 'Kamau Kariuki', status: 'active', budgetUsed: 68, location: 'Nairobi' },
    { name: 'Njoki Wambui', status: 'active', budgetUsed: 45, location: 'Mombasa' },
    { name: 'Kipchoge Mutai', status: 'active', budgetUsed: 82, location: 'Kisumu' },
  ];

  return (
    <PageLayout title="Guardian Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Guardian Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {userProfile?.name || 'Guardian'}! Manage and monitor your participants
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {managedParticipants.length}
            </div>
            <div className="text-sm text-muted-foreground">Managed Participants</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">65%</div>
            <div className="text-sm text-muted-foreground">Avg Budget Used</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">1</div>
            <div className="text-sm text-muted-foreground">Priority Alert</div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Completed Goals</div>
          </div>
        </div>

        {/* Managed Participants */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Managed Participants</h2>
          <div className="grid gap-4">
            {managedParticipants.map((participant, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-layer-2 border border-border hover:shadow-layer-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {participant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{participant.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {participant.budgetUsed}%
                    </div>
                    <div className="text-sm text-muted-foreground">Budget Used</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        participant.budgetUsed > 80
                          ? 'bg-destructive'
                          : participant.budgetUsed > 60
                          ? 'bg-warning'
                          : 'bg-success'
                      }`}
                      style={{ width: `${participant.budgetUsed}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Components */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <AIBudgetPredictions />
          <AIPriorityParticipants />
        </div>

        <div className="mb-8">
          <AIRiskAssessmentCard />
        </div>
      </div>
    </PageLayout>
  );
}
