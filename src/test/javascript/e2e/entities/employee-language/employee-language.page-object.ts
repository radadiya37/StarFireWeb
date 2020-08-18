import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeLanguageUpdatePage from './employee-language-update.page-object';

const expect = chai.expect;
export class EmployeeLanguageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeLanguage.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeLanguage'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeLanguageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-language-heading'));
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
    await navBarPage.getEntityPage('employee-language');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeLanguage() {
    await this.createButton.click();
    return new EmployeeLanguageUpdatePage();
  }

  async deleteEmployeeLanguage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeLanguageDeleteDialog = new EmployeeLanguageDeleteDialog();
    await waitUntilDisplayed(employeeLanguageDeleteDialog.deleteModal);
    expect(await employeeLanguageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employeeLanguage.delete.question/
    );
    await employeeLanguageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeLanguageDeleteDialog.deleteModal);

    expect(await isVisible(employeeLanguageDeleteDialog.deleteModal)).to.be.false;
  }
}
