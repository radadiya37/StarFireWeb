import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeSupervisorComponentsPage from './employee-supervisor.page-object';
import EmployeeSupervisorUpdatePage from './employee-supervisor-update.page-object';
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

describe('EmployeeSupervisor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeSupervisorComponentsPage: EmployeeSupervisorComponentsPage;
  let employeeSupervisorUpdatePage: EmployeeSupervisorUpdatePage;

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
    employeeSupervisorComponentsPage = new EmployeeSupervisorComponentsPage();
    employeeSupervisorComponentsPage = await employeeSupervisorComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeSupervisors', async () => {
    expect(await employeeSupervisorComponentsPage.title.getText()).to.match(/Employee Supervisors/);
    expect(await employeeSupervisorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeSupervisors', async () => {
        const beforeRecordsCount = await isVisible(employeeSupervisorComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeSupervisorComponentsPage.table);
        employeeSupervisorUpdatePage = await employeeSupervisorComponentsPage.goToCreateEmployeeSupervisor();
        await employeeSupervisorUpdatePage.enterData();

        expect(await employeeSupervisorComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeSupervisorComponentsPage.table);
        await waitUntilCount(employeeSupervisorComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeSupervisorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeSupervisorComponentsPage.deleteEmployeeSupervisor();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeSupervisorComponentsPage.records, beforeRecordsCount);
          expect(await employeeSupervisorComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeSupervisorComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
