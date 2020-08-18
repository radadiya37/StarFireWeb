import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeePassportComponentsPage from './employee-passport.page-object';
import EmployeePassportUpdatePage from './employee-passport-update.page-object';
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

describe('EmployeePassport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeePassportComponentsPage: EmployeePassportComponentsPage;
  let employeePassportUpdatePage: EmployeePassportUpdatePage;

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
    employeePassportComponentsPage = new EmployeePassportComponentsPage();
    employeePassportComponentsPage = await employeePassportComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeePassports', async () => {
    expect(await employeePassportComponentsPage.title.getText()).to.match(/Employee Passports/);
    expect(await employeePassportComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeePassports', async () => {
        const beforeRecordsCount = await isVisible(employeePassportComponentsPage.noRecords) ? 0 : await getRecordsCount(employeePassportComponentsPage.table);
        employeePassportUpdatePage = await employeePassportComponentsPage.goToCreateEmployeePassport();
        await employeePassportUpdatePage.enterData();

        expect(await employeePassportComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeePassportComponentsPage.table);
        await waitUntilCount(employeePassportComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeePassportComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeePassportComponentsPage.deleteEmployeePassport();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeePassportComponentsPage.records, beforeRecordsCount);
          expect(await employeePassportComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeePassportComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
