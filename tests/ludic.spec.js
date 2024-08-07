// @ts-check
const { test, expect } = require('@playwright/test');
/* These tests demonstrate use of the following in Playwright:
  - Page Methods
  - Locator Methods
  - pageFunctions
  - General Assertions
  - Page Assertions
  - Locator Assertions
*/

test('Title', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/ludic/article/precis.html'); 

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ludic Historian/); // Page Assertion - toHaveTitle: Ensures the page has a given title. Accepts regexp.
});

test('Header Disappears on Scroll Down', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/ludic/article/precis.html');
  await expect(page.locator('header')).toHaveClass('nav-down'); // Locators are a way to find elements on a page; Locator Assertion - toHaveClass: Ensures the Locator points to an elements with given CSS classes.
  await expect(page.locator('header')).not.toHaveClass('nav-up'); // not property makes the assertion check for the opposite condition
  // Scroll Down by Header height; Header height is 54px
  await page.evaluate(() => window.scrollBy(0, 55)); // Page Class - evaluate: Returns the value of the pageFunction invocation.
  await expect(page.locator('header')).toHaveClass('nav-up');
  await expect(page.locator('header')).not.toHaveClass('nav-down');
  // Since header is being transformed over the y-axis, it should not be in the viewport
  await expect(page.locator('header')).not.toBeInViewport(); // Locator Assertion - toBeInViewport: Ensures the Locator points to an element that intersects viewport.
  // Scroll Up
  await page.evaluate(() => window.scrollBy(0, -55));
  await expect(page.locator('header')).toHaveClass('nav-down');
  await expect(page.locator('header')).not.toHaveClass('nav-up');
  await expect(page.locator('header')).toBeInViewport();
});

test('Dark/Light Mode', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/ludic/article/precis.html');

  // Page loads in Light Mode
  const onLoadBackgroundColor = await page.locator('body').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color") // window.getComputedStyle returns an object containing the values of all CSS properties of an element
  })
  const onLoadColor = await page.locator('body').evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("color") // CSS property values may be accessed using the getPropertyValue(propName) method
  })
  expect (onLoadBackgroundColor).toBe("rgb(255, 255, 255)") // General Assertion - toBe: Compares objects by reference
  expect(onLoadColor).toBe("rgb(0, 0, 0)")

  // Change to Dark Mode
  await page.locator('svg').filter({ hasText: 'Dark Mode' }).click(); // Locator Class - filter: narrows existing locator according to the options
  const darkModeBackgroundColor = await page.locator('body').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const darkModeColor = await page.locator('body').evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("color")
  })
  // Background should be black and text should be white in dark mode
  expect (darkModeBackgroundColor).toBe("rgb(0, 0, 0)")
  expect(darkModeColor).toBe("rgb(255, 255, 255)")

  // Change back to Light Mode
  await page.locator('svg').filter({ hasText: 'Light Mode' }).click();
  const lightModeBackgroundColor = await page.locator('body').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const lightModeColor = await page.locator('body').evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("color")
  })
  // Background should be white and text should be black in light mode
  expect (lightModeBackgroundColor).toBe("rgb(255, 255, 255)")
  expect(lightModeColor).toBe("rgb(0, 0, 0)")
});

test('Click for Larger Preview', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/ludic/article/precis.html');
  await page.getByRole('img', { name: 'Star Wars in the cinema' }).scrollIntoViewIfNeeded();
  await expect(page.locator('#img-modal').isVisible).toBeFalsy;
  await page.getByRole('img', { name: 'Star Wars in the cinema' }).click();
  await expect(page.locator('#img-modal')).toBeVisible;
  //Close Modal
  await page.getByText('×').click();
  await expect(page.locator('#img-modal').isVisible).toBeFalsy;
});

