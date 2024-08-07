// @ts-check
const { test, expect } = require('@playwright/test');
/* These tests demonstrate use of the following in Playwright:
  - Page Methods
  - Locator Methods
  - ElementHandle Methods
  - General Assertions
  - Page Assertions
  - Locator Assertions
*/

test('Title', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/');

  // Expect a title
  await expect(page).toHaveTitle('Playwright Playground'); // Page Assertion - toHaveTitle: Ensures the page has a given title.
});

test('Practice - Click me', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');
  await page.getByRole('button', { name: 'Click me' }).click({ button: 'right' }); // Mouse click
  await expect(page.getByRole('button', { name: 'Click me' })).toHaveCount(0); //Locator Assertion - toHaveCount: Ensures the Locator resolves to an exactly number of DOM nodes.
  await expect(page.getByRole('button', { name: 'Right Click' })).toBeVisible(); //Locator Assertion - toBeVisible: Ensures that Locator point to an attached and visible DOM node.
  await expect(page.getByRole('button', { name: 'Double Click' })).toHaveCount(0); 
  await page.getByRole('button', { name: 'Right Click' }).dblclick();
  await expect(page.getByRole('button', { name: 'Click me' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Right Click' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Double Click' })).toBeVisible();
});

test('Practice - Focus and Blur', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');

  const loadbackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  // Background color should be white on page load
  expect (loadbackgroundColor).toBe("rgb(255, 255, 255)") // General Assertion - toBe: Compares objects by reference

  // Click inside Focus and Blur 
  await page.locator('#focus-and-blur').click();
  await expect(page.locator('#focus-and-blur')).toBeFocused(); // Locator Assertion - toBeFocused: Ensures the Locator points to a focused DOM node.
  const focusBackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  // Background color should be red in focus
  expect (focusBackgroundColor).toBe("rgb(255, 0, 0)") 

  // How do I click away?
  /* Click outside Focus and Blur
  await page.mouse.click(200,200);
  await page.locator('#focus-and-blur').click();
  const blurBackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  expect (blurBackgroundColor).toBe("rgb(0, 0, 255)") // background color should be blue in blur
  */
});

test('Practice - Enable Disabled Checkbox Choices', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');
  // Choice initially disabled on page load
  await expect(page.locator('#eigen')).toHaveText('(Initially Disabled)'); // Locator Assertion - toHaveText: Ensures the Locator points to an element with the given text.
  await expect(page.getByText('Preferential Eigenstate')).toBeDisabled; // Locator Assertion - toBeDisabled: Ensures the Locator points to a disabled element.
  // Click to enable choice
  await page.getByRole('checkbox', { name: 'Enable Disabled Choices' }).check(); // Locator class - check: Ensure that checkbox or radio element is checked.
  await expect(page.getByRole('checkbox', { name: 'Enable Disabled Choices' })).toBeChecked; // Locator Assertion - toBeChecked: Ensures the Locator points to a checked input.
  await expect(page.getByText('Preferential Eigenstate')).toBeEnabled; // Locator Assertion - toBeEnabled: Ensures the Locator poitns to an enabeld element.
  await expect(page.locator('#eigen')).toHaveText('(Currently Enabled)');
  // Able to click enabled choice
  await page.getByText('Preferential Eigenstate').check();
  await expect(page.getByText('Preferential Eigenstate')).toBeChecked;
  // Click to disable choice
  await page.getByRole('checkbox', { name: 'Enable Disabled Choices' }).uncheck();
  await expect(page.getByText('Preferential Eigenstate').isChecked()).toBeFalsy; // Element Handle Class - isChecked: Returns whehter the element is checked; General Assertion - toBeFalsy: Ensures that value is false in a boolean context
  await expect(page.getByText('Preferential Eigenstate')).toBeDisabled;
  await expect(page.locator('#eigen')).toHaveText('(Currently Disabled)');
});


test('Practice - Radio Buttons', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');
  await page.getByLabel('Warp Core Breach').scrollIntoViewIfNeeded();
  await page.getByLabel('Warp Core Breach').click();
  await expect(page.getByLabel('Warp Core Breach').isChecked({ timeout: 1000 })).toBeFalsy;
  //await expect(page.locator('#mtc').isChecked()).toBeFalsy;
  //await expect(page.locator('#ups').isChecked()).toBeFalsy;
  //await expect(page.locator('#wcb').isChecked()).toBeFalsy;

});


test('Drag and Drop - Colored Boxes', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice_drag_and_drop.html');
  await expect(page.locator('#draggable')).toHaveText('Drag me to my blue target');
  await expect(page.locator('#droppable')).toHaveText('Drop the red box here');
  await page.locator('#draggable').dragTo(page.locator('#droppable'));
  await expect(page.locator('#droppable')).toHaveText('Dropped!');
});

test('Drag and Drop - Columns', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice_drag_and_drop.html');
  await expect(page.locator('#column-a')).toHaveText('First');
  await expect(page.locator('#column-b')).toHaveText('Second');
  await page.getByText('First', { exact: true }).dragTo(page.getByText('Second', { exact: true }));
  await expect(page.locator('#column-a')).toHaveText('Second');
  await expect(page.locator('#column-b')).toHaveText('First');
});

test('Planet Weights', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/planets.html');
  await page.locator('id=wt').scrollIntoViewIfNeeded();
  await page.getByLabel('Enter Your Weight:').fill('148');
  await page.getByRole('button', { name: 'Calculate' }).click();
  const neptuneCalculatedWeight = (1.125 * 148).toString();
  await expect(page.locator('id=outputnpt')).toHaveText(neptuneCalculatedWeight);
});






