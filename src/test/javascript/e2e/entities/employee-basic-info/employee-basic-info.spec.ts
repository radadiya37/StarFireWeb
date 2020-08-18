import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeBasicInfoComponentsPage from './employee-basic-info.page-object';
import EmployeeBasicInfoUpdatePage from './employee-basic-info-update.page-object';
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

describe('EmployeeBasicInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeBasicInfoComponentsPage: EmployeeBasicInfoComponentsPage;
  let employeeBasicInfoUpdatePage: EmployeeBasicInfoUpdatePage;

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
    employeeBasicInfoComponentsPage = new EmployeeBasicInfoComponentsPage();
    employeeBasicInfoComponentsPage = await employeeBasicInfoComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeBasicInfos', async () => {
    expect(await employeeBasicInfoComponentsPage.title.getText()).to.match(/Employee Basic Infos/);
    expect(await employeeBasicInfoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeBasicInfos', async () => {
        const beforeRecordsCount = await isVisible(employeeBasicInfoComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeBasicInfoComponentsPage.table);
        employeeBasicInfoUpdatePage = await employeeBasicInfoComponentsPage.goToCreateEmployeeBasicInfo();
        await employeeBasicInfoUpdatePage.enterData();

        expect(await employeeBasicInfoComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeBasicInfoComponentsPage.table);
        await waitUntilCount(employeeBasicInfoComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeBasicInfoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeBasicInfoComponentsPage.deleteEmployeeBasicInfo();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeBasicInfoComponentsPage.records, beforeRecordsCount);
          expect(await employeeBasicInfoComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeBasicInfoComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
