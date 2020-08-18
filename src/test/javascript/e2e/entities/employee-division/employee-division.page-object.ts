import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeDivisionUpdatePage from './employee-division-update.page-object';

const expect = chai.expect;
export class EmployeeDivisionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeDivision.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeDivision'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeDivisionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-division-heading'));
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
    await navBarPage.getEntityPage('employee-division');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeDivision() {
    await this.createButton.click();
    return new EmployeeDivisionUpdatePage();
  }

  async deleteEmployeeDivision() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeDivisionDeleteDialog = new EmployeeDivisionDeleteDialog();
    await waitUntilDisplayed(employeeDivisionDeleteDialog.deleteModal);
    expect(await employeeDivisionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeDivision.delete.question/
    );
    await employeeDivisionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeDivisionDeleteDialog.deleteModal);

    expect(await isVisible(employeeDivisionDeleteDialog.deleteModal)).to.be.false;
  }
}
