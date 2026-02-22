// Mock types for features not yet implemented in backend - Kenyan localized
import type { Principal } from '@icp-sdk/core/principal';

export interface NDISPlan {
  planNumber: string;
  participant: Principal;
  startDate: bigint;
  endDate: bigint;
  status: 'active' | 'expired' | 'pendingApproval';
  categories: Array<[string, BudgetCategory]>;
  goals: string[];
  document?: any;
}

export interface BudgetCategory {
  name: string;
  amount: bigint;
  spent: bigint;
}

export interface Booking {
  participant: Principal;
  provider: Principal;
  serviceType: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: bigint;
  location?: string;
}

export interface TimeSlot {
  start: bigint;
  end: bigint;
}

export interface BudgetValidationResult {
  valid: boolean;
  reasons: string[];
  warnings: string[];
  recommendedAdjustments: Array<[string, bigint]>;
  predictedDepletionDate?: bigint;
}

export interface AIAgentMetrics {
  validationAccuracy: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  averageProcessingTime: bigint;
  confidenceScores: number[];
}

export interface BudgetThresholdAlert {
  participant: Principal;
  category: string;
  threshold: number;
  utilized: number;
  timestamp: bigint;
}

export interface Guardian {
  participant: Principal;
}
