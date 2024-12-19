import {test, expect} from '@playwright/test';

test('marks menu items as eaten', async ({page}) => {
    await page.goto('/astro-menu');
    let item = page.getByLabel('Hot Spinach and Cheese Dip');
    await expect(item).not.toBeChecked();
    await item.click();
    await expect(item).toBeChecked();

    await page.reload();
    item = page.getByLabel('Hot Spinach and Cheese Dip');
    await expect(item).toBeChecked();
});

test('it filters for need to try menu items', async ({page}) => {
    await page.goto('/astro-menu');
    const filterButton = page.getByLabel('Only items you need try!');
    await filterButton.click();
    await expect(page.getByText('Buffalo Blasts®')).toBeHidden();
});