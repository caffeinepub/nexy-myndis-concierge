import { useInternetIdentity } from './hooks/useInternetIdentity';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import GetStartedPage from './pages/GetStartedPage';
import RegistrationPage from './pages/RegistrationPage';
import ParticipantDashboard from './pages/ParticipantDashboard';
import GuardianDashboard from './pages/GuardianDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import PlanManagerDashboard from './pages/PlanManagerDashboard';
import PlanUploadPage from './pages/PlanUploadPage';
import ProvidersPage from './pages/ProvidersPage';
import BookingPage from './pages/BookingPage';
import InvoiceCreatePage from './pages/InvoiceCreatePage';
import AdminAIAgentDashboard from './pages/AdminAIAgentDashboard';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import LoadingState from './components/common/LoadingState';
import PageTransition from './components/common/PageTransition';
import { useEffect, useState } from 'react';
import { useGetCallerUserProfile } from './hooks/useQueries';

function RootLayout() {
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
}

function DashboardRouter() {
  const { data: userProfile } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();
  
  if (!userProfile || !identity) {
    return <ParticipantDashboard />;
  }

  const role = userProfile.role.toLowerCase();
  
  if (role === 'participant') return <ParticipantDashboard />;
  if (role === 'guardian') return <GuardianDashboard />;
  if (role === 'provider') return <ProviderDashboard />;
  if (role === 'planmanager') return <PlanManagerDashboard />;
  
  return <ParticipantDashboard />;
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const getStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/get-started',
  component: GetStartedPage,
});

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register/$role',
  component: RegistrationPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardRouter,
});

const planUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plan/upload',
  component: PlanUploadPage,
});

const providersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/providers',
  component: ProvidersPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking/$providerId',
  component: BookingPage,
});

const invoiceCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invoices/create',
  component: InvoiceCreatePage,
});

const adminAIAgentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/ai-agents',
  component: AdminAIAgentDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  getStartedRoute,
  registrationRoute,
  dashboardRoute,
  planUploadRoute,
  providersRoute,
  bookingRoute,
  invoiceCreateRoute,
  adminAIAgentRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      // Check if user should see onboarding
      if (userProfile.role === 'participant') {
        const hasSeenOnboarding = localStorage.getItem('onboarding_completed');
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        }
      }
    }
  }, [isAuthenticated, userProfile]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (isInitializing) {
    return <LoadingState message="Initializing..." />;
  }

  return (
    <>
      <RouterProvider router={router} />
      {isAuthenticated && showOnboarding && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-background">
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </div>
      )}
    </>
  );
}
