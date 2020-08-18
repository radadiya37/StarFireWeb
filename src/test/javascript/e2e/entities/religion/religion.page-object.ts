import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ReligionUpdatePage from './religion-update.page-object';

const expect = chai.expect;
export class ReligionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.religion.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-religion'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ReligionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('religion-heading'));
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
    await navBarPage.getEntityPage('religion');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateReligion() {
    await this.createButton.click();
    return new ReligionUpdatePage();
  }

  async deleteReligion() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const religionDeleteDialog = new ReligionDeleteDialog();
    await waitUntilDisplayed(religionDeleteDialog.deleteModal);
    expect(await religionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.religion.delete.question/);
    await religionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(religionDeleteDialog.deleteModal);

    expect(await isVisible(religionDeleteDialog.deleteModal)).to.be.false;
  }
}
