import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DesignationComponentsPage from './designation.page-object';
import DesignationUpdatePage from './designation-update.page-object';
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

describe('Designation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let designationComponentsPage: DesignationComponentsPage;
  let designationUpdatePage: DesignationUpdatePage;

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
    designationComponentsPage = new DesignationComponentsPage();
    designationComponentsPage = await designationComponentsPage.goToPage(navBarPage);
  });

  it('should load Designations', async () => {
    expect(await designationComponentsPage.title.getText()).to.match(/Designations/);
    expect(await designationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Designations', async () => {
        const beforeRecordsCount = await isVisible(designationComponentsPage.noRecords) ? 0 : await getRecordsCount(designationComponentsPage.table);
        designationUpdatePage = await designationComponentsPage.goToCreateDesignation();
        await designationUpdatePage.enterData();

        expect(await designationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(designationComponentsPage.table);
        await waitUntilCount(designationComponentsPage.records, beforeRecordsCount + 1);
        expect(await designationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await designationComponentsPage.deleteDesignation();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(designationComponentsPage.records, beforeRecordsCount);
          expect(await designationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(designationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
