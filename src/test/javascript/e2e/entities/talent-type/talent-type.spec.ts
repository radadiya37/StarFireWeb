import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TalentTypeComponentsPage from './talent-type.page-object';
import TalentTypeUpdatePage from './talent-type-update.page-object';
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

describe('TalentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let talentTypeComponentsPage: TalentTypeComponentsPage;
  let talentTypeUpdatePage: TalentTypeUpdatePage;

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
    talentTypeComponentsPage = new TalentTypeComponentsPage();
    talentTypeComponentsPage = await talentTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load TalentTypes', async () => {
    expect(await talentTypeComponentsPage.title.getText()).to.match(/Talent Types/);
    expect(await talentTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TalentTypes', async () => {
    const beforeRecordsCount = (await isVisible(talentTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(talentTypeComponentsPage.table);
    talentTypeUpdatePage = await talentTypeComponentsPage.goToCreateTalentType();
    await talentTypeUpdatePage.enterData();

    expect(await talentTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(talentTypeComponentsPage.table);
    await waitUntilCount(talentTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await talentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await talentTypeComponentsPage.deleteTalentType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(talentTypeComponentsPage.records, beforeRecordsCount);
      expect(await talentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(talentTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
