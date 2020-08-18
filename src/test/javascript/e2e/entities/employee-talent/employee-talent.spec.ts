import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeTalentComponentsPage from './employee-talent.page-object';
import EmployeeTalentUpdatePage from './employee-talent-update.page-object';
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

describe('EmployeeTalent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeTalentComponentsPage: EmployeeTalentComponentsPage;
  let employeeTalentUpdatePage: EmployeeTalentUpdatePage;

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
    employeeTalentComponentsPage = new EmployeeTalentComponentsPage();
    employeeTalentComponentsPage = await employeeTalentComponentsPage.goToPage(navBarPage);
  });

  it('should load EmployeeTalents', async () => {
    expect(await employeeTalentComponentsPage.title.getText()).to.match(/Employee Talents/);
    expect(await employeeTalentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete EmployeeTalents', async () => {
        const beforeRecordsCount = await isVisible(employeeTalentComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeTalentComponentsPage.table);
        employeeTalentUpdatePage = await employeeTalentComponentsPage.goToCreateEmployeeTalent();
        await employeeTalentUpdatePage.enterData();

        expect(await employeeTalentComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(employeeTalentComponentsPage.table);
        await waitUntilCount(employeeTalentComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeTalentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await employeeTalentComponentsPage.deleteEmployeeTalent();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(employeeTalentComponentsPage.records, beforeRecordsCount);
          expect(await employeeTalentComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(employeeTalentComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
