import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LanguageProficiencyComponentsPage from './language-proficiency.page-object';
import LanguageProficiencyUpdatePage from './language-proficiency-update.page-object';
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

describe('LanguageProficiency e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let languageProficiencyComponentsPage: LanguageProficiencyComponentsPage;
  let languageProficiencyUpdatePage: LanguageProficiencyUpdatePage;

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
    languageProficiencyComponentsPage = new LanguageProficiencyComponentsPage();
    languageProficiencyComponentsPage = await languageProficiencyComponentsPage.goToPage(navBarPage);
  });

  it('should load LanguageProficiencies', async () => {
    expect(await languageProficiencyComponentsPage.title.getText()).to.match(/Language Proficiencies/);
    expect(await languageProficiencyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete LanguageProficiencies', async () => {
    const beforeRecordsCount = (await isVisible(languageProficiencyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(languageProficiencyComponentsPage.table);
    languageProficiencyUpdatePage = await languageProficiencyComponentsPage.goToCreateLanguageProficiency();
    await languageProficiencyUpdatePage.enterData();

    expect(await languageProficiencyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(languageProficiencyComponentsPage.table);
    await waitUntilCount(languageProficiencyComponentsPage.records, beforeRecordsCount + 1);
    expect(await languageProficiencyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await languageProficiencyComponentsPage.deleteLanguageProficiency();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(languageProficiencyComponentsPage.records, beforeRecordsCount);
      expect(await languageProficiencyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(languageProficiencyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
