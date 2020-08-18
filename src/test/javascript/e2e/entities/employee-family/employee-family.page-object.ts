import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeFamilyUpdatePage from './employee-family-update.page-object';

const expect = chai.expect;
export class EmployeeFamilyDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeFamily.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeFamily'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeFamilyComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-family-heading'));
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
    await navBarPage.getEntityPage('employee-family');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeFamily() {
    await this.createButton.click();
    return new EmployeeFamilyUpdatePage();
  }

  async deleteEmployeeFamily() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeFamilyDeleteDialog = new EmployeeFamilyDeleteDialog();
    await waitUntilDisplayed(employeeFamilyDeleteDialog.deleteModal);
    expect(await employeeFamilyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.employeeFamily.delete.question/);
    await employeeFamilyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeFamilyDeleteDialog.deleteModal);

    expect(await isVisible(employeeFamilyDeleteDialog.deleteModal)).to.be.false;
  }
}
