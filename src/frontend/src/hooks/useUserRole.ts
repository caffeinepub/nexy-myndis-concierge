import { useGetCallerUserRole } from './useQueries';
import type { UserRole } from '../backend';

export function useUserRole() {
  const { data: role, isLoading, isFetched } = useGetCallerUserRole();

  const isParticipant = () => role === 'user';
  const isGuardian = () => role === 'user';
  const isProvider = () => role === 'user';
  const isPlanManager = () => role === 'admin';
  const isAdmin = () => role === 'admin';

  return {
    role: role || 'guest',
    isLoading,
    isFetched,
    isParticipant,
    isGuardian,
    isProvider,
    isPlanManager,
    isAdmin,
  };
}
