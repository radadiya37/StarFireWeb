import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EducationGroupComponentsPage from './education-group.page-object';
import EducationGroupUpdatePage from './education-group-update.page-object';
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

describe('EducationGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationGroupComponentsPage: EducationGroupComponentsPage;
  let educationGroupUpdatePage: EducationGroupUpdatePage;

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
    educationGroupComponentsPage = new EducationGroupComponentsPage();
    educationGroupComponentsPage = await educationGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load EducationGroups', async () => {
    expect(await educationGroupComponentsPage.title.getText()).to.match(/Education Groups/);
    expect(await educationGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EducationGroups', async () => {
    const beforeRecordsCount = (await isVisible(educationGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(educationGroupComponentsPage.table);
    educationGroupUpdatePage = await educationGroupComponentsPage.goToCreateEducationGroup();
    await educationGroupUpdatePage.enterData();

    expect(await educationGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(educationGroupComponentsPage.table);
    await waitUntilCount(educationGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await educationGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await educationGroupComponentsPage.deleteEducationGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(educationGroupComponentsPage.records, beforeRecordsCount);
      expect(await educationGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(educationGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
