// @ts-check
const { test, expect } = require('@playwright/test');
/* These tests demonstrate use of the following in Playwright:
  - Locators
  - Page Methods
  - Locator Methods
  - XPath
  - General Assertions
  - Page Assertions
  - Locator Assertions
  - MDN Methods
*/

test('Title', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/'); // Page Method - goto: Returns the main resource response.

  // Expect a title
  await expect(page).toHaveTitle('Playwright Playground'); // Page Assertion - toHaveTitle: Ensures the page has a given title.
});

test('Menu', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/');

  // Menu should be closed on page load after 5ms annimation
  await page.waitForTimeout(500); // Page Method - waitForTimeout - Waits for the given timeout in milliseconds.
  await expect(page.locator('#navlist')).toHaveText('+'); // Locator Assertion - toHaveText: Ensures the Locator points to an element with the given text.
  // Why does both toBeInViewport and not toBeInViewport pass?
  //await expect(page.locator('#areas')).toBeInViewport(); // Locator Assertion - toBeInViewport: Ensures the Locator points to an element that intersects viewport.
  //await expect(page.locator('#areas')).not.toBeInViewport(); // not property makes the assertion check for the opposite condition
  // Open Menu
  await page.locator('#navlist').click(); // Locator Method - click: Clicks an element.
  await expect(page.locator('#navlist')).toHaveText('-');
  await expect(page.locator('//div[@id="areas"]/h2')).toHaveText('Pages'); // Xpath Locator
  await expect(page.locator('//div[@id="areas"]/ul/li')).toHaveText(['Planets', 'Stardates', 'Warp Travel', 'Warcraft', 'Practice']); // toHaveText Locator Assertion accepts array
  // Navigate to Planets from Menu
  await page.getByRole('link', { name: 'Planets' }).click();
  await expect(page).toHaveURL('https://testerstories.com/xyzzy/planets.html'); // Page Assertion - toHaveURL: Ensures the page is navigated to the given URL.
  // Navigate to Stardates from Menu
  await page.waitForTimeout(500);
  await page.locator('#navlist').click();
  await page.getByRole('link', { name: 'Stardates' }).click();
  await expect(page).toHaveURL('https://testerstories.com/xyzzy/stardates.html');
  // Navigate to Warp Travel from Menu
  await page.waitForTimeout(500);
  await page.locator('#navlist').click();
  await page.getByRole('link', { name: 'Warp Travel' }).click();
  await expect(page).toHaveURL('https://testerstories.com/xyzzy/warp.html');
  // Navigate to Warp Travel from Menu
  await page.waitForTimeout(500);
  await page.locator('#navlist').click();
  await page.getByRole('link', { name: 'Warcraft' }).click();
  await expect(page).toHaveURL('https://testerstories.com/xyzzy/warcraft.html');
  // Navigate to Practice from Menu
  await page.waitForTimeout(500);
  await page.locator('#navlist').click();
  await page.getByRole('link', { name: 'Practice' }).click();
  await expect(page).toHaveURL('https://testerstories.com/xyzzy/practice.html');
});

test('Practice - Click me', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');
  await page.getByRole('button', { name: 'Click me' }).click({ button: 'right' }); 
  await expect(page.getByRole('button', { name: 'Click me' })).toHaveCount(0); // Locator Assertion - toHaveCount: Ensures the Locator resolves to an exactly number of DOM nodes.
  await expect(page.getByRole('button', { name: 'Right Click' })).toBeVisible(); // Locator Assertion - toBeVisible: Ensures that Locator point to an attached and visible DOM node.
  await expect(page.getByRole('button', { name: 'Double Click' })).toHaveCount(0); 
  await page.getByRole('button', { name: 'Right Click' }).dblclick(); // Locator Method - dblclick: Double-clicks an element.
  await expect(page.getByRole('button', { name: 'Click me' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Right Click' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Double Click' })).toBeVisible();
});

test('Practice - Focus and Blur', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');

  await page.locator('#focus-and-blur').scrollIntoViewIfNeeded();
  const loadbackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => { // Locator Method - evaluate: Execute JavaScript code in the page, taking the matching element as an argument.
    return window.getComputedStyle(e).getPropertyValue("background-color") // window.getComputedStyle method returns an object containing the values of all CSS properties of an element
  }) 
  // Background color should be white on page load
  expect (loadbackgroundColor).toBe("rgb(255, 255, 255)") // General Assertion - toBe: Compares objects by reference

  // Click inside Focus and Blur 
  await page.locator('#focus-and-blur').click();
  await expect(page.locator('#focus-and-blur')).toBeFocused(); // Locator Assertion - toBeFocused: Ensures the Locator points to a focused DOM node.
  const focusBackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color") // CSS property values may be accessed using the getPropertyValue(propName) method
  })
  // Background color should be red in focus
  expect (focusBackgroundColor).toBe("rgb(255, 0, 0)") 

  // Click outside Focus and Blur
  await page.locator("body").click({ position: { x: 0, y: 0 } });
  const blurBackgroundColor = await page.locator('#focus-and-blur').evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  // Background color should be blue in blur
  expect (blurBackgroundColor).toBe("rgb(0, 0, 255)") 
});

