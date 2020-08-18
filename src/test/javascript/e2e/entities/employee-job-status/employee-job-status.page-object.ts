import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeJobStatusUpdatePage from './employee-job-status-update.page-object';

const expect = chai.expect;
export class EmployeeJobStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeJobStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeJobStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeJobStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-job-status-heading'));
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
    await navBarPage.getEntityPage('employee-job-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeJobStatus() {
    await this.createButton.click();
    return new EmployeeJobStatusUpdatePage();
  }

  async deleteEmployeeJobStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeJobStatusDeleteDialog = new EmployeeJobStatusDeleteDialog();
    await waitUntilDisplayed(employeeJobStatusDeleteDialog.deleteModal);
    expect(await employeeJobStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeJobStatus.delete.question/
    );
    await employeeJobStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeJobStatusDeleteDialog.deleteModal);

    expect(await isVisible(employeeJobStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
