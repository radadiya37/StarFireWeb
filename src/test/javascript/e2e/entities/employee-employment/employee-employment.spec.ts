import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeEmploymentComponentsPage from './employee-employment.page-object';
import EmployeeEmploymentUpdatePage from './employee-employment-update.page-object';
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

describe('EmployeeEmployment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeEmploymentComponentsPage: EmployeeEmploymentComponentsPage;
  let employeeEmploymentUpdatePage: EmployeeEmploymentUpdatePage;

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
    employeeEmploymentComponentsPage = new EmployeeEmploymentComponentsPage();
    employeeEmploymentComponentsPage = await employeeEmploymentComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeEmployments', async () => {
    expect(await employeeEmploymentComponentsPage.title.getText()).to.match(/Employee Employments/);
    expect(await employeeEmploymentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeEmployments', async () => {
        const beforeRecordsCount = await isVisible(employeeEmploymentComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeEmploymentComponentsPage.table);
        employeeEmploymentUpdatePage = await employeeEmploymentComponentsPage.goToCreateEmployeeEmployment();
        await employeeEmploymentUpdatePage.enterData();

        expect(await employeeEmploymentComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeEmploymentComponentsPage.table);
        await waitUntilCount(employeeEmploymentComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeEmploymentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeEmploymentComponentsPage.deleteEmployeeEmployment();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeEmploymentComponentsPage.records, beforeRecordsCount);
          expect(await employeeEmploymentComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeEmploymentComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
