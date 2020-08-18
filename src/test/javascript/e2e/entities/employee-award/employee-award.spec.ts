import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeAwardComponentsPage from './employee-award.page-object';
import EmployeeAwardUpdatePage from './employee-award-update.page-object';
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

describe('EmployeeAward e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeAwardComponentsPage: EmployeeAwardComponentsPage;
  let employeeAwardUpdatePage: EmployeeAwardUpdatePage;

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
    employeeAwardComponentsPage = new EmployeeAwardComponentsPage();
    employeeAwardComponentsPage = await employeeAwardComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeAwards', async () => {
    expect(await employeeAwardComponentsPage.title.getText()).to.match(/Employee Awards/);
    expect(await employeeAwardComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeAwards', async () => {
        const beforeRecordsCount = await isVisible(employeeAwardComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeAwardComponentsPage.table);
        employeeAwardUpdatePage = await employeeAwardComponentsPage.goToCreateEmployeeAward();
        await employeeAwardUpdatePage.enterData();

        expect(await employeeAwardComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeAwardComponentsPage.table);
        await waitUntilCount(employeeAwardComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeAwardComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeAwardComponentsPage.deleteEmployeeAward();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeAwardComponentsPage.records, beforeRecordsCount);
          expect(await employeeAwardComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeAwardComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
