import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompanyBankComponentsPage from './company-bank.page-object';
import CompanyBankUpdatePage from './company-bank-update.page-object';
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

describe('CompanyBank e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let companyBankComponentsPage: CompanyBankComponentsPage;
  let companyBankUpdatePage: CompanyBankUpdatePage;

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
    companyBankComponentsPage = new CompanyBankComponentsPage();
    companyBankComponentsPage = await companyBankComponentsPage.goToPage(navBarPage);
  });

  it('should load CompanyBanks', async () => {
    expect(await companyBankComponentsPage.title.getText()).to.match(/Company Banks/);
    expect(await companyBankComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete CompanyBanks', async () => {
    const beforeRecordsCount = (await isVisible(companyBankComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(companyBankComponentsPage.table);
    companyBankUpdatePage = await companyBankComponentsPage.goToCreateCompanyBank();
    await companyBankUpdatePage.enterData();

    expect(await companyBankComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(companyBankComponentsPage.table);
    await waitUntilCount(companyBankComponentsPage.records, beforeRecordsCount + 1);
    expect(await companyBankComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await companyBankComponentsPage.deleteCompanyBank();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(companyBankComponentsPage.records, beforeRecordsCount);
      expect(await companyBankComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(companyBankComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
