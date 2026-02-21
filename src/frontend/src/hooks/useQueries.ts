import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserRole, UserProfile } from '../backend';
import type { Principal } from '@icp-sdk/core/principal';
import type { NDISPlan, Booking, BudgetThresholdAlert, Guardian } from '../types/mock-types';

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
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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

// Mock hooks for features not yet implemented in backend
// These return empty data or mock implementations

export function useRegisterParticipant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (participant: any) => {
      // Mock implementation
      console.log('Mock: registerParticipant', participant);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participant'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterServiceProvider() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (provider: any) => {
      // Mock implementation
      console.log('Mock: registerServiceProvider', provider);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProviders'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterPlanManager() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (planManager: any) => {
      // Mock implementation
      console.log('Mock: registerPlanManager', planManager);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterGuardian() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (guardian: any) => {
      // Mock implementation
      console.log('Mock: registerGuardian', guardian);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetParticipantPlans(): UseQueryResult<NDISPlan[], Error> {
  return useQuery<NDISPlan[], Error>({
    queryKey: ['participantPlans'],
    queryFn: async () => {
      // Mock implementation - return empty array with proper type
      return [] as NDISPlan[];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useUploadPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (document: any) => {
      // Mock implementation
      console.log('Mock: uploadPlan', document);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantPlans'] });
    },
  });
}

export function useGetAllProviders() {
  return useQuery({
    queryKey: ['allProviders'],
    queryFn: async () => {
      // Mock implementation - return empty array
      return [];
    },
    retry: 2,
    staleTime: 30 * 1000,
  });
}

export function useGetProvider() {
  return useMutation({
    mutationFn: async (provider: Principal) => {
      // Mock implementation
      console.log('Mock: getProvider', provider);
      return Promise.resolve({} as any);
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (booking: any) => {
      // Mock implementation
      console.log('Mock: createBooking', booking);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantBookings'] });
      queryClient.invalidateQueries({ queryKey: ['providerBookings'] });
    },
  });
}

export function useGetParticipantBookings(): UseQueryResult<Booking[], Error> {
  return useQuery<Booking[], Error>({
    queryKey: ['participantBookings'],
    queryFn: async () => {
      // Mock implementation - return empty array with proper type
      return [] as Booking[];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useGetProviderBookings(): UseQueryResult<Booking[], Error> {
  return useQuery<Booking[], Error>({
    queryKey: ['providerBookings'],
    queryFn: async () => {
      // Mock implementation - return empty array with proper type
      return [] as Booking[];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (invoice: any) => {
      // Mock implementation
      console.log('Mock: createInvoice', invoice);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantInvoices'] });
      queryClient.invalidateQueries({ queryKey: ['providerInvoices'] });
    },
  });
}

export function useGetParticipantInvoices() {
  return useQuery({
    queryKey: ['participantInvoices'],
    queryFn: async () => {
      // Mock implementation - return empty array
      return [];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useGetProviderInvoices() {
  return useQuery({
    queryKey: ['providerInvoices'],
    queryFn: async () => {
      // Mock implementation - return empty array
      return [];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useApproveInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ participant, invoiceNumber }: { participant: Principal; invoiceNumber: string }) => {
      // Mock implementation
      console.log('Mock: approveInvoice', participant, invoiceNumber);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantInvoices'] });
      queryClient.invalidateQueries({ queryKey: ['providerInvoices'] });
    },
  });
}

export function useGetGuardian(): UseQueryResult<Guardian | null, Error> {
  return useQuery<Guardian | null, Error>({
    queryKey: ['guardian'],
    queryFn: async () => {
      // Mock implementation - return null with proper type
      return null as Guardian | null;
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useUploadEvidence() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (doc: any) => {
      // Mock implementation
      console.log('Mock: uploadEvidence', doc);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantEvidence'] });
    },
  });
}

export function useGetParticipantEvidence() {
  return useQuery({
    queryKey: ['participantEvidence'],
    queryFn: async () => {
      // Mock implementation - return empty array
      return [];
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useValidateBudgetTransaction() {
  return useMutation({
    mutationFn: async ({ participant, category, amount }: { participant: Principal; category: string; amount: bigint }) => {
      // Mock implementation - return mock validation result
      console.log('Mock: validateBudgetTransaction', participant, category, amount);
      return {
        valid: true,
        reasons: [],
        warnings: [],
        recommendedAdjustments: [],
      };
    },
  });
}

export function useGetBudgetThresholdAlerts(participant?: Principal): UseQueryResult<BudgetThresholdAlert[], Error> {
  return useQuery<BudgetThresholdAlert[], Error>({
    queryKey: ['budgetThresholdAlerts', participant?.toString()],
    queryFn: async () => {
      // Mock implementation - return empty array with proper type
      return [] as BudgetThresholdAlert[];
    },
    enabled: !!participant,
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useDetectAnomalies(participant?: Principal) {
  return useQuery({
    queryKey: ['anomalies', participant?.toString()],
    queryFn: async () => {
      // Mock implementation - return empty array
      return [];
    },
    enabled: !!participant,
    retry: 2,
    staleTime: 1 * 60 * 1000,
  });
}

export function useGetAIAgentMetrics() {
  return useQuery({
    queryKey: ['aiAgentMetrics'],
    queryFn: async () => {
      // Mock implementation - return mock metrics
      return {
        validationAccuracy: 0.96,
        falsePositiveRate: 0.03,
        falseNegativeRate: 0.01,
        averageProcessingTime: BigInt(1500000000),
        confidenceScores: [0.95, 0.92, 0.98, 0.94],
      };
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateAIValidationThresholds() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (thresholds: any) => {
      // Mock implementation
      console.log('Mock: updateAIValidationThresholds', thresholds);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiAgentMetrics'] });
    },
  });
}

export function useRecordValidationFeedback() {
  return useMutation({
    mutationFn: async ({ participant, transactionId, approved, reason }: { participant: Principal; transactionId: string; approved: boolean; reason?: string }) => {
      // Mock implementation
      console.log('Mock: recordValidationFeedback', participant, transactionId, approved, reason);
      return Promise.resolve();
    },
  });
}
