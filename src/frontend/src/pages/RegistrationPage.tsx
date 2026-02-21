import { useNavigate, useParams } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useRegisterParticipant, useRegisterServiceProvider, useRegisterPlanManager, useRegisterGuardian, useSaveCallerUserProfile } from '../hooks/useQueries';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Principal } from '@icp-sdk/core/principal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function RegistrationPage() {
  const { role } = useParams({ from: '/register/$role' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  
  const registerParticipant = useRegisterParticipant();
  const registerProvider = useRegisterServiceProvider();
  const registerPlanManager = useRegisterPlanManager();
  const registerGuardian = useRegisterGuardian();
  const saveProfile = useSaveCallerUserProfile();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    primaryContact: '',
    ndisNumber: '',
    address: '',
    abn: '',
    services: '',
  });

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  const totalSteps = role === 'participant' ? 3 : 2;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) return;

    setIsSubmitting(true);

    try {
      // Save user profile first
      await saveProfile.mutateAsync({
        name: formData.name,
        email: formData.email,
        role: role,
      });

      // Register based on role
      if (role === 'participant') {
        await registerParticipant.mutateAsync({
          name: formData.name,
          age: BigInt(formData.age || 0),
          primaryContact: formData.primaryContact,
          ndisNumber: formData.ndisNumber,
          address: formData.address,
          planManager: Principal.anonymous(),
        });
      } else if (role === 'provider') {
        await registerProvider.mutateAsync({
          principal: identity.getPrincipal(),
          name: formData.name,
          abn: formData.abn,
          ndisVerified: false,
          serviceTypes: formData.services.split(',').map(s => s.trim()),
          summary: 'Experienced NDIS service provider',
          availability: [],
          priceList: [],
          rating: undefined,
        });
      } else if (role === 'planManager') {
        await registerPlanManager.mutateAsync({
          provider: Principal.anonymous(),
        });
      } else if (role === 'guardian') {
        await registerGuardian.mutateAsync({
          participant: Principal.anonymous(),
        });
      }

      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      await queryClient.invalidateQueries({ queryKey: ['currentUserRole'] });
      await queryClient.invalidateQueries({ queryKey: ['participant'] });

      toast.success('Registration completed successfully!');
      
      // Navigate to appropriate dashboard
      const dashboardRoutes: Record<string, string> = {
        participant: '/dashboard',
        provider: '/provider-dashboard',
        guardian: '/guardian-dashboard',
        planManager: '/plan-manager-dashboard',
      };
      
      navigate({ to: dashboardRoutes[role] || '/dashboard' });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleTitle = () => {
    const titles: Record<string, string> = {
      participant: 'Participant',
      guardian: 'Guardian / Carer',
      provider: 'Service Provider',
      planManager: 'Plan Manager',
    };
    return titles[role] || 'User';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-3xl shadow-layer-2 overflow-hidden border border-border">
          {/* Progress bar */}
          <div className="h-1.5 bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Register as {getRoleTitle()}
              </h1>
              <p className="text-muted-foreground">
                Step {step} of {totalSteps} - Let's set up your profile
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {role === 'participant' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                          placeholder="Enter your age"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Primary Contact *
                        </label>
                        <input
                          type="tel"
                          name="primaryContact"
                          value={formData.primaryContact}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                          placeholder="Phone number"
                        />
                      </div>
                    </>
                  )}

                  {role === 'provider' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          ABN *
                        </label>
                        <input
                          type="text"
                          name="abn"
                          value={formData.abn}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                          placeholder="Australian Business Number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Services (comma-separated) *
                        </label>
                        <input
                          type="text"
                          name="services"
                          value={formData.services}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                          placeholder="e.g., Physiotherapy, Occupational Therapy"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {step === 2 && role === 'participant' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      NDIS Number *
                    </label>
                    <input
                      type="text"
                      name="ndisNumber"
                      value={formData.ndisNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background"
                      placeholder="Your NDIS participant number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-5 py-4 border-2 border-input rounded-xl text-base transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 bg-background resize-none"
                      placeholder="Your residential address"
                    />
                  </div>
                </div>
              )}

              {((step === 2 && role !== 'participant') || (step === 3 && role === 'participant')) && (
                <div className="space-y-6">
                  <div className="p-6 bg-muted rounded-xl">
                    <h3 className="font-semibold text-foreground mb-3">Review Your Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium text-foreground">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium text-foreground">{formData.email}</span>
                      </div>
                      {role === 'participant' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Age:</span>
                            <span className="font-medium text-foreground">{formData.age}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">NDIS Number:</span>
                            <span className="font-medium text-foreground">{formData.ndisNumber}</span>
                          </div>
                        </>
                      )}
                      {role === 'provider' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ABN:</span>
                            <span className="font-medium text-foreground">{formData.abn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Services:</span>
                            <span className="font-medium text-foreground">{formData.services}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 border-2 border-border rounded-xl font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Back
                  </button>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-success text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-success text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
