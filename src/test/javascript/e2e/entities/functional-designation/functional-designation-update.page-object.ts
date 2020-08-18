import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FunctionalDesignationUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.functionalDesignation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#functional-designation-name'));
  codeInput: ElementFinder = element(by.css('input#functional-designation-code'));
  positionInput: ElementFinder = element(by.css('input#functional-designation-position'));
  shortNameInput: ElementFinder = element(by.css('input#functional-designation-shortName'));
  descriptionInput: ElementFinder = element(by.css('input#functional-designation-description'));
  designationDateInput: ElementFinder = element(by.css('input#functional-designation-designationDate'));
  statusInput: ElementFinder = element(by.css('input#functional-designation-status'));

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

  async setPositionInput(position) {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput() {
    return this.positionInput.getAttribute('value');
  }

  async setShortNameInput(shortName) {
    await this.shortNameInput.sendKeys(shortName);
  }

  async getShortNameInput() {
    return this.shortNameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setDesignationDateInput(designationDate) {
    await this.designationDateInput.sendKeys(designationDate);
  }

  async getDesignationDateInput() {
    return this.designationDateInput.getAttribute('value');
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
    await this.setNameInput('dfEbg');
    expect(await this.getNameInput()).to.match(/dfEbg/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('N');
    expect(await this.getCodeInput()).to.match(/N/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPositionInput('5');
    expect(await this.getPositionInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setShortNameInput('Nwkkju');
    expect(await this.getShortNameInput()).to.match(/Nwkkju/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDesignationDateInput('01-01-2001');
    expect(await this.getDesignationDateInput()).to.eq('2001-01-01');
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
