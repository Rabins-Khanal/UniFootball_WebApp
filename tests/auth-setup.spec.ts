import { test } from 'playwright/test';

// Set base URL
const BASE_URL = 'http://localhost:5173';

// ✅ Login once and save session
test('Sign in and store authentication state', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-in`);

    await page.fill('input[type="email"]', 'sjlkhanal@gmail.com');
    await page.fill('input[type="password"]', '123789sbk456');
    await page.click('button[type="submit"]');

    // Ensure login was successful
    await page.waitForURL(`${BASE_URL}`);

    // Save the authentication state
    await page.context().storageState({ path: 'auth.json' });
});
