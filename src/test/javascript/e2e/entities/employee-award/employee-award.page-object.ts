import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeAwardUpdatePage from './employee-award-update.page-object';

const expect = chai.expect;
export class EmployeeAwardDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeAward.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeAward'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeAwardComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-award-heading'));
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
    await navBarPage.getEntityPage('employee-award');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeAward() {
    await this.createButton.click();
    return new EmployeeAwardUpdatePage();
  }

  async deleteEmployeeAward() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeAwardDeleteDialog = new EmployeeAwardDeleteDialog();
    await waitUntilDisplayed(employeeAwardDeleteDialog.deleteModal);
    expect(await employeeAwardDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.employeeAward.delete.question/);
    await employeeAwardDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeAwardDeleteDialog.deleteModal);

    expect(await isVisible(employeeAwardDeleteDialog.deleteModal)).to.be.false;
  }
}
