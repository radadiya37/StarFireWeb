import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StateComponentsPage from './state.page-object';
import StateUpdatePage from './state-update.page-object';
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

describe('State e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stateComponentsPage: StateComponentsPage;
  let stateUpdatePage: StateUpdatePage;

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
    stateComponentsPage = new StateComponentsPage();
    stateComponentsPage = await stateComponentsPage.goToPage(navBarPage);
  });

  it('should load States', async () => {
    expect(await stateComponentsPage.title.getText()).to.match(/States/);
    expect(await stateComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete States', async () => {
    const beforeRecordsCount = (await isVisible(stateComponentsPage.noRecords)) ? 0 : await getRecordsCount(stateComponentsPage.table);
    stateUpdatePage = await stateComponentsPage.goToCreateState();
    await stateUpdatePage.enterData();

    expect(await stateComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(stateComponentsPage.table);
    await waitUntilCount(stateComponentsPage.records, beforeRecordsCount + 1);
    expect(await stateComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await stateComponentsPage.deleteState();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(stateComponentsPage.records, beforeRecordsCount);
      expect(await stateComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(stateComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
