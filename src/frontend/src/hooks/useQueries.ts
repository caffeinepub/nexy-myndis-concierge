import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  Participant, 
  ServiceProvider, 
  NDISPlan, 
  Booking, 
  Invoice, 
  EvidenceDocument,
  Guardian,
  PlanManager,
  UserRole,
  UserProfile,
  BudgetValidationResult,
  BudgetThresholdAlert,
  AIAgentMetrics
} from '../backend';
import { ExternalBlob } from '../backend';
import type { Principal } from '@icp-sdk/core/principal';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile(): UseMutationResult<void, Error, UserProfile, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserProfile>({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Role Management
export function useGetCallerUserRole(): UseQueryResult<UserRole, Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole, Error>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useAssignCallerUserRole(): UseMutationResult<void, Error, { user: Principal; role: UserRole }, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { user: Principal; role: UserRole }>({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserRole'] });
    },
  });
}

// Participant Registration
export function useRegisterParticipant(): UseMutationResult<void, Error, Participant, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Participant>({
    mutationFn: async (participant: Participant) => {
      if (!actor) throw new Error('Actor not available');
      await actor.registerParticipant(participant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participant'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Provider Registration
export function useRegisterServiceProvider(): UseMutationResult<void, Error, ServiceProvider, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, ServiceProvider>({
    mutationFn: async (provider: ServiceProvider) => {
      if (!actor) throw new Error('Actor not available');
      await actor.registerServiceProvider(provider);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProviders'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Plan Manager Registration
export function useRegisterPlanManager(): UseMutationResult<void, Error, PlanManager, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, PlanManager>({
    mutationFn: async (planManager: PlanManager) => {
      if (!actor) throw new Error('Actor not available');
      await actor.registerPlanManager(planManager);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Guardian Registration
export function useRegisterGuardian(): UseMutationResult<void, Error, Guardian, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Guardian>({
    mutationFn: async (guardian: Guardian) => {
      if (!actor) throw new Error('Actor not available');
      await actor.registerGuardian(guardian);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Plan Queries
export function useGetParticipantPlans(): UseQueryResult<NDISPlan[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<NDISPlan[], Error>({
    queryKey: ['participantPlans'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getParticipantPlans(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUploadPlan(): UseMutationResult<void, Error, ExternalBlob, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, ExternalBlob>({
    mutationFn: async (document: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      await actor.uploadPlan(document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantPlans'] });
    },
  });
}

// Provider Queries
export function useGetAllProviders(): UseQueryResult<ServiceProvider[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ServiceProvider[], Error>({
    queryKey: ['allProviders'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllProviders();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProvider(): UseMutationResult<ServiceProvider, Error, Principal, unknown> {
  const { actor } = useActor();

  return useMutation<ServiceProvider, Error, Principal>({
    mutationFn: async (provider: Principal) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProvider(provider);
    },
  });
}

// Booking Queries
export function useCreateBooking(): UseMutationResult<void, Error, Booking, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Booking>({
    mutationFn: async (booking: Booking) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createBooking(booking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantBookings'] });
      queryClient.invalidateQueries({ queryKey: ['providerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['budgetThresholdAlerts'] });
    },
  });
}

export function useGetParticipantBookings(): UseQueryResult<Booking[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Booking[], Error>({
    queryKey: ['participantBookings'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getParticipantBookings(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProviderBookings(): UseQueryResult<Booking[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Booking[], Error>({
    queryKey: ['providerBookings'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getProviderBookings(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

// Invoice Queries
export function useCreateInvoice(): UseMutationResult<void, Error, Invoice, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Invoice>({
    mutationFn: async (invoice: Invoice) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createInvoice(invoice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantInvoices'] });
      queryClient.invalidateQueries({ queryKey: ['providerInvoices'] });
    },
  });
}

export function useGetParticipantInvoices(): UseQueryResult<Invoice[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Invoice[], Error>({
    queryKey: ['participantInvoices'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getParticipantInvoices(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProviderInvoices(): UseQueryResult<Invoice[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Invoice[], Error>({
    queryKey: ['providerInvoices'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getProviderInvoices(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useApproveInvoice(): UseMutationResult<void, Error, { participant: Principal; invoiceNumber: string }, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { participant: Principal; invoiceNumber: string }>({
    mutationFn: async ({ participant, invoiceNumber }: { participant: Principal; invoiceNumber: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.approveInvoice(participant, invoiceNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantInvoices'] });
      queryClient.invalidateQueries({ queryKey: ['participantPlans'] });
      queryClient.invalidateQueries({ queryKey: ['budgetThresholdAlerts'] });
    },
  });
}

// Guardian Queries
export function useGetGuardian(): UseQueryResult<Guardian, Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Guardian, Error>({
    queryKey: ['guardian'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const principal = (actor as any)._principal;
      return actor.getGuardian(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

// Evidence Queries
export function useUploadEvidence(): UseMutationResult<void, Error, EvidenceDocument, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, EvidenceDocument>({
    mutationFn: async (doc: EvidenceDocument) => {
      if (!actor) throw new Error('Actor not available');
      await actor.uploadEvidence(doc);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantEvidence'] });
    },
  });
}

export function useGetParticipantEvidence(): UseQueryResult<EvidenceDocument[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EvidenceDocument[], Error>({
    queryKey: ['participantEvidence'],
    queryFn: async () => {
      if (!actor) return [];
      const principal = (actor as any)._principal;
      return actor.getParticipantEvidence(principal);
    },
    enabled: !!actor && !actorFetching,
  });
}

// AI Budget Validation Queries
export function useValidateBudgetTransaction(): UseMutationResult<BudgetValidationResult, Error, { participant: Principal; category: string; amount: bigint }, unknown> {
  const { actor } = useActor();

  return useMutation<BudgetValidationResult, Error, { participant: Principal; category: string; amount: bigint }>({
    mutationFn: async ({ participant, category, amount }: { participant: Principal; category: string; amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.validateBudgetTransaction(participant, category, amount);
    },
  });
}

export function useGetBudgetThresholdAlerts(participant: Principal): UseQueryResult<BudgetThresholdAlert[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BudgetThresholdAlert[], Error>({
    queryKey: ['budgetThresholdAlerts', participant.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBudgetThresholdAlerts(participant);
    },
    enabled: !!actor && !actorFetching && !!participant,
  });
}

export function useDetectAnomalies(participant: Principal): UseQueryResult<string[], Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string[], Error>({
    queryKey: ['anomalies', participant.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.detectAnomalies(participant);
    },
    enabled: !!actor && !actorFetching && !!participant,
  });
}

// AI Agent Administration (Admin only)
export function useGetAIAgentMetrics(): UseQueryResult<AIAgentMetrics, Error> {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AIAgentMetrics, Error>({
    queryKey: ['aiAgentMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAIAgentMetrics();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateAIValidationThresholds(): UseMutationResult<void, Error, Array<[string, number]>, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Array<[string, number]>>({
    mutationFn: async (thresholds: Array<[string, number]>) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateAIValidationThresholds(thresholds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiAgentMetrics'] });
    },
  });
}

export function useRecordValidationFeedback(): UseMutationResult<void, Error, { participant: Principal; transactionId: string; approved: boolean; reason: string }, unknown> {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { participant: Principal; transactionId: string; approved: boolean; reason: string }>({
    mutationFn: async ({ participant, transactionId, approved, reason }: { participant: Principal; transactionId: string; approved: boolean; reason: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.recordValidationFeedback(participant, transactionId, approved, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiAgentMetrics'] });
    },
  });
}
