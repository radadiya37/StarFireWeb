import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class JobStatusUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.jobStatus.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#job-status-code'));
  descriptionInput: ElementFinder = element(by.css('input#job-status-description'));
  statusInput: ElementFinder = element(by.css('input#job-status-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  getStatusInput() {
    return this.statusInput;
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
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    const selectedStatus = await this.getStatusInput().isSelected();
    if (selectedStatus) {
      await this.getStatusInput().click();
      expect(await this.getStatusInput().isSelected()).to.be.false;
    } else {
      await this.getStatusInput().click();
      expect(await this.getStatusInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
