# Capability: CFP Dashboard

## Overview

Provides a list view of all submitted speaker Call for Papers (CFP) proposals.

## Requirements

### Requirement: List CFP Submissions
The backend MUST expose a GET route to return all stored CFP speaker submissions as `SpeakerDTO[]`.

#### Scenario: Successfully retrieve submitted talks
- Given one or more talk proposals have been submitted
- When a client sends a GET request to `/api/cfp`
- Then the API MUST respond with HTTP 200 OK and an array containing the submitted `SpeakerDTO` objects.

### Requirement: Frontend Dashboard Display
The frontend MUST render a dedicated dashboard component at route `/dashboard`.

#### Scenario: Render submissions list with reactive state
- Given the user navigates to `/dashboard`
- When the component loads
- Then it MUST fetch the submissions from `/api/cfp` via `HttpClient`
- And it MUST store the results in a `WritableSignal<SpeakerDTO[]>`
- And it MUST render the list using semantic HTML elements (table or cards) matching the visual identity/design tokens of the application.

### Requirement: Navigation between Form and Dashboard
The application MUST provide consistent navigation between the submission form and the dashboard.

#### Scenario: Navigate from Form to Dashboard and back
- Given a user is on the CFP submission form (`/`)
- When they click the Dashboard navigation button
- Then they MUST be routed to `/dashboard`
- And when they click the Form navigation button on the dashboard
- Then they MUST be routed back to `/`.
