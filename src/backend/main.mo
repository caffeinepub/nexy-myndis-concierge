import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserRole = AccessControl.UserRole;
  type BookingStatus = { #pending; #confirmed; #cancelled };
  type InvoiceStatus = { #pending; #approved; #rejected; #paid };
  type PlanStatus = { #active; #expired; #pendingApproval };
  type ComplianceStatus = { #complete; #incomplete; #pending };
  type TimeSlot = { start : Int; end : Int };
  type BudgetCategory = { name : Text; amount : Int; spent : Int };
  type InvoiceLineItem = { description : Text; quantity : Int; price : Int };

  type UserProfile = {
    name : Text;
    email : Text;
    role : Text; // "participant", "provider", "planManager", "guardian"
  };

  type Participant = {
    name : Text;
    age : Int;
    primaryContact : Text;
    ndisNumber : Text;
    address : Text;
    planManager : Principal;
  };

  type ServiceProvider = {
    principal : Principal;
    name : Text;
    abn : Text;
    ndisVerified : Bool;
    serviceTypes : [Text];
    summary : Text;
    availability : [TimeSlot];
    priceList : [(Text, Int)];
    rating : ?Nat;
  };

  type Booking = {
    participant : Principal;
    provider : Principal;
    serviceType : Text;
    timeSlot : TimeSlot;
    status : BookingStatus;
    price : Int;
  };

  type NDISPlan = {
    planNumber : Text;
    participant : Principal;
    startDate : Int;
    endDate : Int;
    status : PlanStatus;
    categories : [(Text, BudgetCategory)];
    goals : [Text];
    document : ?Storage.ExternalBlob;
  };

  type Invoice = {
    number : Text;
    provider : Principal;
    participant : Principal;
    items : [InvoiceLineItem];
    status : InvoiceStatus;
    totalAmount : Int;
  };

  type EvidenceDocument = {
    id : Text;
    participant : Principal;
    provider : Principal;
    category : Text;
    file : Storage.ExternalBlob;
  };

  type PlanManager = { provider : Principal };
  type Guardian = { participant : Principal };

  type BudgetThresholdAlert = {
    participant : Principal;
    category : Text;
    threshold : Int;
    utilized : Int;
    timestamp : Int;
  };

  type BudgetValidationResult = {
    valid : Bool;
    reasons : [Text];
    warnings : [Text];
    predictedDepletionDate : ?Int;
    recommendedAdjustments : [(Text, Int)];
  };

  type AIAgentMetrics = {
    validationAccuracy : Float;
    falsePositiveRate : Float;
    falseNegativeRate : Float;
    averageProcessingTime : Int;
    confidenceScores : [Float];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let participants = Map.empty<Principal, Participant>();
  let providers = Map.empty<Principal, ServiceProvider>();
  let plans = Map.empty<Principal, List.List<NDISPlan>>();
  let planManagers = Map.empty<Principal, PlanManager>();
  let guardians = Map.empty<Principal, Guardian>();
  let bookings = Map.empty<Principal, List.List<Booking>>();
  let participantBookings = Map.empty<Principal, List.List<Booking>>();
  let invoices = Map.empty<Principal, List.List<Invoice>>();
  let evidenceDocuments = Map.empty<Principal, List.List<EvidenceDocument>>();
  let complianceDocs = Map.empty<Text, ComplianceStatus>();
  let budgetThresholdAlerts = Map.empty<Principal, Set.Set<BudgetThresholdAlert>>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  private func isParticipant(principal : Principal) : Bool {
    participants.containsKey(principal);
  };

  private func isProvider(principal : Principal) : Bool {
    providers.containsKey(principal);
  };

  private func isPlanManager(principal : Principal) : Bool {
    planManagers.containsKey(principal);
  };

  private func isGuardian(principal : Principal) : Bool {
    guardians.containsKey(principal);
  };

  private func isGuardianOf(guardian : Principal, participant : Principal) : Bool {
    switch (guardians.get(guardian)) {
      case (null) { false };
      case (?g) { g.participant == participant };
    };
  };

  private func isPlanManagerOf(planManager : Principal, participant : Principal) : Bool {
    switch (participants.get(participant)) {
      case (null) { false };
      case (?p) { p.planManager == planManager };
    };
  };

  private func canAccessParticipantData(caller : Principal, participant : Principal) : Bool {
    caller == participant or
    isGuardianOf(caller, participant) or
    isPlanManagerOf(caller, participant) or
    AccessControl.isAdmin(accessControlState, caller);
  };

  private func canModifyParticipantData(caller : Principal, participant : Principal) : Bool {
    caller == participant or
    isGuardianOf(caller, participant) or
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getProvider(provider : Principal) : async ServiceProvider {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view providers");
    };
    switch (providers.get(provider)) {
      case (null) { Runtime.trap("Provider does not exist") };
      case (?provider) { provider };
    };
  };

  public query ({ caller }) func getAllProviders() : async [ServiceProvider] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view providers");
    };
    providers.values().toArray();
  };

  public query ({ caller }) func getParticipant(participant : Principal) : async Participant {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view participant data");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own data or data you manage");
    };
    switch (participants.get(participant)) {
      case (null) { Runtime.trap("Participant does not exist") };
      case (?participant) { participant };
    };
  };

  public query ({ caller }) func getAllParticipants() : async [Participant] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all participants");
    };
    participants.values().toArray();
  };

  public query ({ caller }) func getPlanManager(planManager : Principal) : async PlanManager {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view plan manager data");
    };
    if (caller != planManager and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own plan manager profile");
    };
    switch (planManagers.get(planManager)) {
      case (null) { Runtime.trap("Plan Manager does not exist") };
      case (?planManager) { planManager };
    };
  };

  public query ({ caller }) func getGuardian(guardian : Principal) : async Guardian {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view guardian data");
    };
    if (caller != guardian and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own guardian profile");
    };
    switch (guardians.get(guardian)) {
      case (null) { Runtime.trap("Guardian does not exist") };
      case (?guardian) { guardian };
    };
  };

  public shared ({ caller }) func registerParticipant(participant : Participant) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    if (participants.containsKey(caller)) {
      Runtime.trap("Participant already exists");
    };
    if (providers.containsKey(caller) or planManagers.containsKey(caller) or guardians.containsKey(caller)) {
      Runtime.trap("Cannot register as participant: Already registered in another role");
    };
    participants.add(caller, participant);
  };

  public shared ({ caller }) func registerServiceProvider(provider : ServiceProvider) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    if (caller != provider.principal) {
      Runtime.trap("Unauthorized: Can only register yourself as a provider");
    };
    if (providers.containsKey(caller)) {
      Runtime.trap("Provider already exists");
    };
    if (participants.containsKey(caller) or planManagers.containsKey(caller) or guardians.containsKey(caller)) {
      Runtime.trap("Cannot register as provider: Already registered in another role");
    };
    providers.add(caller, provider);
  };

  public shared ({ caller }) func registerPlanManager(planManager : PlanManager) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    if (planManagers.containsKey(caller)) {
      Runtime.trap("Plan Manager already exists");
    };
    if (participants.containsKey(caller) or providers.containsKey(caller) or guardians.containsKey(caller)) {
      Runtime.trap("Cannot register as plan manager: Already registered in another role");
    };
    planManagers.add(caller, planManager);
  };

  public shared ({ caller }) func registerGuardian(guardian : Guardian) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    if (guardians.containsKey(caller)) {
      Runtime.trap("Guardian already exists");
    };
    if (not isParticipant(guardian.participant)) {
      Runtime.trap("Cannot register guardian: Participant does not exist");
    };
    guardians.add(caller, guardian);
  };

  public shared ({ caller }) func addServiceProvider(provider : ServiceProvider) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add providers directly");
    };
    providers.add(provider.principal, provider);
  };

  public shared ({ caller }) func addAvailability(provider : Principal, timeSlots : [TimeSlot]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add availability");
    };
    if (caller != provider) {
      Runtime.trap("Unauthorized: Can only manage your own availability");
    };
    if (not isProvider(caller)) {
      Runtime.trap("Unauthorized: Only registered providers can add availability");
    };
  };

  public query ({ caller }) func searchProviders(serviceType : Text) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can search providers");
    };
    [];
  };

  public query ({ caller }) func getAvailableProviders(serviceType : Text) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can search providers");
    };
    [];
  };

  public shared ({ caller }) func uploadPlan(document : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload plans");
    };

    let participantPrincipal = if (isParticipant(caller)) {
      caller;
    } else if (isGuardian(caller)) {
      switch (guardians.get(caller)) {
        case (null) { Runtime.trap("Guardian not found") };
        case (?g) { g.participant };
      };
    } else {
      Runtime.trap("Unauthorized: Only participants or guardians can upload plans");
    };

    let plan = {
      planNumber = "plan-" # Time.now().toText();
      participant = participantPrincipal;
      startDate = Time.now();
      endDate = Time.now() + 31536000;
      status = #active;
      categories = [];
      goals = [];
      document = ?document;
    };

    let currentPlans = switch (plans.get(participantPrincipal)) {
      case (null) { List.empty<NDISPlan>() };
      case (?existingPlans) { existingPlans };
    };

    plans.add(participantPrincipal, List.fromArray<NDISPlan>(currentPlans.toArray().concat([plan])));
  };

  public query ({ caller }) func getParticipantPlans(participant : Principal) : async [NDISPlan] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view plans");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own plans or plans you manage");
    };
    switch (plans.get(participant)) {
      case (null) { [] };
      case (?plansList) { plansList.toArray() };
    };
  };

  public query ({ caller }) func getAllPlans() : async [NDISPlan] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all plans");
    };
    let allPlans = List.empty<NDISPlan>();
    for (planList in plans.values()) {
      let plansArray = planList.toArray();
      for (plan in plansArray.values()) {
        allPlans.add(plan);
      };
    };
    allPlans.toArray();
  };

  public shared ({ caller }) func updateCategorySpending(participant : Principal, category : Text, amount : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update spending");
    };
    // Only plan managers and admins can update spending for participants
    if (not isPlanManagerOf(caller, participant) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only plan managers can update participant spending");
    };
    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };
  };

  public shared ({ caller }) func createBooking(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };
    if (caller != booking.participant and not isGuardianOf(caller, booking.participant)) {
      Runtime.trap("Unauthorized: Can only create bookings for yourself or your ward");
    };
    if (not isParticipant(booking.participant)) {
      Runtime.trap("Invalid booking: Participant not registered");
    };
    if (not isProvider(booking.provider)) {
      Runtime.trap("Invalid booking: Provider not registered");
    };

    let participantBookingsList = switch (participantBookings.get(booking.participant)) {
      case (null) { List.empty<Booking>() };
      case (?bookingsList) { bookingsList };
    };

    participantBookings.add(booking.participant, List.fromArray<Booking>(participantBookingsList.toArray().concat([booking])));
  };

  public shared ({ caller }) func confirmBooking(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can confirm bookings");
    };
    if (caller != booking.provider) {
      Runtime.trap("Unauthorized: Only the provider can confirm bookings");
    };
    if (not isProvider(caller)) {
      Runtime.trap("Unauthorized: Only registered providers can confirm bookings");
    };

    let bookingsByParticipant = switch (participantBookings.get(booking.participant)) {
      case (null) { Runtime.trap("No bookings found for participant") };
      case (?bookingsList) { bookingsList };
    };

    let bookingsArray = bookingsByParticipant.toArray();
    let index = switch (bookingsArray.findIndex(func(b : Booking) : Bool {
      b.participant == booking.participant and b.provider == booking.provider and b.timeSlot == booking.timeSlot
    })) {
      case (null) { Runtime.trap("Booking not found") };
      case (?foundIndex) { foundIndex };
    };

    if (index < bookingsArray.size()) {
      let updatedBooking = { booking with status = #confirmed };
      let updatedBookings = Array.tabulate(bookingsArray.size(), func(i : Nat) : Booking {
        if (i == index) { updatedBooking } else { bookingsArray[i] };
      });
      participantBookings.add(booking.participant, List.fromArray<Booking>(updatedBookings));
    } else {
      Runtime.trap("Booking not found");
    };
  };

  public query ({ caller }) func getParticipantBookings(participant : Principal) : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view bookings");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own bookings or bookings you manage");
    };
    switch (participantBookings.get(participant)) {
      case (null) { [] };
      case (?bookingsList) { bookingsList.toArray() };
    };
  };

  public query ({ caller }) func getProviderBookings(provider : Principal) : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view bookings");
    };
    if (caller != provider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own bookings");
    };
    if (not isProvider(provider)) {
      Runtime.trap("Provider not registered");
    };

    let allBookings = List.empty<Booking>();
    for (bookingList in participantBookings.values()) {
      for (booking in bookingList.values()) {
        if (booking.provider == provider) {
          allBookings.add(booking);
        };
      };
    };
    allBookings.toArray();
  };

  public shared ({ caller }) func createInvoice(invoice : Invoice) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create invoices");
    };
    if (caller != invoice.provider) {
      Runtime.trap("Unauthorized: Can only create invoices for your own services");
    };
    if (not isProvider(caller)) {
      Runtime.trap("Unauthorized: Only registered providers can create invoices");
    };
    if (not isParticipant(invoice.participant)) {
      Runtime.trap("Invalid invoice: Participant not registered");
    };

    let currentInvoices = switch (invoices.get(invoice.participant)) {
      case (null) { List.empty<Invoice>() };
      case (?invoicesList) { invoicesList };
    };

    invoices.add(invoice.participant, List.fromArray<Invoice>(currentInvoices.toArray().concat([invoice])));
  };

  public shared ({ caller }) func approveInvoice(participant : Principal, invoiceNumber : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can approve invoices");
    };
    if (not isPlanManagerOf(caller, participant) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only plan managers can approve invoices");
    };

    let participantInvoices = switch (invoices.get(participant)) {
      case (null) { Runtime.trap("No invoices found for participant") };
      case (?invoicesList) { invoicesList };
    };

    let invoicesArray = participantInvoices.toArray();
    let index = switch (invoicesArray.findIndex(func(inv : Invoice) : Bool { inv.number == invoiceNumber })) {
      case (null) { Runtime.trap("Invoice not found") };
      case (?foundIndex) { foundIndex };
    };

    if (index < invoicesArray.size()) {
      let updatedInvoice = { invoicesArray[index] with status = #approved };
      let updatedInvoices = Array.tabulate(invoicesArray.size(), func(i : Nat) : Invoice {
        if (i == index) { updatedInvoice } else { invoicesArray[i] };
      });
      invoices.add(participant, List.fromArray<Invoice>(updatedInvoices));
    } else {
      Runtime.trap("Invoice not found");
    };
  };

  public query ({ caller }) func getParticipantInvoices(participant : Principal) : async [Invoice] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view invoices");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own invoices or invoices you manage");
    };
    switch (invoices.get(participant)) {
      case (null) { [] };
      case (?invoicesList) { invoicesList.toArray() };
    };
  };

  public query ({ caller }) func getProviderInvoices(provider : Principal) : async [Invoice] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view invoices");
    };
    if (caller != provider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own invoices");
    };
    if (not isProvider(provider)) {
      Runtime.trap("Provider not registered");
    };

    let providerInvoices = List.empty<Invoice>();
    for (invoiceList in invoices.values()) {
      for (invoice in invoiceList.values()) {
        if (invoice.provider == provider) {
          providerInvoices.add(invoice);
        };
      };
    };
    providerInvoices.toArray();
  };

  public shared ({ caller }) func uploadEvidence(doc : EvidenceDocument) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload evidence");
    };

    let canUpload = if (caller == doc.participant) {
      isParticipant(caller);
    } else if (caller == doc.provider) {
      isProvider(caller);
    } else if (isGuardianOf(caller, doc.participant)) {
      true;
    } else {
      false;
    };

    if (not canUpload) {
      Runtime.trap("Unauthorized: Can only upload evidence as participant, provider, or guardian");
    };

    if (not isParticipant(doc.participant)) {
      Runtime.trap("Invalid evidence: Participant not registered");
    };

    if (not isProvider(doc.provider)) {
      Runtime.trap("Invalid evidence: Provider not registered");
    };

    let currentEvidence = switch (evidenceDocuments.get(doc.participant)) {
      case (null) { List.empty<EvidenceDocument>() };
      case (?evidenceList) { evidenceList };
    };

    evidenceDocuments.add(doc.participant, List.fromArray<EvidenceDocument>(currentEvidence.toArray().concat([doc])));
  };

  public query ({ caller }) func getParticipantEvidence(participant : Principal) : async [EvidenceDocument] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view evidence");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own evidence or evidence you manage");
    };
    switch (evidenceDocuments.get(participant)) {
      case (null) { [] };
      case (?evidenceList) { evidenceList.toArray() };
    };
  };

  // Budget Validation and AI Agent Functions
  public query ({ caller }) func getBudgetThresholdAlerts(participant : Principal) : async [BudgetThresholdAlert] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view alerts");
    };
    if (not canAccessParticipantData(caller, participant)) {
      Runtime.trap("Unauthorized: Can only view your own alerts or alerts you manage");
    };
    switch (budgetThresholdAlerts.get(participant)) {
      case (null) { [] };
      case (?alerts) { alerts.toArray() };
    };
  };

  // Internal function - only callable by the canister itself (AI agents)
  public shared ({ caller }) func handleBudgetUtilization(utilizedAmount : Int, participant : Principal, category : Text) : async () {
    // This function should only be called internally by AI agents
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can call this function");
    };

    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };
  };

  // AI Agent Configuration and Monitoring (Admin only)
  public query ({ caller }) func getAIAgentMetrics() : async AIAgentMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view AI agent metrics");
    };
    {
      validationAccuracy = 0.0;
      falsePositiveRate = 0.0;
      falseNegativeRate = 0.0;
      averageProcessingTime = 0;
      confidenceScores = [];
    };
  };

  public shared ({ caller }) func updateAIValidationThresholds(thresholds : [(Text, Float)]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update AI validation thresholds");
    };
  };

  public shared ({ caller }) func validateBudgetTransaction(participant : Principal, category : Text, amount : Int) : async BudgetValidationResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can validate transactions");
    };
    // Plan managers and admins can validate any participant's transactions
    // Providers can validate for transactions they're involved in
    if (not isPlanManagerOf(caller, participant) and
        not AccessControl.isAdmin(accessControlState, caller) and
        not isProvider(caller)) {
      Runtime.trap("Unauthorized: Only plan managers or providers can validate transactions");
    };

    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };

    {
      valid = true;
      reasons = [];
      warnings = [];
      predictedDepletionDate = null;
      recommendedAdjustments = [];
    };
  };

  public shared ({ caller }) func detectAnomalies(participant : Principal) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can detect anomalies");
    };
    if (not isPlanManagerOf(caller, participant) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only plan managers can detect anomalies");
    };

    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };

    [];
  };

  public shared ({ caller }) func validateCompliance(participant : Principal, invoiceNumber : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can validate compliance");
    };
    if (not isPlanManagerOf(caller, participant) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only plan managers can validate compliance");
    };

    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };

    true;
  };

  public shared ({ caller }) func recordValidationFeedback(participant : Principal, transactionId : Text, approved : Bool, reason : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can record feedback");
    };
    if (not isPlanManagerOf(caller, participant) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only plan managers can record validation feedback");
    };

    if (not isParticipant(participant)) {
      Runtime.trap("Invalid participant");
    };
  };
};
