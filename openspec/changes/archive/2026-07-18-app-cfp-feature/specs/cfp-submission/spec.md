## ADDED Requirements

### Requirement: Frontend CFP Form Validation
The frontend application SHALL validate the CFP form fields before submission. The fields (name, email, talkTitle) MUST be non-empty and email MUST be a valid email format. The submit button SHALL be disabled when the form is invalid or in its initial/unfilled state.

#### Scenario: Initial form state
- **WHEN** the speaker loads the CFP submission form
- **THEN** all fields are empty, the validation state is invalid, and the submit button is disabled.

#### Scenario: Valid inputs enable submission
- **WHEN** the speaker enters a valid name, valid email, and non-empty talk title
- **THEN** the form becomes valid and the submit button is enabled.

#### Scenario: Invalid email disables submission
- **WHEN** the speaker enters an invalid email format (e.g. "not-an-email")
- **THEN** the email field is marked invalid and the submit button is disabled.

### Requirement: Accessibility with WAI-ARIA
The CFP form SHALL incorporate appropriate accessibility attributes to ensure assistive technologies can correctly parse the fields and validation status.

#### Scenario: Accessibility attributes on inputs
- **WHEN** the form is rendered
- **THEN** required inputs (name, email, talkTitle) SHALL have aria-required="true", and the form element SHALL have appropriate aria-label or aria-labelledby.

#### Scenario: Validation state announced via ARIA
- **WHEN** a field is invalid and has focus or validation fails
- **THEN** the input SHALL have aria-invalid="true", and error messages SHALL be referenced via aria-describedby or inside an aria-live region.

### Requirement: API Strict Validation
The NestJS backend API SHALL expose a POST /api/cfp endpoint which strictly validates the incoming payload using a class validator. If any field does not match the SpeakerDTO requirements (name, email, talkTitle are required, email must be a valid email structure, isGDE is boolean), it MUST reject the request.

#### Scenario: Submitting invalid payload to API
- **WHEN** a POST request is made to /api/cfp with a payload missing the email field or containing an invalid email format
- **THEN** the API SHALL reject the request with a 400 Bad Request status code.

#### Scenario: Submitting valid payload to API
- **WHEN** a POST request is made to /api/cfp with all required valid fields conforming to SpeakerDTO
- **THEN** the API SHALL process the submission and return a success status (e.g., 201 Created).
