import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BloodGroupComponentsPage from './blood-group.page-object';
import BloodGroupUpdatePage from './blood-group-update.page-object';
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

describe('BloodGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bloodGroupComponentsPage: BloodGroupComponentsPage;
  let bloodGroupUpdatePage: BloodGroupUpdatePage;

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
    bloodGroupComponentsPage = new BloodGroupComponentsPage();
    bloodGroupComponentsPage = await bloodGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load BloodGroups', async () => {
    expect(await bloodGroupComponentsPage.title.getText()).to.match(/Blood Groups/);
    expect(await bloodGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BloodGroups', async () => {
    const beforeRecordsCount = (await isVisible(bloodGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bloodGroupComponentsPage.table);
    bloodGroupUpdatePage = await bloodGroupComponentsPage.goToCreateBloodGroup();
    await bloodGroupUpdatePage.enterData();

    expect(await bloodGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bloodGroupComponentsPage.table);
    await waitUntilCount(bloodGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await bloodGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bloodGroupComponentsPage.deleteBloodGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bloodGroupComponentsPage.records, beforeRecordsCount);
      expect(await bloodGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bloodGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
