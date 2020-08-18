import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeDivisionUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeDivision.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  effectiveDateInput: ElementFinder = element(by.css('input#employee-division-effectiveDate'));
  divisionSelect: ElementFinder = element(by.css('select#employee-division-division'));
  departmentSelect: ElementFinder = element(by.css('select#employee-division-department'));
  branchSelect: ElementFinder = element(by.css('select#employee-division-branch'));
  unitSelect: ElementFinder = element(by.css('select#employee-division-unit'));
  employeeSelect: ElementFinder = element(by.css('select#employee-division-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEffectiveDateInput(effectiveDate) {
    await this.effectiveDateInput.sendKeys(effectiveDate);
  }

  async getEffectiveDateInput() {
    return this.effectiveDateInput.getAttribute('value');
  }

  async divisionSelectLastOption() {
    await this.divisionSelect.all(by.tagName('option')).last().click();
  }

  async divisionSelectOption(option) {
    await this.divisionSelect.sendKeys(option);
  }

  getDivisionSelect() {
    return this.divisionSelect;
  }

  async getDivisionSelectedOption() {
    return this.divisionSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect.all(by.tagName('option')).last().click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
  }

  async branchSelectLastOption() {
    await this.branchSelect.all(by.tagName('option')).last().click();
  }

  async branchSelectOption(option) {
    await this.branchSelect.sendKeys(option);
  }

  getBranchSelect() {
    return this.branchSelect;
  }

  async getBranchSelectedOption() {
    return this.branchSelect.element(by.css('option:checked')).getText();
  }

  async unitSelectLastOption() {
    await this.unitSelect.all(by.tagName('option')).last().click();
  }

  async unitSelectOption(option) {
    await this.unitSelect.sendKeys(option);
  }

  getUnitSelect() {
    return this.unitSelect;
  }

  async getUnitSelectedOption() {
    return this.unitSelect.element(by.css('option:checked')).getText();
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
    await this.setEffectiveDateInput('01-01-2001');
    expect(await this.getEffectiveDateInput()).to.eq('2001-01-01');
    await this.divisionSelectLastOption();
    await this.departmentSelectLastOption();
    await this.branchSelectLastOption();
    await this.unitSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
