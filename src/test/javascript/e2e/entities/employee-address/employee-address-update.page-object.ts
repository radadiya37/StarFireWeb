import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeAddressUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeAddress.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  employeeSelect: ElementFinder = element(by.css('select#employee-address-employee'));
  presentAddressSelect: ElementFinder = element(by.css('select#employee-address-presentAddress'));
  permanentAddressSelect: ElementFinder = element(by.css('select#employee-address-permanentAddress'));

  getPageTitle() {
    return this.pageTitle;
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

  async presentAddressSelectLastOption() {
    await this.presentAddressSelect.all(by.tagName('option')).last().click();
  }

  async presentAddressSelectOption(option) {
    await this.presentAddressSelect.sendKeys(option);
  }

  getPresentAddressSelect() {
    return this.presentAddressSelect;
  }

  async getPresentAddressSelectedOption() {
    return this.presentAddressSelect.element(by.css('option:checked')).getText();
  }

  async permanentAddressSelectLastOption() {
    await this.permanentAddressSelect.all(by.tagName('option')).last().click();
  }

  async permanentAddressSelectOption(option) {
    await this.permanentAddressSelect.sendKeys(option);
  }

  getPermanentAddressSelect() {
    return this.permanentAddressSelect;
  }

  async getPermanentAddressSelectedOption() {
    return this.permanentAddressSelect.element(by.css('option:checked')).getText();
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
    await this.employeeSelectLastOption();
    await this.presentAddressSelectLastOption();
    await this.permanentAddressSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
