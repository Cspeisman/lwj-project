import { test, expect } from '@playwright/test';

test('has album list', async ({ page }) => {
  await page.goto('/artist');
  await expect(page.getByText('album1')).toBeVisible();
})
