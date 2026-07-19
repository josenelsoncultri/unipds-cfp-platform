## 1. Cypress Environment Setup

- [ ] 1.1 Add/verify Cypress configuration `frontend-e2e/cypress.config.ts` with `baseUrl: 'http://localhost:4200'`.
- [ ] 1.2 Configure Cypress TypeScript configuration (`tsconfig.json` or support files) if needed.

## 2. Event Registration E2E Tests Implementation

- [ ] 2.1 Create `frontend-e2e/src/e2e/event-registration.cy.ts` (and ensure directory `apps/frontend-e2e/src/e2e/` compatibility if requested).
- [ ] 2.2 Implement **Cenário de Sucesso**:
  - `cy.visit('/event/new')`
  - `cy.intercept('POST', '/api/event', { statusCode: 201, body: { ... } })`
  - `cy.get('#nome').type('Tech Conference 2026')`
  - `cy.get('#endereco').type('Av. Paulista, 1000')`
  - `cy.get('#capacidade').type('500')`
  - `cy.get('#data').type('2026-10-15')`
  - `cy.get('button[type="submit"]').click()`
  - Assert `cy.get('.success-message').should('be.visible').and('contain', 'Evento salvo com sucesso!')`.
- [ ] 2.3 Implement **Cenário de Erro**:
  - `cy.visit('/event/new')`
  - Trigger validation on empty form (e.g. submit empty form or touch inputs).
  - Assert native error messages appear for `#nome-error`, `#endereco-error`, `#capacidade-error`, `#data-error`.

## 3. Verification

- [ ] 3.1 Run Cypress E2E test suite to verify spec passes.
