import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TimeZoneUpdatePage from './time-zone-update.page-object';

const expect = chai.expect;
export class TimeZoneDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.timeZone.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-timeZone'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TimeZoneComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('time-zone-heading'));
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
    await navBarPage.getEntityPage('time-zone');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTimeZone() {
    await this.createButton.click();
    return new TimeZoneUpdatePage();
  }

  async deleteTimeZone() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const timeZoneDeleteDialog = new TimeZoneDeleteDialog();
    await waitUntilDisplayed(timeZoneDeleteDialog.deleteModal);
    expect(await timeZoneDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.timeZone.delete.question/);
    await timeZoneDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(timeZoneDeleteDialog.deleteModal);

    expect(await isVisible(timeZoneDeleteDialog.deleteModal)).to.be.false;
  }
}
