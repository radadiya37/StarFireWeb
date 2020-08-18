import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import JobLevelUpdatePage from './job-level-update.page-object';

const expect = chai.expect;
export class JobLevelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.jobLevel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobLevel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class JobLevelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('job-level-heading'));
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
    await navBarPage.getEntityPage('job-level');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateJobLevel() {
    await this.createButton.click();
    return new JobLevelUpdatePage();
  }

  async deleteJobLevel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const jobLevelDeleteDialog = new JobLevelDeleteDialog();
    await waitUntilDisplayed(jobLevelDeleteDialog.deleteModal);
    expect(await jobLevelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.jobLevel.delete.question/);
    await jobLevelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(jobLevelDeleteDialog.deleteModal);

    expect(await isVisible(jobLevelDeleteDialog.deleteModal)).to.be.false;
  }
}
