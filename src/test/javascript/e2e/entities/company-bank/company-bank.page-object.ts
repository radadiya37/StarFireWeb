import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CompanyBankUpdatePage from './company-bank-update.page-object';

const expect = chai.expect;
export class CompanyBankDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.companyBank.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-companyBank'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CompanyBankComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('company-bank-heading'));
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
    await navBarPage.getEntityPage('company-bank');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCompanyBank() {
    await this.createButton.click();
    return new CompanyBankUpdatePage();
  }

  async deleteCompanyBank() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const companyBankDeleteDialog = new CompanyBankDeleteDialog();
    await waitUntilDisplayed(companyBankDeleteDialog.deleteModal);
    expect(await companyBankDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/starfirewebApp.companyBank.delete.question/);
    await companyBankDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(companyBankDeleteDialog.deleteModal);

    expect(await isVisible(companyBankDeleteDialog.deleteModal)).to.be.false;
  }
}
