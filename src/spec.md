# Specification

## Summary
**Goal:** Fix vertical scrolling functionality on the onboarding tour page after clicking "Get Started" from the landing page.

**Planned changes:**
- Diagnose and remove CSS styles preventing scroll in OnboardingFlow and WelcomeScreen components (fixed positioning, overflow:hidden, or height constraints)
- Ensure the onboarding overlay/modal implements proper scrolling for content that exceeds viewport height
- Verify App.tsx and router configuration allow proper scrolling during onboarding flow
- Test scroll functionality works on both desktop and mobile viewports

**User-visible outcome:** After clicking "Get Started", users can scroll vertically through all onboarding content including the welcome title, subtitle, four feature cards (Manage Your Plan, Find Providers, Track Goals, Stay Compliant), and Skip Tour button.
