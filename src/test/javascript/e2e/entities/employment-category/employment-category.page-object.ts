import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmploymentCategoryUpdatePage from './employment-category-update.page-object';

const expect = chai.expect;
export class EmploymentCategoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.employmentCategory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-employmentCategory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmploymentCategoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('employment-category-heading'));
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
    await navBarPage.getEntityPage('employment-category');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmploymentCategory() {
    await this.createButton.click();
    return new EmploymentCategoryUpdatePage();
  }

  async deleteEmploymentCategory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const employmentCategoryDeleteDialog = new EmploymentCategoryDeleteDialog();
    await waitUntilDisplayed(employmentCategoryDeleteDialog.deleteModal);
    expect(await employmentCategoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.employmentCategory.delete.question/
    );
    await employmentCategoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employmentCategoryDeleteDialog.deleteModal);

    expect(await isVisible(employmentCategoryDeleteDialog.deleteModal)).to.be.false;
  }
}
