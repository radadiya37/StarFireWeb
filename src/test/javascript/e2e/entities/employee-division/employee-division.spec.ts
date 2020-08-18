import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeDivisionComponentsPage from './employee-division.page-object';
import EmployeeDivisionUpdatePage from './employee-division-update.page-object';
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

describe('EmployeeDivision e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeDivisionComponentsPage: EmployeeDivisionComponentsPage;
  let employeeDivisionUpdatePage: EmployeeDivisionUpdatePage;

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
    employeeDivisionComponentsPage = new EmployeeDivisionComponentsPage();
    employeeDivisionComponentsPage = await employeeDivisionComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeDivisions', async () => {
    expect(await employeeDivisionComponentsPage.title.getText()).to.match(/Employee Divisions/);
    expect(await employeeDivisionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeDivisions', async () => {
        const beforeRecordsCount = await isVisible(employeeDivisionComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeDivisionComponentsPage.table);
        employeeDivisionUpdatePage = await employeeDivisionComponentsPage.goToCreateEmployeeDivision();
        await employeeDivisionUpdatePage.enterData();

        expect(await employeeDivisionComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeDivisionComponentsPage.table);
        await waitUntilCount(employeeDivisionComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeDivisionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeDivisionComponentsPage.deleteEmployeeDivision();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeDivisionComponentsPage.records, beforeRecordsCount);
          expect(await employeeDivisionComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeDivisionComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
