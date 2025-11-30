import { Page, test } from '@playwright/test';

import {
  compareScreenshot,
  navigateToScreen,
  setTheme,
  waitForAppReady,
} from '../../../../utils/tests';

type ApplicationsMocks = {
  catalog?: Array<Record<string, unknown>>;
  installed?: Array<Record<string, unknown>>;
  storage?: { usedBytes: number; limitBytes: number; availableBytes: number };
};

const DEFAULT_CATALOG = [
  {
    id: 'catalog-app-1',
    key: 'voice-painter',
    name: 'Voice Painter',
    version: '2.1.0',
    type: 'widget',
    description: 'Create vivid wallpapers powered by your imagination.',
    isPublished: true,
    status: 'published',
    permissions: [],
  },
  {
    id: 'catalog-app-2',
    key: 'meeting-notes',
    name: 'Meeting Notes',
    version: '1.4.3',
    type: 'service',
    description: 'Records, transcribes, and summarizes every meeting.',
    isPublished: true,
    status: 'published',
    permissions: [],
  },
  {
    id: 'catalog-app-3',
    key: 'workflow-orchestrator',
    name: 'Workflow Orchestrator',
    version: '3.0.0',
    type: 'screen',
    description: 'Visualize and automate complex assistant workflows.',
    isPublished: true,
    status: 'published',
    permissions: [],
  },
];

const DEFAULT_INSTALLED = [
  {
    id: 'installed-app-1',
    key: 'media-hub',
    name: 'Media Hub',
    version: '1.2.0',
    type: 'screen',
    description: 'Unified media controls across devices.',
    status: 'draft',
    permissions: [],
    owner: 'visual-test-user',
  },
  {
    id: 'installed-app-2',
    key: 'task-pilot',
    name: 'Task Pilot',
    version: '1.6.5',
    type: 'service',
    description: 'Plan and track your day-to-day tasks with the assistant.',
    status: 'published',
    permissions: [],
    owner: 'another-user',
  },
];

const DEFAULT_STORAGE = {
  usedBytes: 24 * 1024 * 1024,
  limitBytes: 100 * 1024 * 1024,
  availableBytes: 76 * 1024 * 1024,
};

const APPLICATIONS_API_BASE = '**/applications';
const setupApplicationsMocks = async (page: Page, mocks: ApplicationsMocks = {}) => {
  await page.route(`${APPLICATIONS_API_BASE}/catalog`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: { applications: mocks.catalog ?? DEFAULT_CATALOG },
      }),
    });
  });

  await page.route(`${APPLICATIONS_API_BASE}/installed`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: { applications: mocks.installed ?? DEFAULT_INSTALLED },
      }),
    });
  });

  await page.route(`${APPLICATIONS_API_BASE}/storage`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: { storage: mocks.storage ?? DEFAULT_STORAGE },
      }),
    });
  });
};

const authenticateTestUser = async (page: Page) => {
  await page.evaluate(() => {
    type WindowWithStore = Window & { __REDUX_STORE__?: { dispatch: (action: unknown) => void } };
    const win = window as WindowWithStore;
    win.__REDUX_STORE__?.dispatch({
      type: 'user/setUser',
      payload: {
        id: 'visual-test-user',
        username: 'visualtester',
        name: 'Visual Tester',
        email: 'visual@tester.dev',
      },
    });
  });
};

const waitForApplicationsScreen = async (page: Page, tab: 'store' | 'installed') => {
  await page.waitForSelector('[data-testid="applications-tab-store"]', { timeout: 10000 });
  const listSelector =
    tab === 'store'
      ? '[data-testid="applications-list-store"]'
      : '[data-testid="applications-list-installed"]';
  await page.waitForSelector(listSelector, { timeout: 10000 });
};

test.describe('ApplicationsScreen Visual Tests', () => {
  test('Catalog tab - light theme', async ({ page }) => {
    await setupApplicationsMocks(page);
    await page.goto('/');
    await waitForAppReady(page);
    await setTheme(page, 'light');
    await navigateToScreen(page, 'menu', 'applications');

    await page.setViewportSize({ width: 1280, height: 2200 });
    await waitForApplicationsScreen(page, 'store');
    await page.waitForSelector('text=Voice Painter', { timeout: 10000 });
    await page.waitForTimeout(300);

    await compareScreenshot(page, 'applications-screen-catalog-light', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('My Applications tab - dark theme', async ({ page }) => {
    page.on('console', (message) => {
      // eslint-disable-next-line no-console
      console.log('[ApplicationsTest][console]', message.type(), message.text());
    });
    page.on('pageerror', (error) => {
      // eslint-disable-next-line no-console
      console.error('[ApplicationsTest][pageerror]', error);
    });
    await setupApplicationsMocks(page);
    await page.goto('/');
    await waitForAppReady(page);
    await authenticateTestUser(page);
    await setTheme(page, 'dark');
    await navigateToScreen(page, 'menu', 'applications');

    await page.setViewportSize({ width: 1280, height: 2200 });
    await waitForApplicationsScreen(page, 'store');
    const installedTab = page.getByTestId('applications-tab-installed');
    await installedTab.click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="applications-list-installed"]', { timeout: 10000 });
    await page.waitForSelector('text=Media Hub', { timeout: 10000 });
    await page.waitForTimeout(400);

    await compareScreenshot(page, 'applications-screen-my-apps-dark', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
