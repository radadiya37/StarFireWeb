import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EducationComponentsPage from './education.page-object';
import EducationUpdatePage from './education-update.page-object';
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

describe('Education e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationComponentsPage: EducationComponentsPage;
  let educationUpdatePage: EducationUpdatePage;

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
    educationComponentsPage = new EducationComponentsPage();
    educationComponentsPage = await educationComponentsPage.goToPage(navBarPage);
  });

  it('should load Educations', async () => {
    expect(await educationComponentsPage.title.getText()).to.match(/Educations/);
    expect(await educationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Educations', async () => {
    const beforeRecordsCount = (await isVisible(educationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(educationComponentsPage.table);
    educationUpdatePage = await educationComponentsPage.goToCreateEducation();
    await educationUpdatePage.enterData();

    expect(await educationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(educationComponentsPage.table);
    await waitUntilCount(educationComponentsPage.records, beforeRecordsCount + 1);
    expect(await educationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await educationComponentsPage.deleteEducation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(educationComponentsPage.records, beforeRecordsCount);
      expect(await educationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(educationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
