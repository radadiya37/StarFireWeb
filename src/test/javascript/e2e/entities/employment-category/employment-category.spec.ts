import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmploymentCategoryComponentsPage from './employment-category.page-object';
import EmploymentCategoryUpdatePage from './employment-category-update.page-object';
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

describe('EmploymentCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employmentCategoryComponentsPage: EmploymentCategoryComponentsPage;
  let employmentCategoryUpdatePage: EmploymentCategoryUpdatePage;

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
    employmentCategoryComponentsPage = new EmploymentCategoryComponentsPage();
    employmentCategoryComponentsPage = await employmentCategoryComponentsPage.goToPage(navBarPage);
  });

  it('should load EmploymentCategories', async () => {
    expect(await employmentCategoryComponentsPage.title.getText()).to.match(/Employment Categories/);
    expect(await employmentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EmploymentCategories', async () => {
    const beforeRecordsCount = (await isVisible(employmentCategoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(employmentCategoryComponentsPage.table);
    employmentCategoryUpdatePage = await employmentCategoryComponentsPage.goToCreateEmploymentCategory();
    await employmentCategoryUpdatePage.enterData();

    expect(await employmentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(employmentCategoryComponentsPage.table);
    await waitUntilCount(employmentCategoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await employmentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await employmentCategoryComponentsPage.deleteEmploymentCategory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(employmentCategoryComponentsPage.records, beforeRecordsCount);
      expect(await employmentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(employmentCategoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
