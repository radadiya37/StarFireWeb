import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AddressUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.address.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#address-address'));
  zipCodeInput: ElementFinder = element(by.css('input#address-zipCode'));
  citySelect: ElementFinder = element(by.css('select#address-city'));
  stateSelect: ElementFinder = element(by.css('select#address-state'));
  countrySelect: ElementFinder = element(by.css('select#address-country'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setZipCodeInput(zipCode) {
    await this.zipCodeInput.sendKeys(zipCode);
  }

  async getZipCodeInput() {
    return this.zipCodeInput.getAttribute('value');
  }

  async citySelectLastOption() {
    await this.citySelect.all(by.tagName('option')).last().click();
  }

  async citySelectOption(option) {
    await this.citySelect.sendKeys(option);
  }

  getCitySelect() {
    return this.citySelect;
  }

  async getCitySelectedOption() {
    return this.citySelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect.all(by.tagName('option')).last().click();
  }

  async stateSelectOption(option) {
    await this.stateSelect.sendKeys(option);
  }

  getStateSelect() {
    return this.stateSelect;
  }

  async getStateSelectedOption() {
    return this.stateSelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption() {
    await this.countrySelect.all(by.tagName('option')).last().click();
  }

  async countrySelectOption(option) {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect() {
    return this.countrySelect;
  }

  async getCountrySelectedOption() {
    return this.countrySelect.element(by.css('option:checked')).getText();
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
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setZipCodeInput('LSSYX');
    expect(await this.getZipCodeInput()).to.match(/LSSYX/);
    await this.citySelectLastOption();
    await this.stateSelectLastOption();
    await this.countrySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
