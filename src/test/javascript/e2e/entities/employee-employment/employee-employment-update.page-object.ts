import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeEmploymentUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeEmployment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  companyNameInput: ElementFinder = element(by.css('input#employee-employment-companyName'));
  addressInput: ElementFinder = element(by.css('input#employee-employment-address'));
  jobTitleInput: ElementFinder = element(by.css('input#employee-employment-jobTitle'));
  startDateInput: ElementFinder = element(by.css('input#employee-employment-startDate'));
  endDateInput: ElementFinder = element(by.css('input#employee-employment-endDate'));
  lastSalaryInput: ElementFinder = element(by.css('input#employee-employment-lastSalary'));
  remarksInput: ElementFinder = element(by.css('input#employee-employment-remarks'));
  employeeSelect: ElementFinder = element(by.css('select#employee-employment-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCompanyNameInput(companyName) {
    await this.companyNameInput.sendKeys(companyName);
  }

  async getCompanyNameInput() {
    return this.companyNameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setJobTitleInput(jobTitle) {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput() {
    return this.jobTitleInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setLastSalaryInput(lastSalary) {
    await this.lastSalaryInput.sendKeys(lastSalary);
  }

  async getLastSalaryInput() {
    return this.lastSalaryInput.getAttribute('value');
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
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
    await this.setCompanyNameInput('companyName');
    expect(await this.getCompanyNameInput()).to.match(/companyName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setJobTitleInput('jobTitle');
    expect(await this.getJobTitleInput()).to.match(/jobTitle/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStartDateInput('01-01-2001');
    expect(await this.getStartDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setEndDateInput('01-01-2001');
    expect(await this.getEndDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastSalaryInput('5');
    expect(await this.getLastSalaryInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
