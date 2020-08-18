import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DivisionComponentsPage from './division.page-object';
import DivisionUpdatePage from './division-update.page-object';
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

describe('Division e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let divisionComponentsPage: DivisionComponentsPage;
  let divisionUpdatePage: DivisionUpdatePage;

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
    divisionComponentsPage = new DivisionComponentsPage();
    divisionComponentsPage = await divisionComponentsPage.goToPage(navBarPage);
  });

  it('should load Divisions', async () => {
    expect(await divisionComponentsPage.title.getText()).to.match(/Divisions/);
    expect(await divisionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Divisions', async () => {
    const beforeRecordsCount = (await isVisible(divisionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(divisionComponentsPage.table);
    divisionUpdatePage = await divisionComponentsPage.goToCreateDivision();
    await divisionUpdatePage.enterData();

    expect(await divisionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(divisionComponentsPage.table);
    await waitUntilCount(divisionComponentsPage.records, beforeRecordsCount + 1);
    expect(await divisionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await divisionComponentsPage.deleteDivision();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(divisionComponentsPage.records, beforeRecordsCount);
      expect(await divisionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(divisionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
