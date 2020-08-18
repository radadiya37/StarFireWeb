import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AwardTypeUpdatePage from './award-type-update.page-object';

const expect = chai.expect;
export class AwardTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.awardType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-awardType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AwardTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('award-type-heading'));
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
    await navBarPage.getEntityPage('award-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAwardType() {
    await this.createButton.click();
    return new AwardTypeUpdatePage();
  }

  async deleteAwardType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const awardTypeDeleteDialog = new AwardTypeDeleteDialog();
    await waitUntilDisplayed(awardTypeDeleteDialog.deleteModal);
    expect(await awardTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.awardType.delete.question/);
    await awardTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(awardTypeDeleteDialog.deleteModal);

    expect(await isVisible(awardTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
