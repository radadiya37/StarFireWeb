import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BranchUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.branch.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#branch-name'));
  isRemoteAttendanceAllowedInput: ElementFinder = element(by.css('input#branch-isRemoteAttendanceAllowed'));
  radiusInMeterInput: ElementFinder = element(by.css('input#branch-radiusInMeter'));
  isHeadOfficeInput: ElementFinder = element(by.css('input#branch-isHeadOffice'));
  timeZoneSelect: ElementFinder = element(by.css('select#branch-timeZone'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  getIsRemoteAttendanceAllowedInput() {
    return this.isRemoteAttendanceAllowedInput;
  }
  async setRadiusInMeterInput(radiusInMeter) {
    await this.radiusInMeterInput.sendKeys(radiusInMeter);
  }

  async getRadiusInMeterInput() {
    return this.radiusInMeterInput.getAttribute('value');
  }

  getIsHeadOfficeInput() {
    return this.isHeadOfficeInput;
  }
  async timeZoneSelectLastOption() {
    await this.timeZoneSelect.all(by.tagName('option')).last().click();
  }

  async timeZoneSelectOption(option) {
    await this.timeZoneSelect.sendKeys(option);
  }

  getTimeZoneSelect() {
    return this.timeZoneSelect;
  }

  async getTimeZoneSelectedOption() {
    return this.timeZoneSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('RqRj');
    expect(await this.getNameInput()).to.match(/RqRj/);
    await waitUntilDisplayed(this.saveButton);
    const selectedIsRemoteAttendanceAllowed = await this.getIsRemoteAttendanceAllowedInput().isSelected();
    if (selectedIsRemoteAttendanceAllowed) {
      await this.getIsRemoteAttendanceAllowedInput().click();
      expect(await this.getIsRemoteAttendanceAllowedInput().isSelected()).to.be.false;
    } else {
      await this.getIsRemoteAttendanceAllowedInput().click();
      expect(await this.getIsRemoteAttendanceAllowedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setRadiusInMeterInput('5');
    expect(await this.getRadiusInMeterInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsHeadOffice = await this.getIsHeadOfficeInput().isSelected();
    if (selectedIsHeadOffice) {
      await this.getIsHeadOfficeInput().click();
      expect(await this.getIsHeadOfficeInput().isSelected()).to.be.false;
    } else {
      await this.getIsHeadOfficeInput().click();
      expect(await this.getIsHeadOfficeInput().isSelected()).to.be.true;
    }
    await this.timeZoneSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
