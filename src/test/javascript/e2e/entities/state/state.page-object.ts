import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import StateUpdatePage from './state-update.page-object';

const expect = chai.expect;
export class StateDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.state.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-state'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class StateComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('state-heading'));
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
    await navBarPage.getEntityPage('state');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateState() {
    await this.createButton.click();
    return new StateUpdatePage();
  }

  async deleteState() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const stateDeleteDialog = new StateDeleteDialog();
    await waitUntilDisplayed(stateDeleteDialog.deleteModal);
    expect(await stateDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.state.delete.question/);
    await stateDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(stateDeleteDialog.deleteModal);

    expect(await isVisible(stateDeleteDialog.deleteModal)).to.be.false;
  }
}
