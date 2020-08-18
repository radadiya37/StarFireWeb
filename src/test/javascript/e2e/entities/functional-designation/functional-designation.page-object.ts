import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FunctionalDesignationUpdatePage from './functional-designation-update.page-object';

const expect = chai.expect;
export class FunctionalDesignationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.functionalDesignation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-functionalDesignation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FunctionalDesignationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('functional-designation-heading'));
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
    await navBarPage.getEntityPage('functional-designation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFunctionalDesignation() {
    await this.createButton.click();
    return new FunctionalDesignationUpdatePage();
  }

  async deleteFunctionalDesignation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const functionalDesignationDeleteDialog = new FunctionalDesignationDeleteDialog();
    await waitUntilDisplayed(functionalDesignationDeleteDialog.deleteModal);
    expect(await functionalDesignationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.functionalDesignation.delete.question/
    );
    await functionalDesignationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(functionalDesignationDeleteDialog.deleteModal);

    expect(await isVisible(functionalDesignationDeleteDialog.deleteModal)).to.be.false;
  }
}
