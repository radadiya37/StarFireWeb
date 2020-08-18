import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeEducationUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeEducation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  passedYearInput: ElementFinder = element(by.css('input#employee-education-passedYear'));
  cgpaInput: ElementFinder = element(by.css('input#employee-education-cgpa'));
  scaleInput: ElementFinder = element(by.css('input#employee-education-scale'));
  hasForeignDegreeInput: ElementFinder = element(by.css('input#employee-education-hasForeignDegree'));
  isProfessionalInput: ElementFinder = element(by.css('input#employee-education-isProfessional'));
  isLastEducationInput: ElementFinder = element(by.css('input#employee-education-isLastEducation'));
  educationSelect: ElementFinder = element(by.css('select#employee-education-education'));
  gradeSelect: ElementFinder = element(by.css('select#employee-education-grade'));
  instituteSelect: ElementFinder = element(by.css('select#employee-education-institute'));
  employeeSelect: ElementFinder = element(by.css('select#employee-education-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPassedYearInput(passedYear) {
    await this.passedYearInput.sendKeys(passedYear);
  }

  async getPassedYearInput() {
    return this.passedYearInput.getAttribute('value');
  }

  async setCgpaInput(cgpa) {
    await this.cgpaInput.sendKeys(cgpa);
  }

  async getCgpaInput() {
    return this.cgpaInput.getAttribute('value');
  }

  async setScaleInput(scale) {
    await this.scaleInput.sendKeys(scale);
  }

  async getScaleInput() {
    return this.scaleInput.getAttribute('value');
  }

  getHasForeignDegreeInput() {
    return this.hasForeignDegreeInput;
  }
  getIsProfessionalInput() {
    return this.isProfessionalInput;
  }
  getIsLastEducationInput() {
    return this.isLastEducationInput;
  }
  async educationSelectLastOption() {
    await this.educationSelect.all(by.tagName('option')).last().click();
  }

  async educationSelectOption(option) {
    await this.educationSelect.sendKeys(option);
  }

  getEducationSelect() {
    return this.educationSelect;
  }

  async getEducationSelectedOption() {
    return this.educationSelect.element(by.css('option:checked')).getText();
  }

  async gradeSelectLastOption() {
    await this.gradeSelect.all(by.tagName('option')).last().click();
  }

  async gradeSelectOption(option) {
    await this.gradeSelect.sendKeys(option);
  }

  getGradeSelect() {
    return this.gradeSelect;
  }

  async getGradeSelectedOption() {
    return this.gradeSelect.element(by.css('option:checked')).getText();
  }

  async instituteSelectLastOption() {
    await this.instituteSelect.all(by.tagName('option')).last().click();
  }

  async instituteSelectOption(option) {
    await this.instituteSelect.sendKeys(option);
  }

  getInstituteSelect() {
    return this.instituteSelect;
  }

  async getInstituteSelectedOption() {
    return this.instituteSelect.element(by.css('option:checked')).getText();
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
    await this.setPassedYearInput('5');
    expect(await this.getPassedYearInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCgpaInput('5');
    expect(await this.getCgpaInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setScaleInput('5');
    expect(await this.getScaleInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedHasForeignDegree = await this.getHasForeignDegreeInput().isSelected();
    if (selectedHasForeignDegree) {
      await this.getHasForeignDegreeInput().click();
      expect(await this.getHasForeignDegreeInput().isSelected()).to.be.false;
    } else {
      await this.getHasForeignDegreeInput().click();
      expect(await this.getHasForeignDegreeInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedIsProfessional = await this.getIsProfessionalInput().isSelected();
    if (selectedIsProfessional) {
      await this.getIsProfessionalInput().click();
      expect(await this.getIsProfessionalInput().isSelected()).to.be.false;
    } else {
      await this.getIsProfessionalInput().click();
      expect(await this.getIsProfessionalInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedIsLastEducation = await this.getIsLastEducationInput().isSelected();
    if (selectedIsLastEducation) {
      await this.getIsLastEducationInput().click();
      expect(await this.getIsLastEducationInput().isSelected()).to.be.false;
    } else {
      await this.getIsLastEducationInput().click();
      expect(await this.getIsLastEducationInput().isSelected()).to.be.true;
    }
    await this.educationSelectLastOption();
    await this.gradeSelectLastOption();
    await this.instituteSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
