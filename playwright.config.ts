import { defineConfig, devices } from '@playwright/test';

const host = '127.0.0.1';
const port = 4321;
const localBaseURL = `http://${host}:${port}`;
const runtimeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env;
const externalBaseURL = runtimeEnvironment?.PLAYWRIGHT_BASE_URL;
const isCI = Boolean(runtimeEnvironment?.CI);

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: 1 } : {}),
  reporter: [['line'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: externalBaseURL ?? localBaseURL,
    locale: 'es-CR',
    timezoneId: 'America/Costa_Rica',
    colorScheme: 'light',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  ...(externalBaseURL
    ? {}
    : {
        webServer: {
          command: isCI
            ? `npm run preview -- --host ${host} --port ${port}`
            : `npm run build && npm run preview -- --host ${host} --port ${port}`,
          url: localBaseURL,
          reuseExistingServer: false,
          timeout: 120_000,
          env: {
            ASTRO_PREVIEW_BACKGROUND: '0',
          },
        },
      }),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
