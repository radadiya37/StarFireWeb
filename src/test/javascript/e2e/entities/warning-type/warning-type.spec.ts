import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WarningTypeComponentsPage from './warning-type.page-object';
import WarningTypeUpdatePage from './warning-type-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('WarningType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let warningTypeComponentsPage: WarningTypeComponentsPage;
  let warningTypeUpdatePage: WarningTypeUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    warningTypeComponentsPage = new WarningTypeComponentsPage();
    warningTypeComponentsPage = await warningTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load WarningTypes', async () => {
    expect(await warningTypeComponentsPage.title.getText()).to.match(/Warning Types/);
    expect(await warningTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete WarningTypes', async () => {
    const beforeRecordsCount = (await isVisible(warningTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(warningTypeComponentsPage.table);
    warningTypeUpdatePage = await warningTypeComponentsPage.goToCreateWarningType();
    await warningTypeUpdatePage.enterData();

    expect(await warningTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(warningTypeComponentsPage.table);
    await waitUntilCount(warningTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await warningTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await warningTypeComponentsPage.deleteWarningType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(warningTypeComponentsPage.records, beforeRecordsCount);
      expect(await warningTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(warningTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
