// Fake AI data generators for all AI components - Kenyan localized

export interface AIInsight {
  type: 'tip' | 'warning' | 'opportunity';
  title: string;
  description: string;
}

export interface MilestoneAlert {
  title: string;
  daysUntil: number;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

export interface ProviderRecommendation {
  name: string;
  specialty: string;
  matchScore: number;
  reason: string;
  availability: string;
  location: string;
  phone: string;
}

export interface RiskAssessment {
  participant: string;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
  recommendation: string;
}

export interface PriorityParticipant {
  name: string;
  urgency: 'high' | 'medium' | 'low';
  reason: string;
  action: string;
  location: string;
}

export function generateAIInsights(): AIInsight[] {
  return [
    {
      type: 'opportunity',
      title: 'Budget Optimization Opportunity',
      description: 'Switch to bulk therapy sessions to save 15% on Core Supports. You have KES 240,000 remaining that could be better allocated.',
    },
    {
      type: 'tip',
      title: 'Smart Spending Tip',
      description: 'Book appointments in advance for better rates. Your Capacity Building budget is 65% utilized - optimal pacing for your plan timeline.',
    },
    {
      type: 'warning',
      title: 'Upcoming Milestone',
      description: 'Plan review due in 14 days. Start gathering progress documentation and schedule your review meeting.',
    },
  ];
}

export function generateMilestoneAlerts(): MilestoneAlert[] {
  return [
    {
      title: 'Plan Review Meeting',
      daysUntil: 14,
      priority: 'high',
      action: 'Schedule plan review meeting',
    },
    {
      title: 'Core Supports Budget Check',
      daysUntil: 7,
      priority: 'medium',
      action: 'Submit progress report',
    },
    {
      title: 'Goal Progress Assessment',
      daysUntil: 21,
      priority: 'low',
      action: 'Update goal achievements',
    },
  ];
}

export function generateProviderRecommendations(): ProviderRecommendation[] {
  return [
    {
      name: 'Wanjiku Mwangi',
      specialty: 'Occupational Therapy',
      matchScore: 95,
      reason: 'Specializes in mobility support and has excellent reviews from participants with similar needs',
      availability: 'Available this week',
      location: 'Westlands, Nairobi',
      phone: '+254 722 345 678',
    },
    {
      name: 'Ochieng Otieno',
      specialty: 'Physiotherapy',
      matchScore: 88,
      reason: 'Experienced in post-injury rehabilitation and accepts your plan budget',
      availability: 'Next week',
      location: 'Kilimani, Nairobi',
      phone: '+254 733 456 789',
    },
    {
      name: 'Akinyi Njeri',
      specialty: 'Speech Therapy',
      matchScore: 82,
      reason: 'Highly rated for communication support services',
      availability: 'Available today',
      location: 'Nyali, Mombasa',
      phone: '+254 711 234 567',
    },
  ];
}

export function generateRiskAssessments(): RiskAssessment[] {
  return [
    {
      participant: 'Kamau Kariuki',
      riskLevel: 'high',
      factors: [
        'Budget depletion in 3 weeks',
        'Missed 2 therapy sessions',
        'No plan manager assigned',
      ],
      recommendation: 'Immediate intervention required. Schedule urgent review meeting and assign plan manager.',
    },
    {
      participant: 'Njoki Wambui',
      riskLevel: 'medium',
      factors: [
        'Spending 20% above average',
        'Plan review overdue by 5 days',
      ],
      recommendation: 'Monitor spending closely and schedule plan review within 48 hours.',
    },
    {
      participant: 'Kipchoge Mutai',
      riskLevel: 'low',
      factors: [
        'On track with budget',
        'Regular service utilization',
      ],
      recommendation: 'Continue current support level. Routine check-in next month.',
    },
  ];
}

export function generatePriorityParticipants(): PriorityParticipant[] {
  return [
    {
      name: 'Achieng Omondi',
      urgency: 'high',
      reason: 'Budget depleting faster than expected - only 2 weeks remaining',
      action: 'Schedule emergency budget review',
      location: 'Kibera, Nairobi',
    },
    {
      name: 'Muthoni Githinji',
      urgency: 'medium',
      reason: 'Plan review overdue by 1 week',
      action: 'Contact to schedule review meeting',
      location: 'Nakuru',
    },
    {
      name: 'Barasa Wekesa',
      urgency: 'low',
      reason: 'Upcoming plan expiry in 30 days',
      action: 'Begin renewal preparation',
      location: 'Eldoret',
    },
  ];
}

export function generateBudgetPredictions() {
  return {
    depletionDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE'),
    currentSpendingRate: 'KES 85,000/month',
    recommendations: [
      'Consider reducing therapy frequency from 3x to 2x per week to extend budget',
      'Switch to group sessions for social participation activities (save KES 15,000/month)',
      'Review high-cost services - some may be available at lower rates from other providers',
    ],
    trends: [
      { month: 'Jan', spent: 82000, projected: 85000 },
      { month: 'Feb', spent: 88000, projected: 85000 },
      { month: 'Mar', spent: 0, projected: 85000 },
    ],
  };
}

export function generateComplianceMetrics() {
  return {
    overallScore: 94,
    audits: [
      { area: 'Invoice Documentation', score: 98, status: 'excellent' },
      { area: 'Service Delivery Records', score: 92, status: 'good' },
      { area: 'Budget Tracking', score: 89, status: 'good' },
      { area: 'Participant Consent Forms', score: 96, status: 'excellent' },
    ],
    recentChecks: [
      {
        date: '2026-02-18',
        type: 'Invoice Audit',
        result: 'Passed',
        notes: 'All invoices properly documented',
      },
      {
        date: '2026-02-15',
        type: 'Service Records Review',
        result: 'Passed',
        notes: 'Minor formatting issues noted',
      },
    ],
  };
}

export function generateInvoiceRecommendations() {
  return [
    {
      participant: 'Njeri Kamau',
      amount: 'KES 45,000',
      confidence: 92,
      reason: 'All services delivered and documented. Ready for submission.',
      action: 'approve',
    },
    {
      participant: 'Otieno Odhiambo',
      amount: 'KES 28,500',
      confidence: 78,
      reason: 'Missing one service delivery note. Request documentation before approval.',
      action: 'request_info',
    },
    {
      participant: 'Wambui Ndung\'u',
      amount: 'KES 62,000',
      confidence: 95,
      reason: 'Complete documentation. Participant has sufficient budget remaining.',
      action: 'approve',
    },
  ];
}

export function generatePortfolioOptimization() {
  return {
    opportunities: [
      {
        type: 'Budget Reallocation',
        impact: 'High',
        description: 'Reallocate KES 120,000 from underutilized Core Supports to Capacity Building for 3 participants',
        potentialSavings: 'KES 35,000',
      },
      {
        type: 'Service Efficiency',
        impact: 'Medium',
        description: 'Consolidate therapy sessions for participants in Westlands area to reduce travel time',
        potentialSavings: 'KES 18,000',
      },
      {
        type: 'Provider Consolidation',
        impact: 'Medium',
        description: 'Switch 5 participants to preferred providers with better rates',
        potentialSavings: 'KES 22,000',
      },
    ],
  };
}

export function generateRevenueAnalytics() {
  return {
    monthlyForecast: [
      { month: 'Mar', projected: 420000, actual: 0 },
      { month: 'Apr', projected: 445000, actual: 0 },
      { month: 'May', projected: 438000, actual: 0 },
    ],
    currentMonth: {
      revenue: 'KES 385,000',
      growth: '+12%',
      topServices: [
        { name: 'Physiotherapy', revenue: 'KES 145,000' },
        { name: 'Occupational Therapy', revenue: 'KES 128,000' },
        { name: 'Speech Therapy', revenue: 'KES 112,000' },
      ],
    },
    insights: [
      'Revenue trending 12% above last month',
      'Physiotherapy bookings increased by 18%',
      'Consider expanding capacity for high-demand services',
    ],
  };
}

export function generateBookingOptimization() {
  return {
    optimalSlots: [
      { time: 'Tuesday 10:00 AM', bookingRate: 95, reason: 'Highest demand slot' },
      { time: 'Thursday 2:00 PM', bookingRate: 88, reason: 'Popular afternoon slot' },
      { time: 'Friday 9:00 AM', bookingRate: 82, reason: 'End of week preference' },
    ],
    suggestions: [
      'Offer group sessions on Wednesdays to increase utilization',
      'Bundle physiotherapy with occupational therapy for 10% discount',
      'Add evening slots (5-7 PM) - high demand from working participants',
    ],
  };
}

export function generateClientNeedsPrediction() {
  return {
    nextMonth: [
      {
        service: 'Physiotherapy',
        predictedBookings: 24,
        trend: 'up',
        confidence: 89,
        recommendation: 'Increase availability by 2 slots per week',
      },
      {
        service: 'Occupational Therapy',
        predictedBookings: 18,
        trend: 'stable',
        confidence: 85,
        recommendation: 'Maintain current capacity',
      },
      {
        service: 'Speech Therapy',
        predictedBookings: 15,
        trend: 'up',
        confidence: 78,
        recommendation: 'Consider hiring additional therapist',
      },
    ],
  };
}

export function generateBookingEstimate() {
  return {
    duration: '60 minutes',
    totalCost: 'KES 8,500',
    budgetImpact: {
      category: 'Core Supports',
      remaining: 'KES 145,000',
      afterBooking: 'KES 136,500',
      percentUsed: 42,
    },
  };
}

export function generateServiceSuggestions() {
  return [
    {
      service: 'Physiotherapy Session',
      price: 'KES 8,500',
      budgetFit: 95,
      goalAlignment: 88,
      description: 'Specialized mobility and strength training',
    },
    {
      service: 'Occupational Therapy',
      price: 'KES 7,800',
      budgetFit: 92,
      goalAlignment: 85,
      description: 'Daily living skills development',
    },
    {
      service: 'Group Exercise Class',
      price: 'KES 3,500',
      budgetFit: 98,
      goalAlignment: 75,
      description: 'Social participation and fitness',
    },
  ];
}

export function generateTimeSlotRecommendations() {
  return [
    {
      time: 'Tuesday, Feb 25 at 10:00 AM',
      confidence: 94,
      reason: 'Provider has excellent availability and this matches your preferred morning schedule',
    },
    {
      time: 'Thursday, Feb 27 at 2:00 PM',
      confidence: 87,
      reason: 'Alternative slot with good availability',
    },
    {
      time: 'Friday, Feb 28 at 9:30 AM',
      confidence: 82,
      reason: 'End of week slot, slightly lower demand',
    },
  ];
}

export function generateFilterSuggestions() {
  return [
    {
      filter: 'Providers in Westlands',
      relevance: 95,
      reason: 'Based on your location preference',
    },
    {
      filter: 'Physiotherapy specialists',
      relevance: 88,
      reason: 'Matches your current plan goals',
    },
    {
      filter: 'Available this week',
      relevance: 82,
      reason: 'You have upcoming budget milestones',
    },
  ];
}

export function generateCompatibilityInsights() {
  return {
    topFactors: [
      { factor: 'Service Alignment', score: 92, description: 'Offers services matching your plan' },
      { factor: 'Budget Fit', score: 88, description: 'Pricing within your budget range' },
      { factor: 'Availability Match', score: 85, description: 'Available during your preferred times' },
      { factor: 'Location', score: 78, description: 'Within 5km of your address' },
    ],
  };
}
