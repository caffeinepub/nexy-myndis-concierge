import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { User, Users, Briefcase, FileText, Check } from 'lucide-react';
import { useEffect } from 'react';

const roles = [
  {
    id: 'participant',
    title: 'Participant',
    description: 'I am an NDIS participant managing my own plan',
    icon: User,
    features: [
      'Upload and manage your NDIS plan',
      'Find and book service providers',
      'Track your budget and spending',
      'Monitor your goals and progress',
    ],
  },
  {
    id: 'guardian',
    title: 'Guardian / Carer',
    description: 'I support an NDIS participant',
    icon: Users,
    features: [
      'Manage plans for your loved ones',
      'Coordinate services and bookings',
      'Track multiple participant budgets',
      'Communicate with providers',
    ],
  },
  {
    id: 'provider',
    title: 'Service Provider',
    description: 'I provide NDIS services',
    icon: Briefcase,
    features: [
      'Manage your service offerings',
      'Accept and confirm bookings',
      'Submit invoices and evidence',
      'Build your provider profile',
    ],
  },
  {
    id: 'planManager',
    title: 'Plan Manager',
    description: 'I manage NDIS plans professionally',
    icon: FileText,
    features: [
      'Oversee multiple participant plans',
      'Approve invoices and payments',
      'Monitor budget compliance',
      'Generate reports and insights',
    ],
  },
];

export default function GetStartedPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  const handleRoleSelect = (roleId: string) => {
    navigate({ to: '/register/$role', params: { role: roleId } });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Welcome! Let's Get Started
          </h1>
          <p className="text-xl text-[#616161] max-w-2xl mx-auto">
            Choose your role to personalize your experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 border-3 border-transparent hover:border-[#0d7377] hover:-translate-y-2 shadow-lg hover:shadow-2xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#0d7377] to-[#095456] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3 text-center">
                  {role.title}
                </h2>

                <p className="text-[#616161] mb-6 text-center leading-relaxed">
                  {role.description}
                </p>

                <ul className="space-y-3">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#757575] text-sm">
                      <Check className="w-5 h-5 text-[#00b894] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
