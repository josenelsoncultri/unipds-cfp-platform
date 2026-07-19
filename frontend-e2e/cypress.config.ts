import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'o5mvdh',
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});
