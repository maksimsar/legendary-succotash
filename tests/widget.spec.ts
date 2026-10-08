import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const acceptCookies = page
      .getByText('ОК', { exact: true })
      .and(page.locator(':visible'));
    await acceptCookies.click();
    await expect(acceptCookies).toBeHidden();
  });

  test('opens', async ({ page }) => {
    const widgetPage = new WidgetPage(page);

    await widgetPage.openWidget();

    await expect(widgetPage.body).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    const widgetPage = new WidgetPage(page);

    await widgetPage.openWidget();
    await widgetPage.openFirstPopularArticle();
    await widgetPage.clickWriteToUs();

    await expect(widgetPage.heading).toHaveText('Связь с поддержкой');
  });

  test('returns to popular articles from an article', async ({ page }) => {
    const widgetPage = new WidgetPage(page);

    await widgetPage.openWidget();
    await widgetPage.openFirstPopularArticle();
    await expect(widgetPage.writeToUsButton).toBeVisible();

    await widgetPage.goBack();

    await expect(widgetPage.popularArticles.first()).toBeVisible();
    await expect(widgetPage.allArticlesButton).toBeVisible();
    await expect(widgetPage.writeToUsButton).toBeHidden();
  });
});
