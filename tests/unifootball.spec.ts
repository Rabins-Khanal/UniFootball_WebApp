import { expect, test } from 'playwright/test';

// Set base URL
const BASE_URL = 'http://localhost:5173';

// 🛡️ Authentication Tests
test('User can log in successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-in`);
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', 'sjlkhanal@gmail.com');
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', '123789sbk456');
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}`);
    await expect(page).toHaveURL(`${BASE_URL}`);
});


