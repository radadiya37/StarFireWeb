import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeSupervisorUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeSupervisor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  isDirectSupervisorInput: ElementFinder = element(by.css('input#employee-supervisor-isDirectSupervisor'));
  effectiveDateInput: ElementFinder = element(by.css('input#employee-supervisor-effectiveDate'));
  employeeSelect: ElementFinder = element(by.css('select#employee-supervisor-employee'));
  supervisorSelect: ElementFinder = element(by.css('select#employee-supervisor-supervisor'));

  getPageTitle() {
    return this.pageTitle;
  }

  getIsDirectSupervisorInput() {
    return this.isDirectSupervisorInput;
  }
  async setEffectiveDateInput(effectiveDate) {
    await this.effectiveDateInput.sendKeys(effectiveDate);
  }

  async getEffectiveDateInput() {
    return this.effectiveDateInput.getAttribute('value');
  }

  async employeeSelectLastOption() {
    await this.employeeSelect.all(by.tagName('option')).last().click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect() {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return this.employeeSelect.element(by.css('option:checked')).getText();
  }

  async supervisorSelectLastOption() {
    await this.supervisorSelect.all(by.tagName('option')).last().click();
  }

  async supervisorSelectOption(option) {
    await this.supervisorSelect.sendKeys(option);
  }

  getSupervisorSelect() {
    return this.supervisorSelect;
  }

  async getSupervisorSelectedOption() {
    return this.supervisorSelect.element(by.css('option:checked')).getText();
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
    const selectedIsDirectSupervisor = await this.getIsDirectSupervisorInput().isSelected();
    if (selectedIsDirectSupervisor) {
      await this.getIsDirectSupervisorInput().click();
      expect(await this.getIsDirectSupervisorInput().isSelected()).to.be.false;
    } else {
      await this.getIsDirectSupervisorInput().click();
      expect(await this.getIsDirectSupervisorInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setEffectiveDateInput('01-01-2001');
    expect(await this.getEffectiveDateInput()).to.eq('2001-01-01');
    await this.employeeSelectLastOption();
    await this.supervisorSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
