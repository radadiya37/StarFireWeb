import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeBasicInfoUpdatePage from './employee-basic-info-update.page-object';

const expect = chai.expect;
export class EmployeeBasicInfoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeBasicInfo.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeBasicInfo'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeBasicInfoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-basic-info-heading'));
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
    await navBarPage.getEntityPage('employee-basic-info');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeBasicInfo() {
    await this.createButton.click();
    return new EmployeeBasicInfoUpdatePage();
  }

  async deleteEmployeeBasicInfo() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeBasicInfoDeleteDialog = new EmployeeBasicInfoDeleteDialog();
    await waitUntilDisplayed(employeeBasicInfoDeleteDialog.deleteModal);
    expect(await employeeBasicInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeBasicInfo.delete.question/
    );
    await employeeBasicInfoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeBasicInfoDeleteDialog.deleteModal);

    expect(await isVisible(employeeBasicInfoDeleteDialog.deleteModal)).to.be.false;
  }
}
