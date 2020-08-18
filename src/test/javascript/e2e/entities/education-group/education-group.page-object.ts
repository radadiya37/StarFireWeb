import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EducationGroupUpdatePage from './education-group-update.page-object';

const expect = chai.expect;
export class EducationGroupDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.educationGroup.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-educationGroup'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EducationGroupComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('education-group-heading'));
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
    await navBarPage.getEntityPage('education-group');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEducationGroup() {
    await this.createButton.click();
    return new EducationGroupUpdatePage();
  }

  async deleteEducationGroup() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const educationGroupDeleteDialog = new EducationGroupDeleteDialog();
    await waitUntilDisplayed(educationGroupDeleteDialog.deleteModal);
    expect(await educationGroupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.educationGroup.delete.question/);
    await educationGroupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(educationGroupDeleteDialog.deleteModal);

    expect(await isVisible(educationGroupDeleteDialog.deleteModal)).to.be.false;
  }
}
