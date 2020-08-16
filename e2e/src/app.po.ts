import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getLogoText(): Promise<string> {
    return element(by.id('logo')).getText() as Promise<string>;
  }

  getLists(): ElementArrayFinder {
    return element.all(by.css('app-root app-list'));
  }
}
