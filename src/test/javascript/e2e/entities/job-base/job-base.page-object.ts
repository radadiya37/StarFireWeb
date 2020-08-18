import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import JobBaseUpdatePage from './job-base-update.page-object';

const expect = chai.expect;
export class JobBaseDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.jobBase.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobBase'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class JobBaseComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('job-base-heading'));
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
    await navBarPage.getEntityPage('job-base');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateJobBase() {
    await this.createButton.click();
    return new JobBaseUpdatePage();
  }

  async deleteJobBase() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const jobBaseDeleteDialog = new JobBaseDeleteDialog();
    await waitUntilDisplayed(jobBaseDeleteDialog.deleteModal);
    expect(await jobBaseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.jobBase.delete.question/);
    await jobBaseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(jobBaseDeleteDialog.deleteModal);

    expect(await isVisible(jobBaseDeleteDialog.deleteModal)).to.be.false;
  }
}
