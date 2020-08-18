import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UnitComponentsPage from './unit.page-object';
import UnitUpdatePage from './unit-update.page-object';
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

describe('Unit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let unitComponentsPage: UnitComponentsPage;
  let unitUpdatePage: UnitUpdatePage;

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
    unitComponentsPage = new UnitComponentsPage();
    unitComponentsPage = await unitComponentsPage.goToPage(navBarPage);
  });

  it('should load Units', async () => {
    expect(await unitComponentsPage.title.getText()).to.match(/Units/);
    expect(await unitComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Units', async () => {
    const beforeRecordsCount = (await isVisible(unitComponentsPage.noRecords)) ? 0 : await getRecordsCount(unitComponentsPage.table);
    unitUpdatePage = await unitComponentsPage.goToCreateUnit();
    await unitUpdatePage.enterData();

    expect(await unitComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(unitComponentsPage.table);
    await waitUntilCount(unitComponentsPage.records, beforeRecordsCount + 1);
    expect(await unitComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await unitComponentsPage.deleteUnit();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(unitComponentsPage.records, beforeRecordsCount);
      expect(await unitComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(unitComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
