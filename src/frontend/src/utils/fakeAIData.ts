// Fake AI data generators for all AI components

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
}

export function generateAIInsights(): AIInsight[] {
  return [
    {
      type: 'opportunity',
      title: 'Budget Optimization Opportunity',
      description: 'Switch to bulk therapy sessions to save 15% on Core Supports. You have $2,400 remaining that could be better allocated.',
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
      name: 'Sarah Thompson',
      specialty: 'Occupational Therapy',
      matchScore: 95,
      reason: 'Matches your mobility goals and has excellent availability',
      availability: 'Next available: Tomorrow 2:00 PM',
    },
    {
      name: 'Melbourne Physio Care',
      specialty: 'Physiotherapy',
      matchScore: 88,
      reason: 'Experienced with similar cases and accepts new clients',
      availability: 'Next available: Friday 10:00 AM',
    },
    {
      name: 'Community Connect Services',
      specialty: 'Social Participation',
      matchScore: 85,
      reason: 'High ratings for community engagement programs',
      availability: 'Next available: Next Monday',
    },
  ];
}

export function generateRiskAssessments(): RiskAssessment[] {
  return [
    {
      participant: 'Managed Participant',
      riskLevel: 'low',
      factors: ['Budget on track', 'Regular service utilization', 'Goals progressing well'],
      recommendation: 'Continue current plan - no action needed',
    },
  ];
}

export function generateBudgetPredictions() {
  return {
    depletionDate: 'Expected to deplete in 4.2 months',
    status: 'on-track',
    utilizationRate: 65,
    recommendations: [
      'Maintain current spending pace for optimal budget utilization',
      'Consider reallocating $500 from unused transport budget',
      'Book additional services in underutilized categories',
    ],
  };
}

export function generatePriorityParticipants(): PriorityParticipant[] {
  return [
    {
      name: 'Managed Participant',
      urgency: 'low',
      reason: 'All metrics within normal range',
      action: 'Review monthly progress',
    },
  ];
}

export function generateComplianceMetrics() {
  return {
    score: 98,
    auditsPassed: 24,
    auditsTotal: 25,
    recentChecks: [
      { name: 'NDIS pricing compliance', status: 'Passed', description: 'All pricing matches NDIS guidelines' },
      { name: 'Service agreement validation', status: 'Passed', description: 'All agreements properly documented' },
      { name: 'Invoice Documentation', status: 'Passed', description: 'All invoices properly documented' },
      { name: 'Budget Adherence', status: 'Passed', description: 'All transactions within limits' },
    ],
  };
}

export function generateInvoiceRecommendations() {
  return [
    {
      invoiceNumber: 'INV-2024-001',
      confidence: 92,
      action: 'Approve',
      reason: 'Pricing matches NDIS guidelines and provider has strong history',
    },
    {
      invoiceNumber: 'INV-2024-002',
      confidence: 88,
      action: 'Approve',
      reason: 'Service delivery confirmed and within budget allocation',
    },
  ];
}

export function generatePortfolioOptimization() {
  return {
    opportunities: [
      {
        title: 'Budget Reallocation',
        description: 'Move $1,200 from underutilized transport to therapy services',
        impact: 'High',
      },
      {
        title: 'Service Efficiency',
        description: 'Consolidate providers to reduce administrative overhead',
        impact: 'Medium',
      },
      {
        title: 'Provider Consolidation',
        description: 'Use single provider for OT and Physio to save 10%',
        impact: 'Medium',
      },
    ],
  };
}

export function generateBookingOptimization() {
  return {
    optimalSlots: [
      { day: 'Tuesday', time: '2:00-4:00 PM', increase: '+30%' },
      { day: 'Thursday', time: '10:00 AM-12:00 PM', increase: '+25%' },
    ],
    bundlingSuggestions: [
      'Offer combined physio + OT sessions - 68% of clients book both services',
      'Package group therapy sessions for better utilization',
    ],
    efficiencyTips: [
      'Reduce 15-min gaps between sessions to increase daily capacity by 2 clients',
      'Implement online booking to reduce no-shows by 40%',
    ],
  };
}

export function generateClientNeedsPrediction() {
  return {
    nextMonth: [
      { service: 'Occupational Therapy', trend: '+15%', demand: 'High' },
      { service: 'Speech Pathology', trend: 'Stable', demand: 'Medium' },
      { service: 'Physiotherapy', trend: '+8%', demand: 'Medium' },
    ],
    bookingEstimate: 45,
    recommendations: [
      'Increase OT availability by 2 slots per week',
      'Consider hiring additional speech pathologist',
    ],
  };
}

export function generateRevenueAnalytics() {
  return {
    predictedMonthly: 12400,
    growthTrend: '+22%',
    monthOverMonth: '+15%',
    insights: [
      'Peak booking periods: Tuesday-Thursday afternoons',
      'Occupational therapy services showing highest demand',
      'Group sessions driving 35% of revenue',
      'Client retention rate: 94% (excellent)',
    ],
  };
}

export function generateCompatibilityScore(): number {
  return Math.floor(Math.random() * 15) + 85; // 85-100
}

export function generateCompatibilityInsights() {
  return {
    serviceAlignment: 95,
    budgetFit: 88,
    availabilityMatch: 92,
    performanceHistory: 90,
    factors: [
      '95% match with participant goals',
      'Within allocated budget',
      'High availability match',
      'Excellent performance history',
    ],
  };
}

export function generateFilterSuggestions() {
  return [
    { filter: 'Specializes in mobility support', relevance: 'High' },
    { filter: 'Accepts new clients', relevance: 'High' },
    { filter: 'Weekend availability', relevance: 'Medium' },
    { filter: 'Bulk booking discounts', relevance: 'Medium' },
  ];
}

export function generateBookingEstimate() {
  return {
    duration: 60,
    cost: 193.99,
    budgetImpact: 'Low',
    remainingFunds: 2206.01,
    category: 'Core Supports',
  };
}

export function generateServiceSuggestions() {
  return [
    {
      service: 'Occupational Therapy',
      price: 193.99,
      budgetFit: 'Excellent',
      goalAlignment: 95,
      description: 'Mobility and daily living skills',
    },
    {
      service: 'Physiotherapy',
      price: 214.24,
      budgetFit: 'Good',
      goalAlignment: 88,
      description: 'Physical rehabilitation and strength',
    },
    {
      service: 'Speech Pathology',
      price: 193.99,
      budgetFit: 'Excellent',
      goalAlignment: 82,
      description: 'Communication skills development',
    },
  ];
}

export function generateTimeSlotRecommendations() {
  return [
    {
      time: 'Tuesday 10:00 AM',
      confidence: 95,
      reason: 'Matches your preferred morning schedule',
    },
    {
      time: 'Thursday 2:00 PM',
      confidence: 88,
      reason: 'Provider has high availability',
    },
    {
      time: 'Friday 9:00 AM',
      confidence: 85,
      reason: 'Optimal for weekly therapy routine',
    },
  ];
}
