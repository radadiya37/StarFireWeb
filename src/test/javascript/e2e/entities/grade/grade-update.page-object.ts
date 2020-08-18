import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GradeUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.grade.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#grade-name'));
  pointInput: ElementFinder = element(by.css('input#grade-point'));
  serialInput: ElementFinder = element(by.css('input#grade-serial'));
  descriptionInput: ElementFinder = element(by.css('input#grade-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setPointInput(point) {
    await this.pointInput.sendKeys(point);
  }

  async getPointInput() {
    return this.pointInput.getAttribute('value');
  }

  async setSerialInput(serial) {
    await this.serialInput.sendKeys(serial);
  }

  async getSerialInput() {
    return this.serialInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPointInput('5');
    expect(await this.getPointInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setSerialInput('5');
    expect(await this.getSerialInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
