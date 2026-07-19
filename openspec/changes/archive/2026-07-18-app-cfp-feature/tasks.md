## 1. Setup & Dependencies

- [x] 1.1 Install `class-validator` and `class-transformer` npm packages in the monorepo root.
- [x] 1.2 Enable the global NestJS `ValidationPipe` inside `api/src/main.ts` with strict options (whitelist, forbidNonWhitelisted).

## 2. NestJS Backend API Implementation

- [x] 2.1 Create `CreateCfpDto` in `api/src/app/` using validation decorators conforming to `SpeakerDTO`.
- [x] 2.2 Create a REST controller endpoint `POST /api/cfp` that binds the request body using `CreateCfpDto`.
- [x] 2.3 Store submissions in-memory or log them to console, returning the created resource.

## 3. NestJS Unit Testing

- [x] 3.1 Write unit tests for `AppController` (or `CfpController`) to verify successful submission validation.
- [x] 3.2 Write unit tests verifying that invalid payloads (e.g. missing name, invalid email) result in validation failure (400 Bad Request status code).

## 4. Angular Frontend Implementation

- [x] 4.1 Create the standalone `CfpFormComponent` and define component state (inputs, touched, submission status) using Signals.
- [x] 4.2 Build the HTML template with WAI-ARIA properties (e.g., `aria-required`, `aria-invalid`, `aria-describedby`) tied to Signal values.
- [x] 4.3 Inject and use `HttpClient` or an Angular service to POST the form data to `/api/cfp`.
- [x] 4.4 Embed the `CfpFormComponent` inside the main `App` component or route.

## 5. Angular Unit Testing

- [x] 5.1 Write unit tests for `CfpFormComponent` to verify the initial state of the form Signals.
- [x] 5.2 Write unit tests verifying that the submit button is disabled initially and when fields are invalid.
- [x] 5.3 Write unit tests verifying that the submit button is enabled when form Signals hold valid values.

## 6. Verification & Run

- [ ] 6.1 Start the API and frontend servers and test the end-to-end CFP submission flow manually.
- [ ] 6.2 Execute Jest unit tests for both applications to ensure all tests pass.
