import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DocumentCategoryUpdatePage from './document-category-update.page-object';

const expect = chai.expect;
export class DocumentCategoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.documentCategory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-documentCategory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DocumentCategoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('document-category-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('document-category');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDocumentCategory() {
    await this.createButton.click();
    return new DocumentCategoryUpdatePage();
  }

  async deleteDocumentCategory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const documentCategoryDeleteDialog = new DocumentCategoryDeleteDialog();
    await waitUntilDisplayed(documentCategoryDeleteDialog.deleteModal);
    expect(await documentCategoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.documentCategory.delete.question/
    );
    await documentCategoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(documentCategoryDeleteDialog.deleteModal);

    expect(await isVisible(documentCategoryDeleteDialog.deleteModal)).to.be.false;
  }
}
