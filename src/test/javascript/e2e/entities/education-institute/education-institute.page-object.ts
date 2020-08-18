import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EducationInstituteUpdatePage from './education-institute-update.page-object';

const expect = chai.expect;
export class EducationInstituteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('starfirewebApp.educationInstitute.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-educationInstitute'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EducationInstituteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('education-institute-heading'));
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
    await navBarPage.getEntityPage('education-institute');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEducationInstitute() {
    await this.createButton.click();
    return new EducationInstituteUpdatePage();
  }

  async deleteEducationInstitute() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const educationInstituteDeleteDialog = new EducationInstituteDeleteDialog();
    await waitUntilDisplayed(educationInstituteDeleteDialog.deleteModal);
    expect(await educationInstituteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /starfirewebApp.educationInstitute.delete.question/
    );
    await educationInstituteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(educationInstituteDeleteDialog.deleteModal);

    expect(await isVisible(educationInstituteDeleteDialog.deleteModal)).to.be.false;
  }
}
