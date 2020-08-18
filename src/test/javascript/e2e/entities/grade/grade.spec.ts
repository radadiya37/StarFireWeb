import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GradeComponentsPage from './grade.page-object';
import GradeUpdatePage from './grade-update.page-object';
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

describe('Grade e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gradeComponentsPage: GradeComponentsPage;
  let gradeUpdatePage: GradeUpdatePage;

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
    gradeComponentsPage = new GradeComponentsPage();
    gradeComponentsPage = await gradeComponentsPage.goToPage(navBarPage);
  });

  it('should load Grades', async () => {
    expect(await gradeComponentsPage.title.getText()).to.match(/Grades/);
    expect(await gradeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Grades', async () => {
    const beforeRecordsCount = (await isVisible(gradeComponentsPage.noRecords)) ? 0 : await getRecordsCount(gradeComponentsPage.table);
    gradeUpdatePage = await gradeComponentsPage.goToCreateGrade();
    await gradeUpdatePage.enterData();

    expect(await gradeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(gradeComponentsPage.table);
    await waitUntilCount(gradeComponentsPage.records, beforeRecordsCount + 1);
    expect(await gradeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await gradeComponentsPage.deleteGrade();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(gradeComponentsPage.records, beforeRecordsCount);
      expect(await gradeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(gradeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
