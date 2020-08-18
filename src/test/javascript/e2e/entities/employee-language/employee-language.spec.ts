import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeLanguageComponentsPage from './employee-language.page-object';
import EmployeeLanguageUpdatePage from './employee-language-update.page-object';
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

describe('EmployeeLanguage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeLanguageComponentsPage: EmployeeLanguageComponentsPage;
  let employeeLanguageUpdatePage: EmployeeLanguageUpdatePage;

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
    employeeLanguageComponentsPage = new EmployeeLanguageComponentsPage();
    employeeLanguageComponentsPage = await employeeLanguageComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeLanguages', async () => {
    expect(await employeeLanguageComponentsPage.title.getText()).to.match(/Employee Languages/);
    expect(await employeeLanguageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeLanguages', async () => {
        const beforeRecordsCount = await isVisible(employeeLanguageComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeLanguageComponentsPage.table);
        employeeLanguageUpdatePage = await employeeLanguageComponentsPage.goToCreateEmployeeLanguage();
        await employeeLanguageUpdatePage.enterData();

        expect(await employeeLanguageComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeLanguageComponentsPage.table);
        await waitUntilCount(employeeLanguageComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeLanguageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeLanguageComponentsPage.deleteEmployeeLanguage();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeLanguageComponentsPage.records, beforeRecordsCount);
          expect(await employeeLanguageComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeLanguageComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
