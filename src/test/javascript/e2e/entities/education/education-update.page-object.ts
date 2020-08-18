import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EducationUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.education.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#education-name'));
  descriptionInput: ElementFinder = element(by.css('input#education-description'));
  statusInput: ElementFinder = element(by.css('input#education-status'));
  educationGroupSelect: ElementFinder = element(by.css('select#education-educationGroup'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
  async educationGroupSelectLastOption() {
    await this.educationGroupSelect.all(by.tagName('option')).last().click();
  }

  async educationGroupSelectOption(option) {
    await this.educationGroupSelect.sendKeys(option);
  }

  getEducationGroupSelect() {
    return this.educationGroupSelect;
  }

  async getEducationGroupSelectedOption() {
    return this.educationGroupSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('ppWH');
    expect(await this.getNameInput()).to.match(/ppWH/);
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
    await this.educationGroupSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
