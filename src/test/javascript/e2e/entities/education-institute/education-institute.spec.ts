import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EducationInstituteComponentsPage from './education-institute.page-object';
import EducationInstituteUpdatePage from './education-institute-update.page-object';
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

describe('EducationInstitute e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationInstituteComponentsPage: EducationInstituteComponentsPage;
  let educationInstituteUpdatePage: EducationInstituteUpdatePage;

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
    educationInstituteComponentsPage = new EducationInstituteComponentsPage();
    educationInstituteComponentsPage = await educationInstituteComponentsPage.goToPage(navBarPage);
  });

  it('should load EducationInstitutes', async () => {
    expect(await educationInstituteComponentsPage.title.getText()).to.match(/Education Institutes/);
    expect(await educationInstituteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EducationInstitutes', async () => {
    const beforeRecordsCount = (await isVisible(educationInstituteComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(educationInstituteComponentsPage.table);
    educationInstituteUpdatePage = await educationInstituteComponentsPage.goToCreateEducationInstitute();
    await educationInstituteUpdatePage.enterData();

    expect(await educationInstituteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(educationInstituteComponentsPage.table);
    await waitUntilCount(educationInstituteComponentsPage.records, beforeRecordsCount + 1);
    expect(await educationInstituteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await educationInstituteComponentsPage.deleteEducationInstitute();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(educationInstituteComponentsPage.records, beforeRecordsCount);
      expect(await educationInstituteComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(educationInstituteComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
