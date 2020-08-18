import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PersonalRelationshipUpdatePage from './personal-relationship-update.page-object';

const expect = chai.expect;
export class PersonalRelationshipDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.personalRelationship.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-personalRelationship'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PersonalRelationshipComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('personal-relationship-heading'));
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
    await navBarPage.getEntityPage('personal-relationship');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePersonalRelationship() {
    await this.createButton.click();
    return new PersonalRelationshipUpdatePage();
  }

  async deletePersonalRelationship() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const personalRelationshipDeleteDialog = new PersonalRelationshipDeleteDialog();
    await waitUntilDisplayed(personalRelationshipDeleteDialog.deleteModal);
    expect(await personalRelationshipDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.personalRelationship.delete.question/
    );
    await personalRelationshipDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(personalRelationshipDeleteDialog.deleteModal);

    expect(await isVisible(personalRelationshipDeleteDialog.deleteModal)).to.be.false;
  }
}
