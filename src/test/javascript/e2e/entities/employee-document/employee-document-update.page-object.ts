import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeDocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeDocument.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  documentTitleInput: ElementFinder = element(by.css('input#employee-document-documentTitle'));
  documentPathInput: ElementFinder = element(by.css('input#employee-document-documentPath'));
  remarksInput: ElementFinder = element(by.css('input#employee-document-remarks'));
  documentCategorySelect: ElementFinder = element(by.css('select#employee-document-documentCategory'));
  employeeSelect: ElementFinder = element(by.css('select#employee-document-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDocumentTitleInput(documentTitle) {
    await this.documentTitleInput.sendKeys(documentTitle);
  }

  async getDocumentTitleInput() {
    return this.documentTitleInput.getAttribute('value');
  }

  async setDocumentPathInput(documentPath) {
    await this.documentPathInput.sendKeys(documentPath);
  }

  async getDocumentPathInput() {
    return this.documentPathInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async documentCategorySelectLastOption() {
    await this.documentCategorySelect.all(by.tagName('option')).last().click();
  }

  async documentCategorySelectOption(option) {
    await this.documentCategorySelect.sendKeys(option);
  }

  getDocumentCategorySelect() {
    return this.documentCategorySelect;
  }

  async getDocumentCategorySelectedOption() {
    return this.documentCategorySelect.element(by.css('option:checked')).getText();
  }

  async employeeSelectLastOption() {
    await this.employeeSelect.all(by.tagName('option')).last().click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect() {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return this.employeeSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentTitleInput('documentTitle');
    expect(await this.getDocumentTitleInput()).to.match(/documentTitle/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDocumentPathInput('documentPath');
    expect(await this.getDocumentPathInput()).to.match(/documentPath/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await this.documentCategorySelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
