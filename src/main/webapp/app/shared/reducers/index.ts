import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import address, {
  AddressState
} from 'app/entities/address/address.reducer';
// prettier-ignore
import awardType, {
  AwardTypeState
} from 'app/entities/award-type/award-type.reducer';
// prettier-ignore
import companyBank, {
  CompanyBankState
} from 'app/entities/company-bank/company-bank.reducer';
// prettier-ignore
import branch, {
  BranchState
} from 'app/entities/branch/branch.reducer';
// prettier-ignore
import timeZone, {
  TimeZoneState
} from 'app/entities/time-zone/time-zone.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import designation, {
  DesignationState
} from 'app/entities/designation/designation.reducer';
// prettier-ignore
import designationGroup, {
  DesignationGroupState
} from 'app/entities/designation-group/designation-group.reducer';
// prettier-ignore
import division, {
  DivisionState
} from 'app/entities/division/division.reducer';
// prettier-ignore
import documentCategory, {
  DocumentCategoryState
} from 'app/entities/document-category/document-category.reducer';
// prettier-ignore
import education, {
  EducationState
} from 'app/entities/education/education.reducer';
// prettier-ignore
import educationGroup, {
  EducationGroupState
} from 'app/entities/education-group/education-group.reducer';
// prettier-ignore
import educationInstitute, {
  EducationInstituteState
} from 'app/entities/education-institute/education-institute.reducer';
// prettier-ignore
import maritalStatus, {
  MaritalStatusState
} from 'app/entities/marital-status/marital-status.reducer';
// prettier-ignore
import grade, {
  GradeState
} from 'app/entities/grade/grade.reducer';
// prettier-ignore
import jobBase, {
  JobBaseState
} from 'app/entities/job-base/job-base.reducer';
// prettier-ignore
import jobGroup, {
  JobGroupState
} from 'app/entities/job-group/job-group.reducer';
// prettier-ignore
import jobLevel, {
  JobLevelState
} from 'app/entities/job-level/job-level.reducer';
// prettier-ignore
import jobStatus, {
  JobStatusState
} from 'app/entities/job-status/job-status.reducer';
// prettier-ignore
import language, {
  LanguageState
} from 'app/entities/language/language.reducer';
// prettier-ignore
import languageProficiency, {
  LanguageProficiencyState
} from 'app/entities/language-proficiency/language-proficiency.reducer';
// prettier-ignore
import personalRelationship, {
  PersonalRelationshipState
} from 'app/entities/personal-relationship/personal-relationship.reducer';
// prettier-ignore
import religion, {
  ReligionState
} from 'app/entities/religion/religion.reducer';
// prettier-ignore
import state, {
  StateState
} from 'app/entities/state/state.reducer';
// prettier-ignore
import talentType, {
  TalentTypeState
} from 'app/entities/talent-type/talent-type.reducer';
// prettier-ignore
import unit, {
  UnitState
} from 'app/entities/unit/unit.reducer';
// prettier-ignore
import warningType, {
  WarningTypeState
} from 'app/entities/warning-type/warning-type.reducer';
// prettier-ignore
import employeeBasicInfo, {
  EmployeeBasicInfoState
} from 'app/entities/employee-basic-info/employee-basic-info.reducer';
// prettier-ignore
import employeePassport, {
  EmployeePassportState
} from 'app/entities/employee-passport/employee-passport.reducer';
// prettier-ignore
import employeeAward, {
  EmployeeAwardState
} from 'app/entities/employee-award/employee-award.reducer';
// prettier-ignore
import employeeBank, {
  EmployeeBankState
} from 'app/entities/employee-bank/employee-bank.reducer';
// prettier-ignore
import employeeDocument, {
  EmployeeDocumentState
} from 'app/entities/employee-document/employee-document.reducer';
// prettier-ignore
import employeeEducation, {
  EmployeeEducationState
} from 'app/entities/employee-education/employee-education.reducer';
// prettier-ignore
import employeeEmployment, {
  EmployeeEmploymentState
} from 'app/entities/employee-employment/employee-employment.reducer';
// prettier-ignore
import employeeLanguage, {
  EmployeeLanguageState
} from 'app/entities/employee-language/employee-language.reducer';
// prettier-ignore
import employeeAddress, {
  EmployeeAddressState
} from 'app/entities/employee-address/employee-address.reducer';
// prettier-ignore
import employeeTalent, {
  EmployeeTalentState
} from 'app/entities/employee-talent/employee-talent.reducer';
// prettier-ignore
import employeeSupervisor, {
  EmployeeSupervisorState
} from 'app/entities/employee-supervisor/employee-supervisor.reducer';
// prettier-ignore
import employeeWarning, {
  EmployeeWarningState
} from 'app/entities/employee-warning/employee-warning.reducer';
// prettier-ignore
import employmentCategory, {
  EmploymentCategoryState
} from 'app/entities/employment-category/employment-category.reducer';
// prettier-ignore
import employeeFamily, {
  EmployeeFamilyState
} from 'app/entities/employee-family/employee-family.reducer';
// prettier-ignore
import functionalDesignation, {
  FunctionalDesignationState
} from 'app/entities/functional-designation/functional-designation.reducer';
// prettier-ignore
import employeeJobStatus, {
  EmployeeJobStatusState
} from 'app/entities/employee-job-status/employee-job-status.reducer';
// prettier-ignore
import employeeDivision, {
  EmployeeDivisionState
} from 'app/entities/employee-division/employee-division.reducer';
// prettier-ignore
import bloodGroup, {
  BloodGroupState
} from 'app/entities/blood-group/blood-group.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly address: AddressState;
  readonly awardType: AwardTypeState;
  readonly companyBank: CompanyBankState;
  readonly branch: BranchState;
  readonly timeZone: TimeZoneState;
  readonly city: CityState;
  readonly country: CountryState;
  readonly department: DepartmentState;
  readonly designation: DesignationState;
  readonly designationGroup: DesignationGroupState;
  readonly division: DivisionState;
  readonly documentCategory: DocumentCategoryState;
  readonly education: EducationState;
  readonly educationGroup: EducationGroupState;
  readonly educationInstitute: EducationInstituteState;
  readonly maritalStatus: MaritalStatusState;
  readonly grade: GradeState;
  readonly jobBase: JobBaseState;
  readonly jobGroup: JobGroupState;
  readonly jobLevel: JobLevelState;
  readonly jobStatus: JobStatusState;
  readonly language: LanguageState;
  readonly languageProficiency: LanguageProficiencyState;
  readonly personalRelationship: PersonalRelationshipState;
  readonly religion: ReligionState;
  readonly state: StateState;
  readonly talentType: TalentTypeState;
  readonly unit: UnitState;
  readonly warningType: WarningTypeState;
  readonly employeeBasicInfo: EmployeeBasicInfoState;
  readonly employeePassport: EmployeePassportState;
  readonly employeeAward: EmployeeAwardState;
  readonly employeeBank: EmployeeBankState;
  readonly employeeDocument: EmployeeDocumentState;
  readonly employeeEducation: EmployeeEducationState;
  readonly employeeEmployment: EmployeeEmploymentState;
  readonly employeeLanguage: EmployeeLanguageState;
  readonly employeeAddress: EmployeeAddressState;
  readonly employeeTalent: EmployeeTalentState;
  readonly employeeSupervisor: EmployeeSupervisorState;
  readonly employeeWarning: EmployeeWarningState;
  readonly employmentCategory: EmploymentCategoryState;
  readonly employeeFamily: EmployeeFamilyState;
  readonly functionalDesignation: FunctionalDesignationState;
  readonly employeeJobStatus: EmployeeJobStatusState;
  readonly employeeDivision: EmployeeDivisionState;
  readonly bloodGroup: BloodGroupState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  address,
  awardType,
  companyBank,
  branch,
  timeZone,
  city,
  country,
  department,
  designation,
  designationGroup,
  division,
  documentCategory,
  education,
  educationGroup,
  educationInstitute,
  maritalStatus,
  grade,
  jobBase,
  jobGroup,
  jobLevel,
  jobStatus,
  language,
  languageProficiency,
  personalRelationship,
  religion,
  state,
  talentType,
  unit,
  warningType,
  employeeBasicInfo,
  employeePassport,
  employeeAward,
  employeeBank,
  employeeDocument,
  employeeEducation,
  employeeEmployment,
  employeeLanguage,
  employeeAddress,
  employeeTalent,
  employeeSupervisor,
  employeeWarning,
  employmentCategory,
  employeeFamily,
  functionalDesignation,
  employeeJobStatus,
  employeeDivision,
  bloodGroup,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
