import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WarningTypeUpdatePage from './warning-type-update.page-object';

const expect = chai.expect;
export class WarningTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.warningType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-warningType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WarningTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('warning-type-heading'));
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
    await navBarPage.getEntityPage('warning-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWarningType() {
    await this.createButton.click();
    return new WarningTypeUpdatePage();
  }

  async deleteWarningType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const warningTypeDeleteDialog = new WarningTypeDeleteDialog();
    await waitUntilDisplayed(warningTypeDeleteDialog.deleteModal);
    expect(await warningTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.warningType.delete.question/);
    await warningTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(warningTypeDeleteDialog.deleteModal);

    expect(await isVisible(warningTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
