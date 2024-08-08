import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('has title', async ({ page }) => {
  await page.goto('/');

  //Expect a title "to contain" a substring
  await expect(page).toHaveTitle('Vue Project');
})

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div > h1')).toHaveText('Let\'s play with numbers!');
})

test('has placeholder', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const locator = page.locator('id=inputNumber')
  console.log(await locator.getAttribute("placeholder"));
  await expect(locator).toHaveAttribute("placeholder", "Your Number");
})

test('Special Number color', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const numberInput = page.locator('id=inputNumber');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await numberInput.scrollIntoViewIfNeeded();
  await numberInput.fill("2");
  await submitButton.click();
  await expect(page.locator('id=validNumber')).toBeVisible;
  await expect(page.locator('.specialNumber').first()).toHaveCSS("color", "rgb(38, 251, 235)"); // Locator API is strict, meaning if it finds more than one element, it will throw
})

test("Interaction with inputs - 1 is a valid number and odd", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const numberInput = page.locator('id=inputNumber');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await numberInput.scrollIntoViewIfNeeded();
  console.log('Before entering data: ' + await numberInput.inputValue());
  await numberInput.fill("1");
  console.log('After entering data: ' + await numberInput.inputValue());
  await submitButton.click();
  await expect(page.locator('id=yourNumber')).toHaveText("Your number is: 1");
  await expect(page.locator('id=validNumber')).toBeVisible;
  await expect(page.locator('id=validNumber')).toHaveText("Yay! You entered a valid number!");
  await expect(page.locator('id=oddNumber')).toBeVisible;
  await expect(page.locator('id=evenNumber')).toHaveCount(0);
})

test("Interaction with inputs - 89 is a valid number, prime, and Fibonacci", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const numberInput = page.locator('id=inputNumber');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await numberInput.scrollIntoViewIfNeeded();
  console.log('Before entering data: ' + await numberInput.inputValue());
  await numberInput.fill("1");
  console.log('After entering data: ' + await numberInput.inputValue());
  await submitButton.click();
  await expect(page.locator('id=yourNumber')).toHaveText("Your number is: 1");
  await expect(page.locator('id=validNumber')).toBeVisible;
  await expect(page.locator('id=validNumber')).toHaveText("Yay! You entered a valid number!");
  await expect(page.locator('id=oddNumber')).toBeVisible;
  await expect(page.locator('id=evenNumber')).toHaveCount(0);
  await expect(page.locator('id=primeNumber')).toBeVisible;
  await expect(page.locator('id=FibonacciNumber')).toBeVisible;
})

test("Interaction with inputs - 101 is a not a valid number", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const numberInput = page.locator('id=inputNumber');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await numberInput.scrollIntoViewIfNeeded();
  console.log('Before entering data: ' + await numberInput.inputValue());
  await numberInput.fill("101");
  console.log('After entering data: ' + await numberInput.inputValue());
  await submitButton.click();
  await expect(page.locator('id=yourNumber')).toHaveText("Your number is: 101");
  await expect(page.locator('id=validNumber')).toBeVisible;
  await expect(page.locator('id=validNumber')).toHaveText("Oh no! You entered an invalid number!");
})
