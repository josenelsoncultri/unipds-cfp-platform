## 1. Backend API Endpoint

- [x] 1.1 Add `@Get()` endpoint to `CfpController` (or `AppController`) in `api/src/app/` returning `SpeakerDTO[]`.
- [x] 1.2 Write NestJS controller unit test to verify `GET /api/cfp` returns the array of `SpeakerDTO`.

## 2. Angular Frontend Dashboard Implementation

- [x] 2.1 Create standalone `CfpDashboardComponent` in `frontend/src/app/cfp-dashboard/`.
- [x] 2.2 Inject `HttpClient` into `CfpDashboardComponent` to GET proposals from `/api/cfp`.
- [x] 2.3 Store and expose submissions list using an Angular `signal<SpeakerDTO[]>([])`.
- [x] 2.4 Build HTML template with semantic structure (table or card list) displaying submission details (Name, Email, Talk Title, GDE status).
- [x] 2.5 Style `CfpDashboardComponent` matching the design tokens, fonts, colors, and styling of `CfpFormComponent`.

## 3. Navigation & Routing

- [x] 3.1 Register route `{ path: 'dashboard', component: CfpDashboardComponent }` in `frontend/src/app/app.routes.ts`.
- [x] 3.2 Add a navigation link/button in `CfpFormComponent` pointing to `/dashboard` styled consistently.
- [x] 3.3 Add a navigation link/button in `CfpDashboardComponent` pointing back to `/` (form).

## 4. Verification

- [x] 4.1 Run Jest tests to ensure all tests pass.
- [x] 4.2 Verify end-to-end flow manually (submitting a proposal and seeing it on the dashboard).
