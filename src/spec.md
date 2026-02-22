# Specification

## Summary
**Goal:** Fix the registration completion flow so users are properly redirected to their role-specific dashboards after completing registration.

**Planned changes:**
- Fix navigation after Participant registration to redirect to /dashboard/participant
- Fix navigation after Provider registration to redirect to /dashboard/provider
- Fix navigation after Guardian registration to redirect to /dashboard/guardian
- Fix navigation after Plan Manager registration to redirect to /dashboard/plan-manager
- Investigate and resolve any backend issues preventing successful profile creation
- Ensure user role assignment persists correctly after registration

**User-visible outcome:** After completing registration for any role (Participant, Provider, Guardian, or Plan Manager), users will be successfully redirected to their appropriate dashboard with Kenyan-localized data displayed, without any errors.
