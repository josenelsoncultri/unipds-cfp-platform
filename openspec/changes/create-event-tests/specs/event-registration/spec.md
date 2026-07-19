# Event Registration E2E Spec

## Requirements

### Requirement: E2E Success Scenario
The Cypress test suite SHALL navigate to `/event/new`, fill in `#nome`, `#endereco`, `#capacidade`, and `#data`, submit the form, and verify that the success message `"Evento salvo com sucesso!"` is rendered.

#### Scenario: Successful Event Registration
- Given the user is on page `/event/new`
- When valid values are entered into `#nome`, `#endereco`, `#capacidade`, `#data`
- And the submit button is clicked
- Then a success message containing `"Evento salvo com sucesso!"` MUST be visible.

### Requirement: E2E Error Scenario
The Cypress test suite SHALL navigate to `/event/new`, attempt submission of an empty form, and verify that validation messages appear for all required fields (`#nome-error`, `#endereco-error`, `#capacidade-error`, `#data-error`).

#### Scenario: Empty Form Validation Errors
- Given the user is on page `/event/new`
- When the user submits the form without filling required fields
- Then validation error elements (`#nome-error`, `#endereco-error`, `#capacidade-error`, `#data-error`) MUST be visible with proper error messages.
