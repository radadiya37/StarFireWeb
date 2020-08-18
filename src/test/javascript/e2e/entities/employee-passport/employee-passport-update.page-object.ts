import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeePassportUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeePassport.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  passportTypeInput: ElementFinder = element(by.css('input#employee-passport-passportType'));
  passportNoInput: ElementFinder = element(by.css('input#employee-passport-passportNo'));
  issueDateInput: ElementFinder = element(by.css('input#employee-passport-issueDate'));
  expireDateInput: ElementFinder = element(by.css('input#employee-passport-expireDate'));
  countrySelect: ElementFinder = element(by.css('select#employee-passport-country'));
  employeeSelect: ElementFinder = element(by.css('select#employee-passport-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPassportTypeInput(passportType) {
    await this.passportTypeInput.sendKeys(passportType);
  }

  async getPassportTypeInput() {
    return this.passportTypeInput.getAttribute('value');
  }

  async setPassportNoInput(passportNo) {
    await this.passportNoInput.sendKeys(passportNo);
  }

  async getPassportNoInput() {
    return this.passportNoInput.getAttribute('value');
  }

  async setIssueDateInput(issueDate) {
    await this.issueDateInput.sendKeys(issueDate);
  }

  async getIssueDateInput() {
    return this.issueDateInput.getAttribute('value');
  }

  async setExpireDateInput(expireDate) {
    await this.expireDateInput.sendKeys(expireDate);
  }

  async getExpireDateInput() {
    return this.expireDateInput.getAttribute('value');
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
    await this.setPassportTypeInput('passportType');
    expect(await this.getPassportTypeInput()).to.match(/passportType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPassportNoInput('passportNo');
    expect(await this.getPassportNoInput()).to.match(/passportNo/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIssueDateInput('01-01-2001');
    expect(await this.getIssueDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setExpireDateInput('01-01-2001');
    expect(await this.getExpireDateInput()).to.eq('2001-01-01');
    await this.countrySelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
