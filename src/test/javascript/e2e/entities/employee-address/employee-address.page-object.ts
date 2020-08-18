import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeAddressUpdatePage from './employee-address-update.page-object';

const expect = chai.expect;
export class EmployeeAddressDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeAddress.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeAddress'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeAddressComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-address-heading'));
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
    await navBarPage.getEntityPage('employee-address');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeAddress() {
    await this.createButton.click();
    return new EmployeeAddressUpdatePage();
  }

  async deleteEmployeeAddress() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeAddressDeleteDialog = new EmployeeAddressDeleteDialog();
    await waitUntilDisplayed(employeeAddressDeleteDialog.deleteModal);
    expect(await employeeAddressDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeAddress.delete.question/
    );
    await employeeAddressDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeAddressDeleteDialog.deleteModal);

    expect(await isVisible(employeeAddressDeleteDialog.deleteModal)).to.be.false;
  }
}
