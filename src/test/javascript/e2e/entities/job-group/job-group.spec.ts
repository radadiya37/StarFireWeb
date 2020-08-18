import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobGroupComponentsPage from './job-group.page-object';
import JobGroupUpdatePage from './job-group-update.page-object';
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

describe('JobGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobGroupComponentsPage: JobGroupComponentsPage;
  let jobGroupUpdatePage: JobGroupUpdatePage;

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
    jobGroupComponentsPage = new JobGroupComponentsPage();
    jobGroupComponentsPage = await jobGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load JobGroups', async () => {
    expect(await jobGroupComponentsPage.title.getText()).to.match(/Job Groups/);
    expect(await jobGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete JobGroups', async () => {
    const beforeRecordsCount = (await isVisible(jobGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(jobGroupComponentsPage.table);
    jobGroupUpdatePage = await jobGroupComponentsPage.goToCreateJobGroup();
    await jobGroupUpdatePage.enterData();

    expect(await jobGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(jobGroupComponentsPage.table);
    await waitUntilCount(jobGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await jobGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await jobGroupComponentsPage.deleteJobGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(jobGroupComponentsPage.records, beforeRecordsCount);
      expect(await jobGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(jobGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
