import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeBankUpdatePage from './employee-bank-update.page-object';

const expect = chai.expect;
export class EmployeeBankDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeBank.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeBank'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeBankComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-bank-heading'));
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
    await navBarPage.getEntityPage('employee-bank');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeBank() {
    await this.createButton.click();
    return new EmployeeBankUpdatePage();
  }

  async deleteEmployeeBank() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeBankDeleteDialog = new EmployeeBankDeleteDialog();
    await waitUntilDisplayed(employeeBankDeleteDialog.deleteModal);
    expect(await employeeBankDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.employeeBank.delete.question/);
    await employeeBankDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeBankDeleteDialog.deleteModal);

    expect(await isVisible(employeeBankDeleteDialog.deleteModal)).to.be.false;
  }
}
