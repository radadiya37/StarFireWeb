import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class JobBaseUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.jobBase.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#job-base-name'));
  codeInput: ElementFinder = element(by.css('input#job-base-code'));
  isSystemReservedInput: ElementFinder = element(by.css('input#job-base-isSystemReserved'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  getIsSystemReservedInput() {
    return this.isSystemReservedInput;
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
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    const selectedIsSystemReserved = await this.getIsSystemReservedInput().isSelected();
    if (selectedIsSystemReserved) {
      await this.getIsSystemReservedInput().click();
      expect(await this.getIsSystemReservedInput().isSelected()).to.be.false;
    } else {
      await this.getIsSystemReservedInput().click();
      expect(await this.getIsSystemReservedInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
