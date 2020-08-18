import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeFamilyUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeFamily.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#employee-family-name'));
  dobInput: ElementFinder = element(by.css('input#employee-family-dob'));
  nidInput: ElementFinder = element(by.css('input#employee-family-nid'));
  phoneInput: ElementFinder = element(by.css('input#employee-family-phone'));
  professionInput: ElementFinder = element(by.css('input#employee-family-profession'));
  genderSelect: ElementFinder = element(by.css('select#employee-family-gender'));
  employeeRelationshipSelect: ElementFinder = element(by.css('select#employee-family-employeeRelationship'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDobInput(dob) {
    await this.dobInput.sendKeys(dob);
  }

  async getDobInput() {
    return this.dobInput.getAttribute('value');
  }

  async setNidInput(nid) {
    await this.nidInput.sendKeys(nid);
  }

  async getNidInput() {
    return this.nidInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setProfessionInput(profession) {
    await this.professionInput.sendKeys(profession);
  }

  async getProfessionInput() {
    return this.professionInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  async employeeRelationshipSelectLastOption() {
    await this.employeeRelationshipSelect.all(by.tagName('option')).last().click();
  }

  async employeeRelationshipSelectOption(option) {
    await this.employeeRelationshipSelect.sendKeys(option);
  }

  getEmployeeRelationshipSelect() {
    return this.employeeRelationshipSelect;
  }

  async getEmployeeRelationshipSelectedOption() {
    return this.employeeRelationshipSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('sLvh');
    expect(await this.getNameInput()).to.match(/sLvh/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDobInput('01-01-2001');
    expect(await this.getDobInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setNidInput('nid');
    expect(await this.getNidInput()).to.match(/nid/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('phone');
    expect(await this.getPhoneInput()).to.match(/phone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProfessionInput('profession');
    expect(await this.getProfessionInput()).to.match(/profession/);
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await this.employeeRelationshipSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
