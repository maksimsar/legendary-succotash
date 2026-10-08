import type { Locator, Page } from '@playwright/test';

export class WidgetPage {
  readonly body: Locator;
  readonly heading: Locator;
  readonly popularArticles: Locator;
  readonly writeToUsButton: Locator;
  readonly allArticlesButton: Locator;

  private readonly openButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    this.body = page.locator('div:has(> header [data-test="button_close"])');
    this.heading = this.body.getByRole('banner').getByRole('heading');
    this.popularArticles = this.body
      .getByText('Популярные статьи', { exact: true })
      .locator('+ ul')
      .getByTestId('article-list-item');
    this.writeToUsButton = this.body.locator('[data-test="button_feedback_form"]');
    this.allArticlesButton = this.body.locator('[data-test="button_all_articles"]');
    this.openButton = page.locator('[data-test="openWidget"]');
    this.backButton = this.body.locator('[data-test="button_back"]');
  }

  async openWidget(): Promise<void> {
    await this.openButton.click();
  }

  async openFirstPopularArticle(): Promise<void> {
    await this.popularArticles.first().click();
  }

  async clickWriteToUs(): Promise<void> {
    await this.writeToUsButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }
}
