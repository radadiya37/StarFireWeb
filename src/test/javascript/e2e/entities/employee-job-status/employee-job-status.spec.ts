import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeJobStatusComponentsPage from './employee-job-status.page-object';
import EmployeeJobStatusUpdatePage from './employee-job-status-update.page-object';
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

describe('EmployeeJobStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeJobStatusComponentsPage: EmployeeJobStatusComponentsPage;
  let employeeJobStatusUpdatePage: EmployeeJobStatusUpdatePage;

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
    employeeJobStatusComponentsPage = new EmployeeJobStatusComponentsPage();
    employeeJobStatusComponentsPage = await employeeJobStatusComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeJobStatuses', async () => {
    expect(await employeeJobStatusComponentsPage.title.getText()).to.match(/Employee Job Statuses/);
    expect(await employeeJobStatusComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeJobStatuses', async () => {
        const beforeRecordsCount = await isVisible(employeeJobStatusComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeJobStatusComponentsPage.table);
        employeeJobStatusUpdatePage = await employeeJobStatusComponentsPage.goToCreateEmployeeJobStatus();
        await employeeJobStatusUpdatePage.enterData();

        expect(await employeeJobStatusComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeJobStatusComponentsPage.table);
        await waitUntilCount(employeeJobStatusComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeJobStatusComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeJobStatusComponentsPage.deleteEmployeeJobStatus();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeJobStatusComponentsPage.records, beforeRecordsCount);
          expect(await employeeJobStatusComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeJobStatusComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
