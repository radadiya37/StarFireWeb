import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeAwardUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeAward.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  awardDateInput: ElementFinder = element(by.css('input#employee-award-awardDate'));
  awardNameInput: ElementFinder = element(by.css('input#employee-award-awardName'));
  giftInput: ElementFinder = element(by.css('input#employee-award-gift'));
  prizeAmountInput: ElementFinder = element(by.css('input#employee-award-prizeAmount'));
  awardCertificatePathInput: ElementFinder = element(by.css('input#employee-award-awardCertificatePath'));
  remarksInput: ElementFinder = element(by.css('input#employee-award-remarks'));
  awardTypeSelect: ElementFinder = element(by.css('select#employee-award-awardType'));
  employeeSelect: ElementFinder = element(by.css('select#employee-award-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAwardDateInput(awardDate) {
    await this.awardDateInput.sendKeys(awardDate);
  }

  async getAwardDateInput() {
    return this.awardDateInput.getAttribute('value');
  }

  async setAwardNameInput(awardName) {
    await this.awardNameInput.sendKeys(awardName);
  }

  async getAwardNameInput() {
    return this.awardNameInput.getAttribute('value');
  }

  async setGiftInput(gift) {
    await this.giftInput.sendKeys(gift);
  }

  async getGiftInput() {
    return this.giftInput.getAttribute('value');
  }

  async setPrizeAmountInput(prizeAmount) {
    await this.prizeAmountInput.sendKeys(prizeAmount);
  }

  async getPrizeAmountInput() {
    return this.prizeAmountInput.getAttribute('value');
  }

  async setAwardCertificatePathInput(awardCertificatePath) {
    await this.awardCertificatePathInput.sendKeys(awardCertificatePath);
  }

  async getAwardCertificatePathInput() {
    return this.awardCertificatePathInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async awardTypeSelectLastOption() {
    await this.awardTypeSelect.all(by.tagName('option')).last().click();
  }

  async awardTypeSelectOption(option) {
    await this.awardTypeSelect.sendKeys(option);
  }

  getAwardTypeSelect() {
    return this.awardTypeSelect;
  }

  async getAwardTypeSelectedOption() {
    return this.awardTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setAwardDateInput('01-01-2001');
    expect(await this.getAwardDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setAwardNameInput('awardName');
    expect(await this.getAwardNameInput()).to.match(/awardName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGiftInput('gift');
    expect(await this.getGiftInput()).to.match(/gift/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPrizeAmountInput('5');
    expect(await this.getPrizeAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAwardCertificatePathInput('awardCertificatePath');
    expect(await this.getAwardCertificatePathInput()).to.match(/awardCertificatePath/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await this.awardTypeSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
