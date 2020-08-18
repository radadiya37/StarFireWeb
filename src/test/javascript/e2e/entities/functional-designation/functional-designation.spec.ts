import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FunctionalDesignationComponentsPage from './functional-designation.page-object';
import FunctionalDesignationUpdatePage from './functional-designation-update.page-object';
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

describe('FunctionalDesignation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let functionalDesignationComponentsPage: FunctionalDesignationComponentsPage;
  let functionalDesignationUpdatePage: FunctionalDesignationUpdatePage;

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
    functionalDesignationComponentsPage = new FunctionalDesignationComponentsPage();
    functionalDesignationComponentsPage = await functionalDesignationComponentsPage.goToPage(navBarPage);
  });

  it('should load FunctionalDesignations', async () => {
    expect(await functionalDesignationComponentsPage.title.getText()).to.match(/Functional Designations/);
    expect(await functionalDesignationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FunctionalDesignations', async () => {
    const beforeRecordsCount = (await isVisible(functionalDesignationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(functionalDesignationComponentsPage.table);
    functionalDesignationUpdatePage = await functionalDesignationComponentsPage.goToCreateFunctionalDesignation();
    await functionalDesignationUpdatePage.enterData();

    expect(await functionalDesignationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(functionalDesignationComponentsPage.table);
    await waitUntilCount(functionalDesignationComponentsPage.records, beforeRecordsCount + 1);
    expect(await functionalDesignationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await functionalDesignationComponentsPage.deleteFunctionalDesignation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(functionalDesignationComponentsPage.records, beforeRecordsCount);
      expect(await functionalDesignationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(functionalDesignationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
