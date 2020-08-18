import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobStatusComponentsPage from './job-status.page-object';
import JobStatusUpdatePage from './job-status-update.page-object';
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

describe('JobStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobStatusComponentsPage: JobStatusComponentsPage;
  let jobStatusUpdatePage: JobStatusUpdatePage;

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
    jobStatusComponentsPage = new JobStatusComponentsPage();
    jobStatusComponentsPage = await jobStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load JobStatuses', async () => {
    expect(await jobStatusComponentsPage.title.getText()).to.match(/Job Statuses/);
    expect(await jobStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete JobStatuses', async () => {
    const beforeRecordsCount = (await isVisible(jobStatusComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(jobStatusComponentsPage.table);
    jobStatusUpdatePage = await jobStatusComponentsPage.goToCreateJobStatus();
    await jobStatusUpdatePage.enterData();

    expect(await jobStatusComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(jobStatusComponentsPage.table);
    await waitUntilCount(jobStatusComponentsPage.records, beforeRecordsCount + 1);
    expect(await jobStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await jobStatusComponentsPage.deleteJobStatus();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(jobStatusComponentsPage.records, beforeRecordsCount);
      expect(await jobStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(jobStatusComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
