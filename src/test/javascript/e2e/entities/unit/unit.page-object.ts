import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UnitUpdatePage from './unit-update.page-object';

const expect = chai.expect;
export class UnitDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.unit.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-unit'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UnitComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('unit-heading'));
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
    await navBarPage.getEntityPage('unit');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUnit() {
    await this.createButton.click();
    return new UnitUpdatePage();
  }

  async deleteUnit() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const unitDeleteDialog = new UnitDeleteDialog();
    await waitUntilDisplayed(unitDeleteDialog.deleteModal);
    expect(await unitDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.unit.delete.question/);
    await unitDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(unitDeleteDialog.deleteModal);

    expect(await isVisible(unitDeleteDialog.deleteModal)).to.be.false;
  }
}
