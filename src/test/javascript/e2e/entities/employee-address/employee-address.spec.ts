import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeAddressComponentsPage from './employee-address.page-object';
import EmployeeAddressUpdatePage from './employee-address-update.page-object';
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

describe('EmployeeAddress e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeAddressComponentsPage: EmployeeAddressComponentsPage;
  let employeeAddressUpdatePage: EmployeeAddressUpdatePage;

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
    employeeAddressComponentsPage = new EmployeeAddressComponentsPage();
    employeeAddressComponentsPage = await employeeAddressComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeAddresses', async () => {
    expect(await employeeAddressComponentsPage.title.getText()).to.match(/Employee Addresses/);
    expect(await employeeAddressComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeAddresses', async () => {
        const beforeRecordsCount = await isVisible(employeeAddressComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeAddressComponentsPage.table);
        employeeAddressUpdatePage = await employeeAddressComponentsPage.goToCreateEmployeeAddress();
        await employeeAddressUpdatePage.enterData();

        expect(await employeeAddressComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeAddressComponentsPage.table);
        await waitUntilCount(employeeAddressComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeAddressComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeAddressComponentsPage.deleteEmployeeAddress();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeAddressComponentsPage.records, beforeRecordsCount);
          expect(await employeeAddressComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeAddressComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