test('Practice - Enable Disabled Checkbox Choices', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice.html');
  // Choice initially disabled on page load
  await expect(page.locator('#eigen')).toHaveText('(Initially Disabled)'); 
  await expect(page.getByText('Preferential Eigenstate')).toBeDisabled; // Locator Assertion - toBeDisabled: Ensures the Locator points to a disabled element.
  // Click to enable choice
  await page.getByRole('checkbox', { name: 'Enable Disabled Choices' }).check(); // Locator Method - check: Ensure that checkbox or radio element is checked.
  await expect(page.getByRole('checkbox', { name: 'Enable Disabled Choices' })).toBeChecked; // Locator Assertion - toBeChecked: Ensures the Locator points to a checked input.
  await expect(page.getByText('Preferential Eigenstate')).toBeEnabled; // Locator Assertion - toBeEnabled: Ensures the Locator poitns to an enabeld element.
  await expect(page.locator('#eigen')).toHaveText('(Currently Enabled)');
  // Able to click enabled choice
  await page.getByText('Preferential Eigenstate').check();
  await expect(page.getByText('Preferential Eigenstate')).toBeChecked;
  // Click to disable choice
  await page.getByRole('checkbox', { name: 'Enable Disabled Choices' }).uncheck();
  await expect(page.getByText('Preferential Eigenstate').isChecked()).toBeFalsy; // Locator Method - isChecked(): Returns whether the element is checked.
  await expect(page.locator('#eigen')).toHaveText('(Currently Disabled)');
});

test('Drag and Drop - Colored Boxes', async ({ page }) => {
  await page.goto('https://testerstories.com/xyzzy/practice_drag_and_drop.html');
  await expect(page.locator('#draggable')).toHaveText('Drag me to my blue target');
  await expect(page.locator('#droppable')).toHaveText('Drop the red box here');
  await page.locator('#draggable').dragTo(page.locator('#droppable')); // Locator Method - dragTo: Drag the source element towards the target element and drop it.
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
  // Enter weight and calculate
  const inputWeight = "148";
  await page.getByLabel('Enter Your Weight:').fill(inputWeight);
  await page.getByRole('button', { name: 'Calculate' }).click();
  // Check calculated weights
  const sunCalculatedWeight = ((10 * Number(inputWeight) * 27.072) / 10).toString();
  await expect(page.locator('#outputsun')).toHaveValue(sunCalculatedWeight);
  const mercuryCalculatedWeight = ((10 * Number(inputWeight) * .378) / 10).toString();
  await expect(page.locator('#outputmrc')).toHaveValue(mercuryCalculatedWeight);
  const lunaCalculatedWeight = ((10 * Number(inputWeight) * .166) / 10).toString();
  await expect(page.locator('#outputluna')).toHaveValue(lunaCalculatedWeight);
  const venusCalculatedWeight = ((10 * Number(inputWeight) * .907) / 10).toString();
  await expect(page.locator('#outputvn')).toHaveValue(venusCalculatedWeight);
  const marsCalculatedWeight = ((10 * Number(inputWeight) * .377) / 10).toString();
  await expect(page.locator('#outputmars')).toHaveValue(marsCalculatedWeight);
  const jupiterCalculatedWeight = ((10 * Number(inputWeight) * 2.364) / 10).toString();
  await expect(page.locator('#outputjp')).toHaveValue(jupiterCalculatedWeight);
  const saturnCalculatedWeight = ((10 * Number(inputWeight) * 1.064) / 10).toString();
  await expect(page.locator('#outputsat')).toHaveValue(saturnCalculatedWeight);
  const uranusCalculatedWeight = ((10 * Number(inputWeight) * .889) / 10).toString();
  await expect(page.locator('#outputur')).toHaveValue(uranusCalculatedWeight);
  const neptuneCalculatedWeight = ((10 * Number(inputWeight) * 1.125) / 10).toString();
  await expect(page.locator('#outputnpt')).toHaveValue(neptuneCalculatedWeight);
  const plutoCalculatedWeight = ((10 * Number(inputWeight) * .067) / 10).toString();
  await expect(page.locator('#outputplt')).toHaveValue(plutoCalculatedWeight);
});

/* Questions:
- When to use await in Playwright?
- Should we goto page for each test?
- What is best approach to click outside of an element? (Example: Focus and Blur)
*/






