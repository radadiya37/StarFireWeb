import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeWarningUpdatePage from './employee-warning-update.page-object';

const expect = chai.expect;
export class EmployeeWarningDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeWarning.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeWarning'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeWarningComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-warning-heading'));
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
    await navBarPage.getEntityPage('employee-warning');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeWarning() {
    await this.createButton.click();
    return new EmployeeWarningUpdatePage();
  }

  async deleteEmployeeWarning() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeWarningDeleteDialog = new EmployeeWarningDeleteDialog();
    await waitUntilDisplayed(employeeWarningDeleteDialog.deleteModal);
    expect(await employeeWarningDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeWarning.delete.question/
    );
    await employeeWarningDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeWarningDeleteDialog.deleteModal);

    expect(await isVisible(employeeWarningDeleteDialog.deleteModal)).to.be.false;
  }
}
