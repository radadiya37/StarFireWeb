import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import GradeUpdatePage from './grade-update.page-object';

const expect = chai.expect;
export class GradeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.grade.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-grade'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class GradeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('grade-heading'));
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
    await navBarPage.getEntityPage('grade');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateGrade() {
    await this.createButton.click();
    return new GradeUpdatePage();
  }

  async deleteGrade() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const gradeDeleteDialog = new GradeDeleteDialog();
    await waitUntilDisplayed(gradeDeleteDialog.deleteModal);
    expect(await gradeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.grade.delete.question/);
    await gradeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(gradeDeleteDialog.deleteModal);

    expect(await isVisible(gradeDeleteDialog.deleteModal)).to.be.false;
  }
}
