import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeFamilyComponentsPage from './employee-family.page-object';
import EmployeeFamilyUpdatePage from './employee-family-update.page-object';
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

describe('EmployeeFamily e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeFamilyComponentsPage: EmployeeFamilyComponentsPage;
  let employeeFamilyUpdatePage: EmployeeFamilyUpdatePage;

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
    employeeFamilyComponentsPage = new EmployeeFamilyComponentsPage();
    employeeFamilyComponentsPage = await employeeFamilyComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeFamilies', async () => {
    expect(await employeeFamilyComponentsPage.title.getText()).to.match(/Employee Families/);
    expect(await employeeFamilyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeFamilies', async () => {
        const beforeRecordsCount = await isVisible(employeeFamilyComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeFamilyComponentsPage.table);
        employeeFamilyUpdatePage = await employeeFamilyComponentsPage.goToCreateEmployeeFamily();
        await employeeFamilyUpdatePage.enterData();

        expect(await employeeFamilyComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeFamilyComponentsPage.table);
        await waitUntilCount(employeeFamilyComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeFamilyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeFamilyComponentsPage.deleteEmployeeFamily();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeFamilyComponentsPage.records, beforeRecordsCount);
          expect(await employeeFamilyComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeFamilyComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
