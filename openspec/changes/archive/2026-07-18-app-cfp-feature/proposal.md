## Why

Speakers currently lack a way to submit talk proposals for conferences directly through the platform. This module implements a dedicated Call for Papers (CFP) submission flow to streamline application intake, validate speaker details, and persist proposals.

## What Changes

- Create a new frontend Speaker/CFP submission page/form with proper validation, using Angular Standalone Components, Signals, and WAI-ARIA.
- Add a NestJS API endpoint (`POST /api/cfp`) that accepts a payload conforming to `SpeakerDTO` with strict class-validator validations.
- Ensure both the api and frontend applications consume the `SpeakerDTO` contract exported by the `shared-types` library.
- Add Jest unit tests for both backend payload validation (ensuring a 400 Bad Request is returned on invalid payload) and frontend Angular Signal initial state and submit button disabling logic.

## Capabilities

### New Capabilities
- `cfp-submission`: Allows speakers to submit their talk proposals with details like name, email, talk title, and whether they are a Google Developer Expert (GDE), with frontend/backend validation.

### Modified Capabilities

## Impact

- **api**: A new endpoint `POST /api/cfp` (or within a new controller) with a class-validator DTO implementing/mirroring `SpeakerDTO` for validation.
- **frontend**: A new form/view using Angular Standalone components, Reactive Forms or Signal-based forms, using Signals for state management and WAI-ARIA attributes for form accessibility.
- **shared-types**: Exposes the `SpeakerDTO` contract which both components will reference.
