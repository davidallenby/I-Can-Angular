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

  getListTitle(index: number): Promise<string> {
    const list = this.getLists().get(index);
    const title = list.element(by.css('p.lead')).getText();
    return title as Promise<string>;
  }

  async isListSorted(index: number): Promise<boolean> {
    const list = this.getLists().get(index);
    const items = await list.$$('ul li').getText();
    const strings = [...items];
    strings.forEach((str, i) => {
      if (str[i] > str[i + 1]) {
        return false;
      }
    });
    return true;
  }
}
