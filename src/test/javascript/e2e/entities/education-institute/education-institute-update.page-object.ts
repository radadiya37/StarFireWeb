import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EducationInstituteUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.educationInstitute.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#education-institute-name'));
  addressInput: ElementFinder = element(by.css('input#education-institute-address'));

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
    await this.setNameInput('r');
    expect(await this.getNameInput()).to.match(/r/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
