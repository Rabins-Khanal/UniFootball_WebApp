import { defineConfig } from 'playwright/test';
export default defineConfig({
    testDir: './tests', // Directory for tests
    timeout: 20000, // 30 seconds per test
    expect: {
        timeout: 5000, // 5 seconds for assertions
    },
    use: {
        baseURL: 'http://localhost:5173',
        storageState: 'auth.json',
        browserName: 'chromium', // Default browser
        headless: false, // Set to true for headless mode
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
});
