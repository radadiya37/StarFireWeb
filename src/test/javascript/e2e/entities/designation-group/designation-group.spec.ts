import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DesignationGroupComponentsPage from './designation-group.page-object';
import DesignationGroupUpdatePage from './designation-group-update.page-object';
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

describe('DesignationGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let designationGroupComponentsPage: DesignationGroupComponentsPage;
  let designationGroupUpdatePage: DesignationGroupUpdatePage;

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
    designationGroupComponentsPage = new DesignationGroupComponentsPage();
    designationGroupComponentsPage = await designationGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load DesignationGroups', async () => {
    expect(await designationGroupComponentsPage.title.getText()).to.match(/Designation Groups/);
    expect(await designationGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete DesignationGroups', async () => {
    const beforeRecordsCount = (await isVisible(designationGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(designationGroupComponentsPage.table);
    designationGroupUpdatePage = await designationGroupComponentsPage.goToCreateDesignationGroup();
    await designationGroupUpdatePage.enterData();

    expect(await designationGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(designationGroupComponentsPage.table);
    await waitUntilCount(designationGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await designationGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await designationGroupComponentsPage.deleteDesignationGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(designationGroupComponentsPage.records, beforeRecordsCount);
      expect(await designationGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(designationGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
