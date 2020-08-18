import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobLevelComponentsPage from './job-level.page-object';
import JobLevelUpdatePage from './job-level-update.page-object';
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

describe('JobLevel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobLevelComponentsPage: JobLevelComponentsPage;
  let jobLevelUpdatePage: JobLevelUpdatePage;

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
    jobLevelComponentsPage = new JobLevelComponentsPage();
    jobLevelComponentsPage = await jobLevelComponentsPage.goToPage(navBarPage);
  });

  it('should load JobLevels', async () => {
    expect(await jobLevelComponentsPage.title.getText()).to.match(/Job Levels/);
    expect(await jobLevelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete JobLevels', async () => {
    const beforeRecordsCount = (await isVisible(jobLevelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(jobLevelComponentsPage.table);
    jobLevelUpdatePage = await jobLevelComponentsPage.goToCreateJobLevel();
    await jobLevelUpdatePage.enterData();

    expect(await jobLevelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(jobLevelComponentsPage.table);
    await waitUntilCount(jobLevelComponentsPage.records, beforeRecordsCount + 1);
    expect(await jobLevelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await jobLevelComponentsPage.deleteJobLevel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(jobLevelComponentsPage.records, beforeRecordsCount);
      expect(await jobLevelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(jobLevelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
