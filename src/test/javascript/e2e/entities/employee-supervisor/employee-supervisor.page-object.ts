import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeSupervisorUpdatePage from './employee-supervisor-update.page-object';

const expect = chai.expect;
export class EmployeeSupervisorDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeSupervisor.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeSupervisor'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeSupervisorComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-supervisor-heading'));
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
    await navBarPage.getEntityPage('employee-supervisor');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeSupervisor() {
    await this.createButton.click();
    return new EmployeeSupervisorUpdatePage();
  }

  async deleteEmployeeSupervisor() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeSupervisorDeleteDialog = new EmployeeSupervisorDeleteDialog();
    await waitUntilDisplayed(employeeSupervisorDeleteDialog.deleteModal);
    expect(await employeeSupervisorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeSupervisor.delete.question/
    );
    await employeeSupervisorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeSupervisorDeleteDialog.deleteModal);

    expect(await isVisible(employeeSupervisorDeleteDialog.deleteModal)).to.be.false;
  }
}
