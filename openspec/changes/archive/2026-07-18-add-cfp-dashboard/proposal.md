## Why

Organizers and users currently lack a dashboard view to list and view all submitted Call for Papers (CFP) proposals. Creating a dedicated CFP Dashboard will allow viewing submitted speaker proposals, improving visibility and usability of the platform.

## What Changes

- Add a NestJS API GET endpoint (`GET /api/cfp` or `GET /cfp`) that returns an array of `SpeakerDTO` items.
- Create a new Angular standalone component `CfpDashboardComponent` in `frontend/src/app/cfp-dashboard/`.
- Inject `HttpClient` in `CfpDashboardComponent` to fetch submissions from the backend GET endpoint.
- Manage state reactivity in `CfpDashboardComponent` using Angular Signals (`WritableSignal<SpeakerDTO[]>`).
- Implement UI layout adhering strictly to semantic HTML (table or card grid) and styling that matches the design tokens and visual identity of `CfpFormComponent`.
- Configure Angular routing with a `path: 'dashboard'` route pointing to `CfpDashboardComponent` in `app.routes.ts`.
- Add a navigation button/link in the CFP submission form (`CfpFormComponent`) and dashboard component to navigate between the form and the dashboard while maintaining visual style consistency.
- Add unit tests for both backend GET endpoint and frontend `CfpDashboardComponent`.

## Capabilities

### New Capabilities
- `cfp-dashboard`: Provides a dashboard view for displaying submitted speaker proposals fetched from the backend API.

### Modified Capabilities
- `cfp-submission`: Add navigation link to the dashboard from the CFP form.

## Impact

- **api**: Add `GET /api/cfp` endpoint in `CfpController` returning `SpeakerDTO[]`.
- **frontend**: Add `CfpDashboardComponent`, update `app.routes.ts` to register `/dashboard`, and add navigation link in `CfpFormComponent`.
- **shared-types**: Uses `SpeakerDTO` array contract.
