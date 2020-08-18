import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AwardTypeComponentsPage from './award-type.page-object';
import AwardTypeUpdatePage from './award-type-update.page-object';
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

describe('AwardType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let awardTypeComponentsPage: AwardTypeComponentsPage;
  let awardTypeUpdatePage: AwardTypeUpdatePage;

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
    awardTypeComponentsPage = new AwardTypeComponentsPage();
    awardTypeComponentsPage = await awardTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load AwardTypes', async () => {
    expect(await awardTypeComponentsPage.title.getText()).to.match(/Award Types/);
    expect(await awardTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AwardTypes', async () => {
    const beforeRecordsCount = (await isVisible(awardTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(awardTypeComponentsPage.table);
    awardTypeUpdatePage = await awardTypeComponentsPage.goToCreateAwardType();
    await awardTypeUpdatePage.enterData();

    expect(await awardTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(awardTypeComponentsPage.table);
    await waitUntilCount(awardTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await awardTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await awardTypeComponentsPage.deleteAwardType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(awardTypeComponentsPage.records, beforeRecordsCount);
      expect(await awardTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(awardTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
