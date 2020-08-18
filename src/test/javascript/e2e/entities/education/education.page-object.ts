import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EducationUpdatePage from './education-update.page-object';

const expect = chai.expect;
export class EducationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.education.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-education'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EducationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('education-heading'));
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
    await navBarPage.getEntityPage('education');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEducation() {
    await this.createButton.click();
    return new EducationUpdatePage();
  }

  async deleteEducation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const educationDeleteDialog = new EducationDeleteDialog();
    await waitUntilDisplayed(educationDeleteDialog.deleteModal);
    expect(await educationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.education.delete.question/);
    await educationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(educationDeleteDialog.deleteModal);

    expect(await isVisible(educationDeleteDialog.deleteModal)).to.be.false;
  }
}
