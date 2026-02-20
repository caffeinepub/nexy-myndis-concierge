import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Participant {
    ndisNumber: string;
    age: bigint;
    name: string;
    address: string;
    primaryContact: string;
    planManager: Principal;
}
export interface TimeSlot {
    end: bigint;
    start: bigint;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
}
export interface BudgetValidationResult {
    reasons: Array<string>;
    valid: boolean;
    warnings: Array<string>;
    recommendedAdjustments: Array<[string, bigint]>;
    predictedDepletionDate?: bigint;
}
export interface BudgetCategory {
    name: string;
    spent: bigint;
    amount: bigint;
}
export interface Invoice {
    status: InvoiceStatus;
    provider: Principal;
    participant: Principal;
    totalAmount: bigint;
    number: string;
    items: Array<InvoiceLineItem>;
}
export interface NDISPlan {
    categories: Array<[string, BudgetCategory]>;
    status: PlanStatus;
    endDate: bigint;
    participant: Principal;
    planNumber: string;
    goals: Array<string>;
    document?: ExternalBlob;
    startDate: bigint;
}
export interface AIAgentMetrics {
    falseNegativeRate: number;
    validationAccuracy: number;
    falsePositiveRate: number;
    averageProcessingTime: bigint;
    confidenceScores: Array<number>;
}
export interface EvidenceDocument {
    id: string;
    provider: Principal;
    file: ExternalBlob;
    participant: Principal;
    category: string;
}
export interface BudgetThresholdAlert {
    threshold: bigint;
    utilized: bigint;
    participant: Principal;
    timestamp: bigint;
    category: string;
}
export interface Guardian {
    participant: Principal;
}
export interface Booking {
    status: BookingStatus;
    serviceType: string;
    provider: Principal;
    participant: Principal;
    price: bigint;
    timeSlot: TimeSlot;
}
export interface PlanManager {
    provider: Principal;
}
export interface InvoiceLineItem {
    description: string;
    quantity: bigint;
    price: bigint;
}
export interface ServiceProvider {
    abn: string;
    principal: Principal;
    ndisVerified: boolean;
    name: string;
    availability: Array<TimeSlot>;
    summary: string;
    rating?: bigint;
    priceList: Array<[string, bigint]>;
    serviceTypes: Array<string>;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum InvoiceStatus {
    pending = "pending",
    paid = "paid",
    approved = "approved",
    rejected = "rejected"
}
export enum PlanStatus {
    active = "active",
    expired = "expired",
    pendingApproval = "pendingApproval"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAvailability(provider: Principal, timeSlots: Array<TimeSlot>): Promise<void>;
    addServiceProvider(provider: ServiceProvider): Promise<void>;
    approveInvoice(participant: Principal, invoiceNumber: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmBooking(booking: Booking): Promise<void>;
    createBooking(booking: Booking): Promise<void>;
    createInvoice(invoice: Invoice): Promise<void>;
    detectAnomalies(participant: Principal): Promise<Array<string>>;
    getAIAgentMetrics(): Promise<AIAgentMetrics>;
    getAllParticipants(): Promise<Array<Participant>>;
    getAllPlans(): Promise<Array<NDISPlan>>;
    getAllProviders(): Promise<Array<ServiceProvider>>;
    getAvailableProviders(serviceType: string): Promise<Array<string>>;
    getBudgetThresholdAlerts(participant: Principal): Promise<Array<BudgetThresholdAlert>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGuardian(guardian: Principal): Promise<Guardian>;
    getParticipant(participant: Principal): Promise<Participant>;
    getParticipantBookings(participant: Principal): Promise<Array<Booking>>;
    getParticipantEvidence(participant: Principal): Promise<Array<EvidenceDocument>>;
    getParticipantInvoices(participant: Principal): Promise<Array<Invoice>>;
    getParticipantPlans(participant: Principal): Promise<Array<NDISPlan>>;
    getPlanManager(planManager: Principal): Promise<PlanManager>;
    getProvider(provider: Principal): Promise<ServiceProvider>;
    getProviderBookings(provider: Principal): Promise<Array<Booking>>;
    getProviderInvoices(provider: Principal): Promise<Array<Invoice>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    handleBudgetUtilization(utilizedAmount: bigint, participant: Principal, category: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    recordValidationFeedback(participant: Principal, transactionId: string, approved: boolean, reason: string): Promise<void>;
    registerGuardian(guardian: Guardian): Promise<void>;
    registerParticipant(participant: Participant): Promise<void>;
    registerPlanManager(planManager: PlanManager): Promise<void>;
    registerServiceProvider(provider: ServiceProvider): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProviders(serviceType: string): Promise<Array<string>>;
    updateAIValidationThresholds(thresholds: Array<[string, number]>): Promise<void>;
    updateCategorySpending(participant: Principal, category: string, amount: bigint): Promise<void>;
    uploadEvidence(doc: EvidenceDocument): Promise<void>;
    uploadPlan(document: ExternalBlob): Promise<void>;
    validateBudgetTransaction(participant: Principal, category: string, amount: bigint): Promise<BudgetValidationResult>;
    validateCompliance(participant: Principal, invoiceNumber: string): Promise<boolean>;
}
