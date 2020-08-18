import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TalentTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.talentType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  talentTypeInput: ElementFinder = element(by.css('input#talent-type-talentType'));
  descriptionInput: ElementFinder = element(by.css('input#talent-type-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTalentTypeInput(talentType) {
    await this.talentTypeInput.sendKeys(talentType);
  }

  async getTalentTypeInput() {
    return this.talentTypeInput.getAttribute('value');
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
    await this.setTalentTypeInput('talentType');
    expect(await this.getTalentTypeInput()).to.match(/talentType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
