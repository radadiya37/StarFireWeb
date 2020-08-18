import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DocumentCategoryComponentsPage from './document-category.page-object';
import DocumentCategoryUpdatePage from './document-category-update.page-object';
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

describe('DocumentCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentCategoryComponentsPage: DocumentCategoryComponentsPage;
  let documentCategoryUpdatePage: DocumentCategoryUpdatePage;

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
    documentCategoryComponentsPage = new DocumentCategoryComponentsPage();
    documentCategoryComponentsPage = await documentCategoryComponentsPage.goToPage(navBarPage);
  });

  it('should load DocumentCategories', async () => {
    expect(await documentCategoryComponentsPage.title.getText()).to.match(/Document Categories/);
    expect(await documentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete DocumentCategories', async () => {
    const beforeRecordsCount = (await isVisible(documentCategoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(documentCategoryComponentsPage.table);
    documentCategoryUpdatePage = await documentCategoryComponentsPage.goToCreateDocumentCategory();
    await documentCategoryUpdatePage.enterData();

    expect(await documentCategoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(documentCategoryComponentsPage.table);
    await waitUntilCount(documentCategoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await documentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await documentCategoryComponentsPage.deleteDocumentCategory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(documentCategoryComponentsPage.records, beforeRecordsCount);
      expect(await documentCategoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(documentCategoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
