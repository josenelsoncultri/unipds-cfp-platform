## Context

This change implements a Call for Papers (CFP) module in the `cfp-platform` monorepo.
The system consists of:
- A NestJS backend (`api`)
- An Angular frontend (`frontend`)
- A shared TypeScript interface library (`shared-types`) which exports `SpeakerDTO`

The frontend requires a submission form where speakers can submit their proposals. The backend requires a REST endpoint `POST /api/cfp` to receive and strictly validate these submissions.

## Goals / Non-Goals

**Goals:**
- Implement `POST /api/cfp` in NestJS with strict validation using `class-validator` and `class-transformer`.
- Implement a standalone `CfpFormComponent` in Angular using Signals for state management and form binding.
- Leverage WAI-ARIA standards on the form elements to ensure accessibility.
- Implement comprehensive Jest unit tests:
  - Backend validation unit tests asserting a `400 Bad Request` is returned for invalid payloads.
  - Frontend component unit tests asserting the initial state of Signals and that the submit button starts as disabled.
- Make both frontend and backend consume the `SpeakerDTO` interface from `@cfp-platform/shared-types`.

**Non-Goals:**
- Database persistence (submissions can be stored in an in-memory array or logged for the scope of this feature).
- Multi-step/wizard forms or advanced speaker dashboards.
- Authenticaton/Authorization for submitting talks (anyone can submit).

## Decisions

### 1. Backend Validation Architecture
- **Decision**: Introduce a `CreateCfpDto` class that implements `SpeakerDTO` from `@cfp-platform/shared-types`. Use `class-validator` decorators (`@IsString`, `@IsEmail`, `@IsBoolean`, `@IsNotEmpty`) to validate the fields.
- **Rationale**: While NestJS controllers can consume TypeScript interfaces, interfaces are erased at runtime. Using a class that implements the interface allows us to use decorators that NestJS's `ValidationPipe` reads at runtime to reject invalid payloads.
- **Alternative considered**: Manual validation in the controller. This is error-prone, violates NestJS idiomatic practices, and makes testing validations harder.

### 2. Frontend State Management
- **Decision**: Use Angular Signals for managing local component state (form inputs, submission state, loading, and error states).
- **Rationale**: Modern Angular encourages using Signals over traditional forms for lightweight components. Signals provide fine-grained reactivity and sync state easily. We will track touched state to prevent showing errors on initial load.
- **Alternative considered**: Angular Reactive Forms. While robust, pure Signals state management offers a cleaner zoneless/reactive approach and satisfies the explicit requirement of using Signals for state management.

### 3. ID Generation
- **Decision**: The frontend will generate the `id` field as a UUID using `crypto.randomUUID()` before submission.
- **Rationale**: `SpeakerDTO` specifies `id: string` as a required field. By generating this on the client, the payload remains fully compliant with `SpeakerDTO` end-to-end.
- **Alternative considered**: Make the NestJS API generate the ID. In that case, the payload sent to NestJS would omit `id` (e.g. `Omit<SpeakerDTO, 'id'>`), but since both sides are expected to strictly consume the same `SpeakerDTO` contract directly, client-side generation simplifies alignment.

### 4. Accessibility (WAI-ARIA)
- **Decision**: Define semantic form controls with `aria-required`, `aria-invalid`, and `aria-describedby` links pointing to validation error messages.
- **Rationale**: Complies with standard accessibility checklists, ensuring screen readers announce invalid inputs and requirements correctly.

## Risks / Trade-offs

- **Risk**: `class-validator` and `class-transformer` are not present in `package.json` dependencies.
  - **Mitigation**: Add the installation of these npm packages to the setup/tasks list.
- **Risk**: Client-side UUID generation can potentially conflict (extremely low probability) or be bypassed.
  - **Mitigation**: The API still validates that a valid string/UUID is passed and will generate or overwrite if necessary, but for simplicity of this feature we assume the client-generated ID is accepted.
