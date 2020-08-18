import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmployeeTalentUpdatePage from './employee-talent-update.page-object';

const expect = chai.expect;
export class EmployeeTalentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employeeTalent.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employeeTalent'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmployeeTalentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employee-talent-heading'));
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
    await navBarPage.getEntityPage('employee-talent');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmployeeTalent() {
    await this.createButton.click();
    return new EmployeeTalentUpdatePage();
  }

  async deleteEmployeeTalent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employeeTalentDeleteDialog = new EmployeeTalentDeleteDialog();
    await waitUntilDisplayed(employeeTalentDeleteDialog.deleteModal);
    expect(await employeeTalentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.employeeTalent.delete.question/);
    await employeeTalentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeTalentDeleteDialog.deleteModal);

    expect(await isVisible(employeeTalentDeleteDialog.deleteModal)).to.be.false;
  }
}
