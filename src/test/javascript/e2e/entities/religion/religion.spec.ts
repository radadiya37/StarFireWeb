import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReligionComponentsPage from './religion.page-object';
import ReligionUpdatePage from './religion-update.page-object';
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

describe('Religion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let religionComponentsPage: ReligionComponentsPage;
  let religionUpdatePage: ReligionUpdatePage;

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
    religionComponentsPage = new ReligionComponentsPage();
    religionComponentsPage = await religionComponentsPage.goToPage(navBarPage);
  });

  it('should load Religions', async () => {
    expect(await religionComponentsPage.title.getText()).to.match(/Religions/);
    expect(await religionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Religions', async () => {
    const beforeRecordsCount = (await isVisible(religionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(religionComponentsPage.table);
    religionUpdatePage = await religionComponentsPage.goToCreateReligion();
    await religionUpdatePage.enterData();

    expect(await religionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(religionComponentsPage.table);
    await waitUntilCount(religionComponentsPage.records, beforeRecordsCount + 1);
    expect(await religionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await religionComponentsPage.deleteReligion();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(religionComponentsPage.records, beforeRecordsCount);
      expect(await religionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(religionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
