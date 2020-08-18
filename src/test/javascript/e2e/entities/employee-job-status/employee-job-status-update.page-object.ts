import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeJobStatusUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeJobStatus.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  jobStatusEfDateInput: ElementFinder = element(by.css('input#employee-job-status-jobStatusEfDate'));
  jobBaseEfDateInput: ElementFinder = element(by.css('input#employee-job-status-jobBaseEfDate'));
  employmentCatEfDateInput: ElementFinder = element(by.css('input#employee-job-status-employmentCatEfDate'));
  designationEfDateInput: ElementFinder = element(by.css('input#employee-job-status-designationEfDate'));
  jobLevelEfDateInput: ElementFinder = element(by.css('input#employee-job-status-jobLevelEfDate'));
  functionalDesignationEfDateInput: ElementFinder = element(by.css('input#employee-job-status-functionalDesignationEfDate'));
  jobStatusSelect: ElementFinder = element(by.css('select#employee-job-status-jobStatus'));
  jobBaseSelect: ElementFinder = element(by.css('select#employee-job-status-jobBase'));
  employmentCategorySelect: ElementFinder = element(by.css('select#employee-job-status-employmentCategory'));
  designationSelect: ElementFinder = element(by.css('select#employee-job-status-designation'));
  jobLevelSelect: ElementFinder = element(by.css('select#employee-job-status-jobLevel'));
  functionalDesignationSelect: ElementFinder = element(by.css('select#employee-job-status-functionalDesignation'));
  employeeSelect: ElementFinder = element(by.css('select#employee-job-status-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setJobStatusEfDateInput(jobStatusEfDate) {
    await this.jobStatusEfDateInput.sendKeys(jobStatusEfDate);
  }

  async getJobStatusEfDateInput() {
    return this.jobStatusEfDateInput.getAttribute('value');
  }

  async setJobBaseEfDateInput(jobBaseEfDate) {
    await this.jobBaseEfDateInput.sendKeys(jobBaseEfDate);
  }

  async getJobBaseEfDateInput() {
    return this.jobBaseEfDateInput.getAttribute('value');
  }

  async setEmploymentCatEfDateInput(employmentCatEfDate) {
    await this.employmentCatEfDateInput.sendKeys(employmentCatEfDate);
  }

  async getEmploymentCatEfDateInput() {
    return this.employmentCatEfDateInput.getAttribute('value');
  }

  async setDesignationEfDateInput(designationEfDate) {
    await this.designationEfDateInput.sendKeys(designationEfDate);
  }

  async getDesignationEfDateInput() {
    return this.designationEfDateInput.getAttribute('value');
  }

  async setJobLevelEfDateInput(jobLevelEfDate) {
    await this.jobLevelEfDateInput.sendKeys(jobLevelEfDate);
  }

  async getJobLevelEfDateInput() {
    return this.jobLevelEfDateInput.getAttribute('value');
  }

  async setFunctionalDesignationEfDateInput(functionalDesignationEfDate) {
    await this.functionalDesignationEfDateInput.sendKeys(functionalDesignationEfDate);
  }

  async getFunctionalDesignationEfDateInput() {
    return this.functionalDesignationEfDateInput.getAttribute('value');
  }

  async jobStatusSelectLastOption() {
    await this.jobStatusSelect.all(by.tagName('option')).last().click();
  }

  async jobStatusSelectOption(option) {
    await this.jobStatusSelect.sendKeys(option);
  }

  getJobStatusSelect() {
    return this.jobStatusSelect;
  }

  async getJobStatusSelectedOption() {
    return this.jobStatusSelect.element(by.css('option:checked')).getText();
  }

  async jobBaseSelectLastOption() {
    await this.jobBaseSelect.all(by.tagName('option')).last().click();
  }

  async jobBaseSelectOption(option) {
    await this.jobBaseSelect.sendKeys(option);
  }

  getJobBaseSelect() {
    return this.jobBaseSelect;
  }

  async getJobBaseSelectedOption() {
    return this.jobBaseSelect.element(by.css('option:checked')).getText();
  }

  async employmentCategorySelectLastOption() {
    await this.employmentCategorySelect.all(by.tagName('option')).last().click();
  }

  async employmentCategorySelectOption(option) {
    await this.employmentCategorySelect.sendKeys(option);
  }

  getEmploymentCategorySelect() {
    return this.employmentCategorySelect;
  }

  async getEmploymentCategorySelectedOption() {
    return this.employmentCategorySelect.element(by.css('option:checked')).getText();
  }

  async designationSelectLastOption() {
    await this.designationSelect.all(by.tagName('option')).last().click();
  }

  async designationSelectOption(option) {
    await this.designationSelect.sendKeys(option);
  }

  getDesignationSelect() {
    return this.designationSelect;
  }

  async getDesignationSelectedOption() {
    return this.designationSelect.element(by.css('option:checked')).getText();
  }

  async jobLevelSelectLastOption() {
    await this.jobLevelSelect.all(by.tagName('option')).last().click();
  }

  async jobLevelSelectOption(option) {
    await this.jobLevelSelect.sendKeys(option);
  }

  getJobLevelSelect() {
    return this.jobLevelSelect;
  }

  async getJobLevelSelectedOption() {
    return this.jobLevelSelect.element(by.css('option:checked')).getText();
  }

  async functionalDesignationSelectLastOption() {
    await this.functionalDesignationSelect.all(by.tagName('option')).last().click();
  }

  async functionalDesignationSelectOption(option) {
    await this.functionalDesignationSelect.sendKeys(option);
  }

  getFunctionalDesignationSelect() {
    return this.functionalDesignationSelect;
  }

  async getFunctionalDesignationSelectedOption() {
    return this.functionalDesignationSelect.element(by.css('option:checked')).getText();
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
    await this.setJobStatusEfDateInput('01-01-2001');
    expect(await this.getJobStatusEfDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setJobBaseEfDateInput('01-01-2001');
    expect(await this.getJobBaseEfDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setEmploymentCatEfDateInput('01-01-2001');
    expect(await this.getEmploymentCatEfDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDesignationEfDateInput('01-01-2001');
    expect(await this.getDesignationEfDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setJobLevelEfDateInput('01-01-2001');
    expect(await this.getJobLevelEfDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setFunctionalDesignationEfDateInput('01-01-2001');
    expect(await this.getFunctionalDesignationEfDateInput()).to.eq('2001-01-01');
    await this.jobStatusSelectLastOption();
    await this.jobBaseSelectLastOption();
    await this.employmentCategorySelectLastOption();
    await this.designationSelectLastOption();
    await this.jobLevelSelectLastOption();
    await this.functionalDesignationSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
