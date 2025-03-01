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

test('User cannot log in with wrong credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-in`);
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', 'sjlllkhanal@gmail.com');
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', '123789sbk4567');
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/sign-in`);
    await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
});

test('User can sign up successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-up`);

    // Wait for the username input to be visible before interacting
    await page.waitForSelector('input#username');

    // Fill in the username (Using `id` selector)
    await page.fill('input#username', 'newuser');

    // Wait for the email input and fill it
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', 'newuser@example.com');

    // Wait for the password input and fill it
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', 'SecurePass123!');

    // Click the submit button after waiting for it to be ready
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    // ✅ Ensure user is redirected to the sign-in page
    await page.waitForURL(`${BASE_URL}/sign-in`, { timeout: 5000 });
    await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
});


test('User can log out successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.waitForSelector('button:has-text("Sign out")');
    await page.click('button:has-text("Sign out")');
    await page.waitForSelector('text=Sign In');
    await expect(page.locator('text=Sign In')).toBeVisible();
});

// 📝 Comment Tests
test('User can post a comment', async ({ page }) => {
    await page.goto(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);
    await page.waitForSelector('textarea');
    await page.fill('textarea', 'This is a test comment.');
    await page.waitForSelector('button:has-text("Submit")');
    await page.click('button:has-text("Submit")');
    await page.waitForSelector('text=This is a test comment.');
});

test('User can edit a comment', async ({ page }) => {
    await page.goto(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);

    // Wait for the Edit button to be available
    await page.waitForSelector('button:has-text("Edit")');
    await page.click('button:has-text("Edit")');

    // Wait for the text area, clear it, and enter a new comment
    await page.waitForSelector('textarea');
    await page.fill('textarea', 'This is an edited comment.');

    // Click the save button
    await page.waitForSelector('button:has-text("Save")');
    await page.click('button:has-text("Save")');

    // Verify if the updated comment is visible
    await page.waitForSelector('text=This is an edited comment.');
    await expect(page.locator('text=This is an edited comment.')).toBeVisible();
});

test('User can delete a comment', async ({ page }) => {
    await page.goto(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);

    // Wait for the Delete button and click it
    await page.waitForSelector('button:has-text("Delete")');
    await page.click('button:has-text("Delete")');

    // Confirm deletion by clicking "Yes, I'm sure" (if there's a confirmation popup)
    await page.waitForSelector('button:has-text("Yes, I\'m sure")');
    await page.click('button:has-text("Yes, I\'m sure")');

    // Ensure the comment is no longer visible
    await page.waitForSelector('text=This is an edited comment.', { state: 'hidden' });
    await expect(page.locator('text=This is an edited comment.')).toHaveCount(0);
});


test('Admin can create a news post', async ({ page }) => {
    await page.goto(`${BASE_URL}/create-post`);

    await page.waitForSelector('input[id="title"]');
    await page.fill('input[id="title"]', 'New Football Match');

    await page.waitForSelector('.ql-editor');
    await page.click('.ql-editor');
    await page.keyboard.type('Match details here');

    await page.waitForSelector('button:has-text("Publish")');
    await page.click('button:has-text("Publish")');

    // Allow time for post to appear (if needed)
    await page.waitForTimeout(3000); // ⏳ Adjust based on response time

    // Check if post appears (try different selectors if necessary)

});


test('Admin can delete a user', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard?tab=users`);

    // Wait for the delete button to be available
    await page.waitForSelector('span.text-red-500');

    // Click on the delete button (first instance if multiple users)
    await page.locator('span.text-red-500').first().click();

    // Wait for confirmation modal and click "Yes, I'm sure"
    await page.waitForSelector('button:has-text("Yes, I\'m sure")');
    await page.click('button:has-text("Yes, I\'m sure")');

    // Expect a success message
    await expect(page).toHaveURL(`${BASE_URL}/dashboard?tab=users`);
});


test('Admin can delete a news post', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard?tab=posts`);

    // Wait for the delete button to be available
    await page.waitForSelector('span.text-red-500');

    // Click on the delete button (first instance if multiple posts)
    await page.locator('span.text-red-500').first().click();

    // Wait for confirmation modal and click "Yes, I'm sure"
    await page.waitForSelector('button:has-text("Yes")');
    await page.click('button:has-text("Yes")');

    // Expect a success message
    await expect(page).toHaveURL(`${BASE_URL}/dashboard?tab=posts`);
});


test('Navigation links work correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}`);

    // Click "About" and check URL
    await page.waitForSelector('text=About');
    await page.click('text=About');
    await page.waitForURL(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);

    // Click "Contact" and check URL
    await page.waitForSelector('text=Contact Us');
    await page.click('text=Contact Us');
    await page.waitForURL(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
});

test('User can navigate to About page', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.waitForSelector('text=About');
    await page.click('text=About');
    await page.waitForURL(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);
});

