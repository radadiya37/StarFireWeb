import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeWarningUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeWarning.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  warningInput: ElementFinder = element(by.css('input#employee-warning-warning'));
  actionInput: ElementFinder = element(by.css('input#employee-warning-action'));
  remarksInput: ElementFinder = element(by.css('input#employee-warning-remarks'));
  isActionTypeInput: ElementFinder = element(by.css('input#employee-warning-isActionType'));
  warningDateInput: ElementFinder = element(by.css('input#employee-warning-warningDate'));
  warnedEmployeeSelect: ElementFinder = element(by.css('select#employee-warning-warnedEmployee'));
  warnedBySelect: ElementFinder = element(by.css('select#employee-warning-warnedBy'));
  warningTypeSelect: ElementFinder = element(by.css('select#employee-warning-warningType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWarningInput(warning) {
    await this.warningInput.sendKeys(warning);
  }

  async getWarningInput() {
    return this.warningInput.getAttribute('value');
  }

  async setActionInput(action) {
    await this.actionInput.sendKeys(action);
  }

  async getActionInput() {
    return this.actionInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  getIsActionTypeInput() {
    return this.isActionTypeInput;
  }
  async setWarningDateInput(warningDate) {
    await this.warningDateInput.sendKeys(warningDate);
  }

  async getWarningDateInput() {
    return this.warningDateInput.getAttribute('value');
  }

  async warnedEmployeeSelectLastOption() {
    await this.warnedEmployeeSelect.all(by.tagName('option')).last().click();
  }

  async warnedEmployeeSelectOption(option) {
    await this.warnedEmployeeSelect.sendKeys(option);
  }

  getWarnedEmployeeSelect() {
    return this.warnedEmployeeSelect;
  }

  async getWarnedEmployeeSelectedOption() {
    return this.warnedEmployeeSelect.element(by.css('option:checked')).getText();
  }

  async warnedBySelectLastOption() {
    await this.warnedBySelect.all(by.tagName('option')).last().click();
  }

  async warnedBySelectOption(option) {
    await this.warnedBySelect.sendKeys(option);
  }

  getWarnedBySelect() {
    return this.warnedBySelect;
  }

  async getWarnedBySelectedOption() {
    return this.warnedBySelect.element(by.css('option:checked')).getText();
  }

  async warningTypeSelectLastOption() {
    await this.warningTypeSelect.all(by.tagName('option')).last().click();
  }

  async warningTypeSelectOption(option) {
    await this.warningTypeSelect.sendKeys(option);
  }

  getWarningTypeSelect() {
    return this.warningTypeSelect;
  }

  async getWarningTypeSelectedOption() {
    return this.warningTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setWarningInput('warning');
    expect(await this.getWarningInput()).to.match(/warning/);
    await waitUntilDisplayed(this.saveButton);
    await this.setActionInput('action');
    expect(await this.getActionInput()).to.match(/action/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await waitUntilDisplayed(this.saveButton);
    const selectedIsActionType = await this.getIsActionTypeInput().isSelected();
    if (selectedIsActionType) {
      await this.getIsActionTypeInput().click();
      expect(await this.getIsActionTypeInput().isSelected()).to.be.false;
    } else {
      await this.getIsActionTypeInput().click();
      expect(await this.getIsActionTypeInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setWarningDateInput('01-01-2001');
    expect(await this.getWarningDateInput()).to.eq('2001-01-01');
    await this.warnedEmployeeSelectLastOption();
    await this.warnedBySelectLastOption();
    await this.warningTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
