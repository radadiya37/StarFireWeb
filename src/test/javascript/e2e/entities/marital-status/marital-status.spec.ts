import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MaritalStatusComponentsPage from './marital-status.page-object';
import MaritalStatusUpdatePage from './marital-status-update.page-object';
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

describe('MaritalStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let maritalStatusComponentsPage: MaritalStatusComponentsPage;
  let maritalStatusUpdatePage: MaritalStatusUpdatePage;

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
    maritalStatusComponentsPage = new MaritalStatusComponentsPage();
    maritalStatusComponentsPage = await maritalStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load MaritalStatuses', async () => {
    expect(await maritalStatusComponentsPage.title.getText()).to.match(/Marital Statuses/);
    expect(await maritalStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MaritalStatuses', async () => {
    const beforeRecordsCount = (await isVisible(maritalStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(maritalStatusComponentsPage.table);
    maritalStatusUpdatePage = await maritalStatusComponentsPage.goToCreateMaritalStatus();
    await maritalStatusUpdatePage.enterData();

    expect(await maritalStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(maritalStatusComponentsPage.table);
    await waitUntilCount(maritalStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await maritalStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await maritalStatusComponentsPage.deleteMaritalStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(maritalStatusComponentsPage.records, beforeRecordsCount);
      expect(await maritalStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(maritalStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
