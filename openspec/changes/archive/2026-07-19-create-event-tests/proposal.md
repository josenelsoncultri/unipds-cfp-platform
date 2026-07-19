## Why

Currently, the Event Registration screen (`/event/new`) lacks automated end-to-end (E2E) testing with Cypress. Adding robust traditional Cypress E2E tests ensures that the event registration user interface functions correctly in both success and error scenarios, guaranteeing validation messages work as expected and form submissions succeed without regressions.

## What Changes

- Create Cypress E2E test suite in `frontend-e2e/src/e2e/event-registration.cy.ts` (and alias path `apps/frontend-e2e/src/e2e/event-registration.cy.ts` if needed).
- Add Cypress configuration `cypress.config.ts` in `frontend-e2e/` (or root) to support running Cypress E2E tests against `http://localhost:4200`.
- Implement **Success Scenario**:
  - Visit `/event/new`.
  - Fill form fields (Nome `#nome`, Endereço `#endereco`, Capacidade `#capacidade`, Data `#data`) using standard CSS selectors.
  - Intercept/mock or execute API submission to `/api/event`.
  - Click submit button and assert success message (`.success-message`, `"Evento salvo com sucesso!"`) is displayed.
- Implement **Error Scenario**:
  - Visit `/event/new`.
  - Trigger validation by submitting or interacting with empty form.
  - Assert native validation error messages appear for required fields (`#nome-error`, `#endereco-error`, `#capacidade-error`, `#data-error`).
- Enforce **Golden Rule**: Use EXCLUSIVAMENTE traditional Cypress syntax (`cy.get()`, `cy.contains()`, `should()`) without external AI libraries.

## Capabilities

### New Capabilities
- `event-registration-e2e-tests`: End-to-end Cypress test coverage for the `/event/new` form.

### Modified Capabilities
- `frontend-e2e`: Support Cypress test runner execution alongside existing E2E suite.

## Impact

- **frontend-e2e**: Adds Cypress test file `frontend-e2e/src/e2e/event-registration.cy.ts` and Cypress configuration `cypress.config.ts`.
- **frontend**: Validated via automated browser interactions against `EventFormComponent`.
