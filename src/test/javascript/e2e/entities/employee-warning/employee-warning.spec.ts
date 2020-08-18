import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeWarningComponentsPage from './employee-warning.page-object';
import EmployeeWarningUpdatePage from './employee-warning-update.page-object';
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

describe('EmployeeWarning e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeWarningComponentsPage: EmployeeWarningComponentsPage;
  let employeeWarningUpdatePage: EmployeeWarningUpdatePage;

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
    employeeWarningComponentsPage = new EmployeeWarningComponentsPage();
    employeeWarningComponentsPage = await employeeWarningComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeWarnings', async () => {
    expect(await employeeWarningComponentsPage.title.getText()).to.match(/Employee Warnings/);
    expect(await employeeWarningComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeWarnings', async () => {
        const beforeRecordsCount = await isVisible(employeeWarningComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeWarningComponentsPage.table);
        employeeWarningUpdatePage = await employeeWarningComponentsPage.goToCreateEmployeeWarning();
        await employeeWarningUpdatePage.enterData();

        expect(await employeeWarningComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeWarningComponentsPage.table);
        await waitUntilCount(employeeWarningComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeWarningComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeWarningComponentsPage.deleteEmployeeWarning();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeWarningComponentsPage.records, beforeRecordsCount);
          expect(await employeeWarningComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeWarningComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
