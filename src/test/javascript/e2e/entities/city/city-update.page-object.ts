import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CityUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.city.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#city-name'));
  stateSelect: ElementFinder = element(by.css('select#city-state'));
  countrySelect: ElementFinder = element(by.css('select#city-country'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await this.stateSelectLastOption();
    await this.countrySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
