import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeBankUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeBank.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#employee-bank-name'));
  routingCodeInput: ElementFinder = element(by.css('input#employee-bank-routingCode'));
  accountNoInput: ElementFinder = element(by.css('input#employee-bank-accountNo'));
  accountNameInput: ElementFinder = element(by.css('input#employee-bank-accountName'));
  remarksInput: ElementFinder = element(by.css('input#employee-bank-remarks'));
  employeeSelect: ElementFinder = element(by.css('select#employee-bank-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setRoutingCodeInput(routingCode) {
    await this.routingCodeInput.sendKeys(routingCode);
  }

  async getRoutingCodeInput() {
    return this.routingCodeInput.getAttribute('value');
  }

  async setAccountNoInput(accountNo) {
    await this.accountNoInput.sendKeys(accountNo);
  }

  async getAccountNoInput() {
    return this.accountNoInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRoutingCodeInput('routingCode');
    expect(await this.getRoutingCodeInput()).to.match(/routingCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNoInput('accountNo');
    expect(await this.getAccountNoInput()).to.match(/accountNo/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNameInput('accountName');
    expect(await this.getAccountNameInput()).to.match(/accountName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
