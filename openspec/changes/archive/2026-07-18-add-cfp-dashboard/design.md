## Context

The `cfp-platform` monorepo currently contains a Call for Papers (CFP) form where users can submit talk proposals. Submissions are stored in memory in the NestJS API backend.
We now need to add a dashboard interface in Angular to list all submitted proposals, as well as a NestJS GET endpoint to serve this data.

## Goals / Non-Goals

**Goals:**
- Implement `GET /api/cfp` endpoint in NestJS (`CfpController` or `AppController`) that returns an array of `SpeakerDTO`.
- Create a standalone `CfpDashboardComponent` in Angular using Signals (`signal<SpeakerDTO[]>`) for reactivity and state management.
- Inject `HttpClient` into `CfpDashboardComponent` to fetch the proposals from the backend.
- Apply semantic HTML (table or list of cards) and adhere strictly to the visual design, colors, and design tokens established in `CfpFormComponent`.
- Configure the `/dashboard` route in `app.routes.ts`.
- Add seamless navigation buttons between `CfpFormComponent` and `CfpDashboardComponent` with consistent styling.
- Add unit tests for backend controller GET route and frontend dashboard component.

**Non-Goals:**
- Database persistence (in-memory storage array is sufficient).
- Pagination, sorting, or complex search filters on the dashboard.
- Authentication or role-based access control.

## Decisions

### 1. Backend Data Retrieval
- **Decision**: Expose `@Get()` in `CfpController` (or `AppController`) returning `SpeakerDTO[]`.
- **Rationale**: Returns all submitted talks stored in memory to satisfy the dashboard requirement.

### 2. Frontend State Management & Reactivity
- **Decision**: Use `signal<SpeakerDTO[]>([])` to store the list of submissions in `CfpDashboardComponent`. Update the signal upon HTTP request completion.
- **Rationale**: Keeps component reactive and lightweight using native Angular Signals.

### 3. UI/UX Consistency & Semantic HTML
- **Decision**: Use semantic `<table>` (or list of cards) wrapped inside `.cfp-dashboard` styled with the same fonts, box shadows, background colors, and button styles as `.cfp-form`.
- **Rationale**: Fulfills the requirement for visual identity and design token consistency across components.

### 4. Navigation & Routing
- **Decision**: Add `{ path: 'dashboard', component: CfpDashboardComponent }` in `app.routes.ts`, and add `routerLink="/dashboard"` / `routerLink=""` navigation buttons in both components.
- **Rationale**: Provides intuitive navigation between the submission form and the submissions dashboard.

## Risks / Trade-offs

- **Risk**: In-memory storage resets when API server restarts.
  - **Mitigation**: Acceptable for current project scope. Sample data can be initialized or submitted via the form.
