import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobBaseComponentsPage from './job-base.page-object';
import JobBaseUpdatePage from './job-base-update.page-object';
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

describe('JobBase e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobBaseComponentsPage: JobBaseComponentsPage;
  let jobBaseUpdatePage: JobBaseUpdatePage;

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
    jobBaseComponentsPage = new JobBaseComponentsPage();
    jobBaseComponentsPage = await jobBaseComponentsPage.goToPage(navBarPage);
  });

  it('should load JobBases', async () => {
    expect(await jobBaseComponentsPage.title.getText()).to.match(/Job Bases/);
    expect(await jobBaseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete JobBases', async () => {
    const beforeRecordsCount = (await isVisible(jobBaseComponentsPage.noRecords)) ? 0 : await getRecordsCount(jobBaseComponentsPage.table);
    jobBaseUpdatePage = await jobBaseComponentsPage.goToCreateJobBase();
    await jobBaseUpdatePage.enterData();

    expect(await jobBaseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(jobBaseComponentsPage.table);
    await waitUntilCount(jobBaseComponentsPage.records, beforeRecordsCount + 1);
    expect(await jobBaseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await jobBaseComponentsPage.deleteJobBase();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(jobBaseComponentsPage.records, beforeRecordsCount);
      expect(await jobBaseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(jobBaseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
