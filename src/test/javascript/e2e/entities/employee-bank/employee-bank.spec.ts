import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeBankComponentsPage from './employee-bank.page-object';
import EmployeeBankUpdatePage from './employee-bank-update.page-object';
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

describe('EmployeeBank e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeBankComponentsPage: EmployeeBankComponentsPage;
  let employeeBankUpdatePage: EmployeeBankUpdatePage;

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
    employeeBankComponentsPage = new EmployeeBankComponentsPage();
    employeeBankComponentsPage = await employeeBankComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeBanks', async () => {
    expect(await employeeBankComponentsPage.title.getText()).to.match(/Employee Banks/);
    expect(await employeeBankComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeBanks', async () => {
        const beforeRecordsCount = await isVisible(employeeBankComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeBankComponentsPage.table);
        employeeBankUpdatePage = await employeeBankComponentsPage.goToCreateEmployeeBank();
        await employeeBankUpdatePage.enterData();

        expect(await employeeBankComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeBankComponentsPage.table);
        await waitUntilCount(employeeBankComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeBankComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeBankComponentsPage.deleteEmployeeBank();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeBankComponentsPage.records, beforeRecordsCount);
          expect(await employeeBankComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeBankComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
