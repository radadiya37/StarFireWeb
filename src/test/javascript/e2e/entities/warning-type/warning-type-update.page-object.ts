import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WarningTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.warningType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  warningTypeInput: ElementFinder = element(by.css('input#warning-type-warningType'));
  descriptionInput: ElementFinder = element(by.css('input#warning-type-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWarningTypeInput(warningType) {
    await this.warningTypeInput.sendKeys(warningType);
  }

  async getWarningTypeInput() {
    return this.warningTypeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setWarningTypeInput('warningType');
    expect(await this.getWarningTypeInput()).to.match(/warningType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
