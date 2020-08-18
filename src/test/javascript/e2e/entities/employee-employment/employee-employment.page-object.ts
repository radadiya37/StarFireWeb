import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeEmploymentUpdatePage from './employee-employment-update.page-object';

const expect = chai.expect;
export class EmployeeEmploymentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeEmployment.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeEmployment'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeEmploymentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-employment-heading'));
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
    await navBarPage.getEntityPage('employee-employment');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeEmployment() {
    await this.createButton.click();
    return new EmployeeEmploymentUpdatePage();
  }

  async deleteEmployeeEmployment() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeEmploymentDeleteDialog = new EmployeeEmploymentDeleteDialog();
    await waitUntilDisplayed(employeeEmploymentDeleteDialog.deleteModal);
    expect(await employeeEmploymentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeEmployment.delete.question/
    );
    await employeeEmploymentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeEmploymentDeleteDialog.deleteModal);

    expect(await isVisible(employeeEmploymentDeleteDialog.deleteModal)).to.be.false;
  }
}
