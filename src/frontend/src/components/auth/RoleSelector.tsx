import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAssignCallerUserRole } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { UserRole } from '../../backend';

const roles = [
  {
    value: 'user' as UserRole,
    label: 'NDIS Participant',
    description: 'I am an NDIS participant managing my own plan',
  },
  {
    value: 'user' as UserRole,
    label: 'Guardian/Carer',
    description: 'I support and manage plans for NDIS participants',
  },
  {
    value: 'user' as UserRole,
    label: 'Service Provider',
    description: 'I provide services to NDIS participants',
  },
  {
    value: 'admin' as UserRole,
    label: 'Plan Manager',
    description: 'I manage budgets and compliance for multiple participants',
  },
];

export default function RoleSelector() {
  const { identity } = useInternetIdentity();
  const assignRole = useAssignCallerUserRole();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleSubmit = async () => {
    if (!selectedRole || !identity) return;
    
    try {
      await assignRole.mutateAsync({
        user: identity.getPrincipal(),
        role: selectedRole,
      });
    } catch (error) {
      console.error('Failed to assign role:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.95_0.01_180)] to-[oklch(0.98_0.005_200)] px-4 py-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[oklch(0.35_0.08_195)] mb-2">
            Welcome to NEXY MYNDIS
          </h1>
          <p className="text-[oklch(0.45_0.02_195)]">
            Please select your role to get started
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {roles.map((role) => (
            <Card
              key={role.label}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRole === role.value
                  ? 'ring-2 ring-[oklch(0.45_0.15_195)] bg-[oklch(0.97_0.01_195)]'
                  : ''
              }`}
              onClick={() => setSelectedRole(role.value)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{role.label}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedRole || assignRole.isPending}
            size="lg"
            className="min-w-[200px] rounded-full"
          >
            {assignRole.isPending ? 'Setting up...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
