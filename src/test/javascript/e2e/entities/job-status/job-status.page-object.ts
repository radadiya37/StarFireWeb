import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import JobStatusUpdatePage from './job-status-update.page-object';

const expect = chai.expect;
export class JobStatusDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.jobStatus.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobStatus'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class JobStatusComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('job-status-heading'));
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
    await navBarPage.getEntityPage('job-status');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateJobStatus() {
    await this.createButton.click();
    return new JobStatusUpdatePage();
  }

  async deleteJobStatus() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const jobStatusDeleteDialog = new JobStatusDeleteDialog();
    await waitUntilDisplayed(jobStatusDeleteDialog.deleteModal);
    expect(await jobStatusDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.jobStatus.delete.question/);
    await jobStatusDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(jobStatusDeleteDialog.deleteModal);

    expect(await isVisible(jobStatusDeleteDialog.deleteModal)).to.be.false;
  }
}
