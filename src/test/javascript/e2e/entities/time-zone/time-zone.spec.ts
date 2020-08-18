import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TimeZoneComponentsPage from './time-zone.page-object';
import TimeZoneUpdatePage from './time-zone-update.page-object';
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

describe('TimeZone e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let timeZoneComponentsPage: TimeZoneComponentsPage;
  let timeZoneUpdatePage: TimeZoneUpdatePage;

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
    timeZoneComponentsPage = new TimeZoneComponentsPage();
    timeZoneComponentsPage = await timeZoneComponentsPage.goToPage(navBarPage);
  });

  it('should load TimeZones', async () => {
    expect(await timeZoneComponentsPage.title.getText()).to.match(/Time Zones/);
    expect(await timeZoneComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TimeZones', async () => {
    const beforeRecordsCount = (await isVisible(timeZoneComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(timeZoneComponentsPage.table);
    timeZoneUpdatePage = await timeZoneComponentsPage.goToCreateTimeZone();
    await timeZoneUpdatePage.enterData();

    expect(await timeZoneComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(timeZoneComponentsPage.table);
    await waitUntilCount(timeZoneComponentsPage.records, beforeRecordsCount + 1);
    expect(await timeZoneComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await timeZoneComponentsPage.deleteTimeZone();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(timeZoneComponentsPage.records, beforeRecordsCount);
      expect(await timeZoneComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(timeZoneComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
