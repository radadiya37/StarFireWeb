import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmployeeBasicInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('starfirewebApp.employeeBasicInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#employee-basic-info-code'));
  dobInput: ElementFinder = element(by.css('input#employee-basic-info-dob'));
  personalEmailInput: ElementFinder = element(by.css('input#employee-basic-info-personalEmail'));
  phoneInput: ElementFinder = element(by.css('input#employee-basic-info-phone'));
  telephoneInput: ElementFinder = element(by.css('input#employee-basic-info-telephone'));
  nationalityInput: ElementFinder = element(by.css('input#employee-basic-info-nationality'));
  photoPathInput: ElementFinder = element(by.css('input#employee-basic-info-photoPath'));
  statusInput: ElementFinder = element(by.css('input#employee-basic-info-status'));
  genderSelect: ElementFinder = element(by.css('select#employee-basic-info-gender'));
  joinDateInput: ElementFinder = element(by.css('input#employee-basic-info-joinDate'));
  reviewMonthSelect: ElementFinder = element(by.css('select#employee-basic-info-reviewMonth'));
  userSelect: ElementFinder = element(by.css('select#employee-basic-info-user'));
  religionSelect: ElementFinder = element(by.css('select#employee-basic-info-religion'));
  maritalStatusSelect: ElementFinder = element(by.css('select#employee-basic-info-maritalStatus'));
  bloodGroupSelect: ElementFinder = element(by.css('select#employee-basic-info-bloodGroup'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setDobInput(dob) {
    await this.dobInput.sendKeys(dob);
  }

  async getDobInput() {
    return this.dobInput.getAttribute('value');
  }

  async setPersonalEmailInput(personalEmail) {
    await this.personalEmailInput.sendKeys(personalEmail);
  }

  async getPersonalEmailInput() {
    return this.personalEmailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setTelephoneInput(telephone) {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput() {
    return this.telephoneInput.getAttribute('value');
  }

  async setNationalityInput(nationality) {
    await this.nationalityInput.sendKeys(nationality);
  }

  async getNationalityInput() {
    return this.nationalityInput.getAttribute('value');
  }

  async setPhotoPathInput(photoPath) {
    await this.photoPathInput.sendKeys(photoPath);
  }

  async getPhotoPathInput() {
    return this.photoPathInput.getAttribute('value');
  }

  getStatusInput() {
    return this.statusInput;
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
  async setJoinDateInput(joinDate) {
    await this.joinDateInput.sendKeys(joinDate);
  }

  async getJoinDateInput() {
    return this.joinDateInput.getAttribute('value');
  }

  async setReviewMonthSelect(reviewMonth) {
    await this.reviewMonthSelect.sendKeys(reviewMonth);
  }

  async getReviewMonthSelect() {
    return this.reviewMonthSelect.element(by.css('option:checked')).getText();
  }

  async reviewMonthSelectLastOption() {
    await this.reviewMonthSelect.all(by.tagName('option')).last().click();
  }
  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async religionSelectLastOption() {
    await this.religionSelect.all(by.tagName('option')).last().click();
  }

  async religionSelectOption(option) {
    await this.religionSelect.sendKeys(option);
  }

  getReligionSelect() {
    return this.religionSelect;
  }

  async getReligionSelectedOption() {
    return this.religionSelect.element(by.css('option:checked')).getText();
  }

  async maritalStatusSelectLastOption() {
    await this.maritalStatusSelect.all(by.tagName('option')).last().click();
  }

  async maritalStatusSelectOption(option) {
    await this.maritalStatusSelect.sendKeys(option);
  }

  getMaritalStatusSelect() {
    return this.maritalStatusSelect;
  }

  async getMaritalStatusSelectedOption() {
    return this.maritalStatusSelect.element(by.css('option:checked')).getText();
  }

  async bloodGroupSelectLastOption() {
    await this.bloodGroupSelect.all(by.tagName('option')).last().click();
  }

  async bloodGroupSelectOption(option) {
    await this.bloodGroupSelect.sendKeys(option);
  }

  getBloodGroupSelect() {
    return this.bloodGroupSelect;
  }

  async getBloodGroupSelectedOption() {
    return this.bloodGroupSelect.element(by.css('option:checked')).getText();
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
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDobInput('01-01-2001');
    expect(await this.getDobInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setPersonalEmailInput('personalEmail');
    expect(await this.getPersonalEmailInput()).to.match(/personalEmail/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('phone');
    expect(await this.getPhoneInput()).to.match(/phone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTelephoneInput('telephone');
    expect(await this.getTelephoneInput()).to.match(/telephone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNationalityInput('nationality');
    expect(await this.getNationalityInput()).to.match(/nationality/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoPathInput('photoPath');
    expect(await this.getPhotoPathInput()).to.match(/photoPath/);
    await waitUntilDisplayed(this.saveButton);
    const selectedStatus = await this.getStatusInput().isSelected();
    if (selectedStatus) {
      await this.getStatusInput().click();
      expect(await this.getStatusInput().isSelected()).to.be.false;
    } else {
      await this.getStatusInput().click();
      expect(await this.getStatusInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setJoinDateInput('01-01-2001');
    expect(await this.getJoinDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.reviewMonthSelectLastOption();
    await this.userSelectLastOption();
    await this.religionSelectLastOption();
    await this.maritalStatusSelectLastOption();
    await this.bloodGroupSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
