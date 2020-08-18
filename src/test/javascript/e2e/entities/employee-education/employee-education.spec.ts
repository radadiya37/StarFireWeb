import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeEducationComponentsPage from './employee-education.page-object';
import EmployeeEducationUpdatePage from './employee-education-update.page-object';
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

describe('EmployeeEducation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeEducationComponentsPage: EmployeeEducationComponentsPage;
  let employeeEducationUpdatePage: EmployeeEducationUpdatePage;

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
    employeeEducationComponentsPage = new EmployeeEducationComponentsPage();
    employeeEducationComponentsPage = await employeeEducationComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeEducations', async () => {
    expect(await employeeEducationComponentsPage.title.getText()).to.match(/Employee Educations/);
    expect(await employeeEducationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeEducations', async () => {
        const beforeRecordsCount = await isVisible(employeeEducationComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeEducationComponentsPage.table);
        employeeEducationUpdatePage = await employeeEducationComponentsPage.goToCreateEmployeeEducation();
        await employeeEducationUpdatePage.enterData();

        expect(await employeeEducationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeEducationComponentsPage.table);
        await waitUntilCount(employeeEducationComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeEducationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeEducationComponentsPage.deleteEmployeeEducation();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeEducationComponentsPage.records, beforeRecordsCount);
          expect(await employeeEducationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeEducationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
