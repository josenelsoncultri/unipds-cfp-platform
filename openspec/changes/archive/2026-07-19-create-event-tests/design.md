## Context

The `cfp-platform` monorepo includes an Angular frontend with an event registration screen at route `/event/new` handled by `EventFormComponent`.
To verify end-to-end functionality, we need automated E2E tests using Cypress.

## Goals / Non-Goals

**Goals:**
- Set up Cypress E2E testing for the event registration screen.
- Create `frontend-e2e/src/e2e/event-registration.cy.ts`.
- Test **Success Scenario**: Navigate to `/event/new`, fill all fields using CSS selectors (`#nome`, `#endereco`, `#capacidade`, `#data`), submit, and verify `.success-message` ("Evento salvo com sucesso!").
- Test **Error Scenario**: Navigate to `/event/new`, submit/touch empty form, and verify error messages (`#nome-error`, `#endereco-error`, `#capacidade-error`, `#data-error`).
- Use **EXCLUSIVE** traditional Cypress commands (`cy.get()`, `cy.contains()`, `should()`).

**Non-Goals:**
- Adding external AI testing libraries or visual regression tools.
- Modifying `EventFormComponent` source code unless a selector bug is discovered.

## Decisions

### 1. Test Location and File Naming
- **Decision**: Place Cypress spec in `frontend-e2e/src/e2e/event-registration.cy.ts` (with optional reference path `apps/frontend-e2e/src/e2e/event-registration.cy.ts`).
- **Rationale**: Follows standard Nx / Cypress project structure while matching user prompt requirements.

### 2. Form Selectors
- **Decision**: Use ID-based CSS selectors (`#nome`, `#endereco`, `#capacidade`, `#data`, `button[type="submit"]`).
- **Rationale**: Matches the HTML IDs already present in `event-form.component.html`.

### 3. Success & Error Handling
- **Decision**:
  - Success scenario: Intercept `POST /api/event` with `cy.intercept` returning status 201/200, fill out valid form data, click submit, assert `cy.contains('Evento salvo com sucesso!')` or `cy.get('.success-message').should('be.visible')`.
  - Error scenario: Attempt form submission or focus/blur empty fields, assert `cy.get('#nome-error').should('contain', 'Nome é obrigatório.')`, `#endereco-error`, `#capacidade-error`, `#data-error`.
- **Rationale**: Ensures deterministic, repeatable tests that do not rely on backend availability during E2E runs while verifying real UI behavior.

## Risks / Trade-offs

- **Risk**: Disabled submit button when form is untouched might block standard `click()`.
  - **Mitigation**: Using `cy.get('form').submit()` or focusing/touching controls triggers Angular Reactive Form validation marks (`markAllAsTouched()`), activating validation state and enabling submit button once valid.
