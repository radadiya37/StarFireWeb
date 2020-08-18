import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DivisionUpdatePage from './division-update.page-object';

const expect = chai.expect;
export class DivisionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.division.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-division'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DivisionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('division-heading'));
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
    await navBarPage.getEntityPage('division');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDivision() {
    await this.createButton.click();
    return new DivisionUpdatePage();
  }

  async deleteDivision() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const divisionDeleteDialog = new DivisionDeleteDialog();
    await waitUntilDisplayed(divisionDeleteDialog.deleteModal);
    expect(await divisionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.division.delete.question/);
    await divisionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(divisionDeleteDialog.deleteModal);

    expect(await isVisible(divisionDeleteDialog.deleteModal)).to.be.false;
  }
}
