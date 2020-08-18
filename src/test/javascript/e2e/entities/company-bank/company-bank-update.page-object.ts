import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CompanyBankUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.companyBank.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#company-bank-name'));
  addressInput: ElementFinder = element(by.css('input#company-bank-address'));
  routingCodeInput: ElementFinder = element(by.css('input#company-bank-routingCode'));
  accountNameInput: ElementFinder = element(by.css('input#company-bank-accountName'));
  accountNoInput: ElementFinder = element(by.css('input#company-bank-accountNo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setRoutingCodeInput(routingCode) {
    await this.routingCodeInput.sendKeys(routingCode);
  }

  async getRoutingCodeInput() {
    return this.routingCodeInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
  }

  async setAccountNoInput(accountNo) {
    await this.accountNoInput.sendKeys(accountNo);
  }

  async getAccountNoInput() {
    return this.accountNoInput.getAttribute('value');
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
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRoutingCodeInput('routingCode');
    expect(await this.getRoutingCodeInput()).to.match(/routingCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNameInput('accountName');
    expect(await this.getAccountNameInput()).to.match(/accountName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNoInput('accountNo');
    expect(await this.getAccountNoInput()).to.match(/accountNo/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
