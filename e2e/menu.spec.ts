import { test, expect } from '@playwright/test';

test.describe('menu page', () => {
  test('can complete a menu item', async ({page}) => {
    await page.goto('/static-menu');

    let buffaloBlasts = page.getByLabel('Hot Spinach and Cheese Dip');
    await buffaloBlasts.click();

    await expect(page.getByLabel('Hot Spinach and Cheese Dip')).toBeChecked();

    await page.reload();
    await expect(page.getByLabel('Hot Spinach and Cheese Dip')).toBeChecked();
  });

  test('can filter out eaten items', async ({page}) => {
    await page.goto('/static-menu');
    const filterButton = page.getByLabel('filter items left to try!');
    await filterButton.click();
    await expect(page.getByText('Buffalo Blasts®')).toBeHidden();
  });
})
