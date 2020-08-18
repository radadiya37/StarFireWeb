import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeTalentUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeTalent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  remarksInput: ElementFinder = element(by.css('input#employee-talent-remarks'));
  talentTypeSelect: ElementFinder = element(by.css('select#employee-talent-talentType'));
  employeeSelect: ElementFinder = element(by.css('select#employee-talent-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRemarksInput(remarks) {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput() {
    return this.remarksInput.getAttribute('value');
  }

  async talentTypeSelectLastOption() {
    await this.talentTypeSelect.all(by.tagName('option')).last().click();
  }

  async talentTypeSelectOption(option) {
    await this.talentTypeSelect.sendKeys(option);
  }

  getTalentTypeSelect() {
    return this.talentTypeSelect;
  }

  async getTalentTypeSelectedOption() {
    return this.talentTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setRemarksInput('remarks');
    expect(await this.getRemarksInput()).to.match(/remarks/);
    await this.talentTypeSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
