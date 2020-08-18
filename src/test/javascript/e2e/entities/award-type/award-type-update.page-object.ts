import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AwardTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.awardType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  awardTypeInput: ElementFinder = element(by.css('input#award-type-awardType'));
  descriptionInput: ElementFinder = element(by.css('input#award-type-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAwardTypeInput(awardType) {
    await this.awardTypeInput.sendKeys(awardType);
  }

  async getAwardTypeInput() {
    return this.awardTypeInput.getAttribute('value');
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
    await this.setAwardTypeInput('awardType');
    expect(await this.getAwardTypeInput()).to.match(/awardType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