test('User can navigate to Contact Us page', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.waitForSelector('text=Contact Us');
    await page.click('text=Contact Us');
    await page.waitForURL(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
});

test('User cannot submit an empty comment', async ({ page }) => {
    await page.goto(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);

    await page.waitForSelector('button:has-text("Submit")');
    await page.click('button:has-text("Submit")');

    await expect(page).toHaveURL(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);

});

test('User cannot sign up with an existing email', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-up`);

    await page.fill('input[id="username"]', 'rabins123');
    await page.fill('input[type="email"]', 'sjlkhanal@gmail.com'); // Use an email that already exists
    await page.fill('input[type="password"]', '123789sbk456');

    await page.click('button[type="submit"]');

    await page.waitForSelector('text=E11000 duplicate key error collection: unifootballl.users index: username_1 dup key: { username: "rabins123" }');
    await expect(page.locator('text=E11000 duplicate key error collection: unifootballl.users index: username_1 dup key: { username: "rabins123" }')).toBeVisible();
});


test('User cannot sign in with incorrect password', async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-in`);

    await page.fill('input[type="email"]', 'sjlkhanal@gmail.com');
    await page.fill('input[type="password"]', 'WrongPassword');

    await page.click('button[type="submit"]');

    await page.waitForSelector('text=Invalid password');
    await expect(page.locator('text=Invalid password')).toBeVisible();
});

test('User can navigate to Profile page', async ({ page }) => {
    await page.goto(`${BASE_URL}`);

    await page.waitForSelector('img[alt="user"]');
    await page.click('img[alt="user"]');

    await page.waitForSelector('text=Profile');
    await page.click('text=Profile');

    await page.waitForURL(`${BASE_URL}/dashboard?tab=profile`);
    await expect(page).toHaveURL(`${BASE_URL}/dashboard?tab=profile`);
});


test('Admin can view list of users in dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard?tab=users`);

    await page.waitForSelector('text=USERNAME');
    await expect(page.locator('text=USERNAME')).toBeVisible();
});

test('Clicking a news title navigates to the news page', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);

    await page.waitForSelector('text=Mohamed Salah and Dominik Szoboszlai down Man City to put Liverpool 11 points clear of Arsenal');
    await page.click('text=Read More');

    await page.waitForURL(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);
    await expect(page).toHaveURL(`${BASE_URL}/post/mohamed-salah-and-dominik-szoboszlai-down-man-city-to-put-liverpool-11-points-clear-of-arsenal`);
});


test('User cannot submit an empty search', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);

    await page.waitForSelector('button:has-text("Apply")');
    await page.click('button:has-text("Apply")');

    await page.waitForSelector('text=No posts found');
    await expect(page.locator('text=No posts found')).toBeVisible();
});

test('Clicking a category filter updates search results', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);

    await page.waitForSelector('select[id="category"]');
    await page.selectOption('select[id="category"]', 'Chelsea');
    await page.click('text=Read More');
    await page.waitForSelector('text=Chelsea');

});

test('Home page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await expect(page.locator('text=Welcome to UniFootball')).toBeVisible();
});

test('Navbar contains expected links', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.waitForSelector('text=Home');
    await page.waitForSelector('text=About');
    await page.waitForSelector('text=Contact Us');
});

test('Clicking Home link redirects to homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    await page.click('text=Home');
    await page.waitForURL(`${BASE_URL}`);
    await expect(page).toHaveURL(`${BASE_URL}`);
});

test('Search bar is present on homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await expect(page.locator('input[placeholder="Search..."]')).toBeVisible();
});

test('Create Post button is visible after login', async ({ page }) => {
    await page.goto(`${BASE_URL}`);

    // Simulate login (assuming session persists across tests)
    await page.click('img[alt="user"]');

    await expect(page.locator('text=Create post')).toBeVisible();
});

test('Contact page has email and phone details', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await expect(page.locator('text=support@unifootball.com')).toBeVisible();
    await expect(page.locator('text=+1 (234) 567-890')).toBeVisible();
});

test('Clicking a news post redirects correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);

    await page.waitForSelector('a[href*="/post/"]'); // Any post link
    await page.click('a[href*="/post/"]');

    await expect(page).toHaveURL(/.*\/post\/.*/);
});

test('Clicking the logo redirects to homepage', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.click('text=UniFootball'); // Assuming "UniFootball" is in the logo
    await page.waitForURL(`${BASE_URL}`);
    await expect(page).toHaveURL(`${BASE_URL}`);
});

test('Footer contains Privacy Policy and Terms links', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await expect(page.locator('text=Privacy Policy')).toBeVisible();
    await expect(page.locator('text=Terms & Conditions')).toBeVisible();
});

test('User sees error message for invalid search', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);
    await page.fill('input[type="text"]', 'RandomNonExistentPost');
    await page.press('input[type="text"]', 'Enter');
    await page.waitForSelector('text=No posts found.');
    await expect(page.locator('text=No posts found.')).toBeVisible();
});

