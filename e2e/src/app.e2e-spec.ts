import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have header logo text', () => {
    page.navigateTo();
    expect(page.getLogoText()).toEqual('AGL Dev Test');
  });

  it('should have two lists', () => {
    expect(page.getLists().count()).toEqual(2);
  });

  it('should have a list titled "Male" and a list titled "Female"', () => {
    expect(page.getListTitle(0)).toBe('Male');
    expect(page.getListTitle(1)).toBe('Female');
  });

  it('List 1 should be sorted alphabetically', () => {
    expect(page.isListSorted(0)).toBeTruthy();
  });

  it('List 2 should be sorted alphabetically', () => {
    expect(page.isListSorted(1)).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
