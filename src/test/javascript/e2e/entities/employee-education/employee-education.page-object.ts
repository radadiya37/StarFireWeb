import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeEducationUpdatePage from './employee-education-update.page-object';

const expect = chai.expect;
export class EmployeeEducationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeEducation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeEducation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeEducationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-education-heading'));
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
    await navBarPage.getEntityPage('employee-education');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeEducation() {
    await this.createButton.click();
    return new EmployeeEducationUpdatePage();
  }

  async deleteEmployeeEducation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeEducationDeleteDialog = new EmployeeEducationDeleteDialog();
    await waitUntilDisplayed(employeeEducationDeleteDialog.deleteModal);
    expect(await employeeEducationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeEducation.delete.question/
    );
    await employeeEducationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeEducationDeleteDialog.deleteModal);

    expect(await isVisible(employeeEducationDeleteDialog.deleteModal)).to.be.false;
  }
}
