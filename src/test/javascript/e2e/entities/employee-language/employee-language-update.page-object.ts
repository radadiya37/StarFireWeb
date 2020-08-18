import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeLanguageUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeLanguage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  employeeSelect: ElementFinder = element(by.css('select#employee-language-employee'));
  languageSelect: ElementFinder = element(by.css('select#employee-language-language'));
  languageProficiencySelect: ElementFinder = element(by.css('select#employee-language-languageProficiency'));

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

  async languageSelectLastOption() {
    await this.languageSelect.all(by.tagName('option')).last().click();
  }

  async languageSelectOption(option) {
    await this.languageSelect.sendKeys(option);
  }

  getLanguageSelect() {
    return this.languageSelect;
  }

  async getLanguageSelectedOption() {
    return this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageProficiencySelectLastOption() {
    await this.languageProficiencySelect.all(by.tagName('option')).last().click();
  }

  async languageProficiencySelectOption(option) {
    await this.languageProficiencySelect.sendKeys(option);
  }

  getLanguageProficiencySelect() {
    return this.languageProficiencySelect;
  }

  async getLanguageProficiencySelectedOption() {
    return this.languageProficiencySelect.element(by.css('option:checked')).getText();
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
    await this.languageSelectLastOption();
    await this.languageProficiencySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
