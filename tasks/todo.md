# TODO PLAN — OTP + SESSION FIX (Approved)

## Goal
Stabilize the OTP login flow, fix Appwrite session creation, fix redirect not working, secure cookies, and clean up UI with minimal, safe changes.

---

## Checklist

### A. Environment & Config Checks
- [ ] A1: Validate `.env.local` contains all required Appwrite variables.
- [ ] A2: Add runtime guards in `appwrite/config.ts` for missing env vars.
- [ ] A3: Verify endpoint URL is correctly passed to Appwrite client.

### B. Appwrite Client Fixes
- [ ] B1: Update `createAdminClient()` to ensure secure server-only usage.
- [ ] B2: Update `createSessionClient()` to properly read cookie and handle missing values.

### C. OTP Flow Fix
- [ ] C1: Update `sendEmailOTP()` to return both `userId` and `secret`.
- [ ] C2: Update `verifySecret()` to use proper Appwrite API for email token login.
- [ ] C3: Fix cookie setting to use correct session token.
- [ ] C4: Ensure cookie name is consistent (`appwrite_session` recommended).
- [ ] C5: Ensure `verifySecret()` returns a plain object `{ success: true }` or `{ sessionId }`.

### D. Frontend Integration
- [ ] D1: Fix client-side redirect: `if (result?.sessionId) router.push("/")`.
- [ ] D2: Remove `parseStringify` misuse.
- [ ] D3: Add loading/disabled state during OTP verify.

### E. UI Minor Fixes
- [ ] E1: Ensure Submit button spacing (already updated).
- [ ] E2: Ensure OTP wrapper matches design.
- [ ] E3: Optional: Add auto-focus + next-slot logic.

### F. Security & Clean-up
- [ ] F1: Ensure secrets are server-side only.
- [ ] F2: Cookies must be httpOnly, secure, sameSite strict.
- [ ] F3: Run TypeScript syntax check after edits.
- [ ] F4: Add REVIEW section after implementation.

---

## REVIEW (to be filled after implementation)
- Summary of changes
- Security audit notes
- Redirect confirmation
- Session creation confirmation
