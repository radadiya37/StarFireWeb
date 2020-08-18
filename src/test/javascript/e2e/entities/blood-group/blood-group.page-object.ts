import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BloodGroupUpdatePage from './blood-group-update.page-object';

const expect = chai.expect;
export class BloodGroupDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.bloodGroup.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bloodGroup'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BloodGroupComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('blood-group-heading'));
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
    await navBarPage.getEntityPage('blood-group');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBloodGroup() {
    await this.createButton.click();
    return new BloodGroupUpdatePage();
  }

  async deleteBloodGroup() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bloodGroupDeleteDialog = new BloodGroupDeleteDialog();
    await waitUntilDisplayed(bloodGroupDeleteDialog.deleteModal);
    expect(await bloodGroupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.bloodGroup.delete.question/);
    await bloodGroupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bloodGroupDeleteDialog.deleteModal);

    expect(await isVisible(bloodGroupDeleteDialog.deleteModal)).to.be.false;
  }
}
