import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PersonalRelationshipComponentsPage from './personal-relationship.page-object';
import PersonalRelationshipUpdatePage from './personal-relationship-update.page-object';
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

describe('PersonalRelationship e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personalRelationshipComponentsPage: PersonalRelationshipComponentsPage;
  let personalRelationshipUpdatePage: PersonalRelationshipUpdatePage;

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
    personalRelationshipComponentsPage = new PersonalRelationshipComponentsPage();
    personalRelationshipComponentsPage = await personalRelationshipComponentsPage.goToPage(navBarPage);
  });

  it('should load PersonalRelationships', async () => {
    expect(await personalRelationshipComponentsPage.title.getText()).to.match(/Personal Relationships/);
    expect(await personalRelationshipComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PersonalRelationships', async () => {
    const beforeRecordsCount = (await isVisible(personalRelationshipComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(personalRelationshipComponentsPage.table);
    personalRelationshipUpdatePage = await personalRelationshipComponentsPage.goToCreatePersonalRelationship();
    await personalRelationshipUpdatePage.enterData();

    expect(await personalRelationshipComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(personalRelationshipComponentsPage.table);
    await waitUntilCount(personalRelationshipComponentsPage.records, beforeRecordsCount + 1);
    expect(await personalRelationshipComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await personalRelationshipComponentsPage.deletePersonalRelationship();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(personalRelationshipComponentsPage.records, beforeRecordsCount);
      expect(await personalRelationshipComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(personalRelationshipComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
