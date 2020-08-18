import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MaritalStatusUpdatePage from './marital-status-update.page-object';

const expect = chai.expect;
export class MaritalStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.maritalStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-maritalStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MaritalStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('marital-status-heading'));
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
    await navBarPage.getEntityPage('marital-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMaritalStatus() {
    await this.createButton.click();
    return new MaritalStatusUpdatePage();
  }

  async deleteMaritalStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const maritalStatusDeleteDialog = new MaritalStatusDeleteDialog();
    await waitUntilDisplayed(maritalStatusDeleteDialog.deleteModal);
    expect(await maritalStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.maritalStatus.delete.question/);
    await maritalStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(maritalStatusDeleteDialog.deleteModal);

    expect(await isVisible(maritalStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
