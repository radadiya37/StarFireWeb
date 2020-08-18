import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Address from './address';
import AwardType from './award-type';
import CompanyBank from './company-bank';
import Branch from './branch';
import TimeZone from './time-zone';
import City from './city';
import Country from './country';
import Department from './department';
import Designation from './designation';
import DesignationGroup from './designation-group';
import Division from './division';
import DocumentCategory from './document-category';
import Education from './education';
import EducationGroup from './education-group';
import EducationInstitute from './education-institute';
import MaritalStatus from './marital-status';
import Grade from './grade';
import JobBase from './job-base';
import JobGroup from './job-group';
import JobLevel from './job-level';
import JobStatus from './job-status';
import Language from './language';
import LanguageProficiency from './language-proficiency';
import PersonalRelationship from './personal-relationship';
import Religion from './religion';
import State from './state';
import TalentType from './talent-type';
import Unit from './unit';
import WarningType from './warning-type';
import EmployeeBasicInfo from './employee-basic-info';
import EmployeePassport from './employee-passport';
import EmployeeAward from './employee-award';
import EmployeeBank from './employee-bank';
import EmployeeDocument from './employee-document';
import EmployeeEducation from './employee-education';
import EmployeeEmployment from './employee-employment';
import EmployeeLanguage from './employee-language';
import EmployeeAddress from './employee-address';
import EmployeeTalent from './employee-talent';
import EmployeeSupervisor from './employee-supervisor';
import EmployeeWarning from './employee-warning';
import EmploymentCategory from './employment-category';
import EmployeeFamily from './employee-family';
import FunctionalDesignation from './functional-designation';
import EmployeeJobStatus from './employee-job-status';
import EmployeeDivision from './employee-division';
import BloodGroup from './blood-group';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}/award-type`} component={AwardType} />
      <ErrorBoundaryRoute path={`${match.url}/company-bank`} component={CompanyBank} />
      <ErrorBoundaryRoute path={`${match.url}/branch`} component={Branch} />
      <ErrorBoundaryRoute path={`${match.url}/time-zone`} component={TimeZone} />
      <ErrorBoundaryRoute path={`${match.url}/city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}/designation`} component={Designation} />
      <ErrorBoundaryRoute path={`${match.url}/designation-group`} component={DesignationGroup} />
      <ErrorBoundaryRoute path={`${match.url}/division`} component={Division} />
      <ErrorBoundaryRoute path={`${match.url}/document-category`} component={DocumentCategory} />
      <ErrorBoundaryRoute path={`${match.url}/education`} component={Education} />
      <ErrorBoundaryRoute path={`${match.url}/education-group`} component={EducationGroup} />
      <ErrorBoundaryRoute path={`${match.url}/education-institute`} component={EducationInstitute} />
      <ErrorBoundaryRoute path={`${match.url}/marital-status`} component={MaritalStatus} />
      <ErrorBoundaryRoute path={`${match.url}/grade`} component={Grade} />
      <ErrorBoundaryRoute path={`${match.url}/job-base`} component={JobBase} />
      <ErrorBoundaryRoute path={`${match.url}/job-group`} component={JobGroup} />
      <ErrorBoundaryRoute path={`${match.url}/job-level`} component={JobLevel} />
      <ErrorBoundaryRoute path={`${match.url}/job-status`} component={JobStatus} />
      <ErrorBoundaryRoute path={`${match.url}/language`} component={Language} />
      <ErrorBoundaryRoute path={`${match.url}/language-proficiency`} component={LanguageProficiency} />
      <ErrorBoundaryRoute path={`${match.url}/personal-relationship`} component={PersonalRelationship} />
      <ErrorBoundaryRoute path={`${match.url}/religion`} component={Religion} />
      <ErrorBoundaryRoute path={`${match.url}/state`} component={State} />
      <ErrorBoundaryRoute path={`${match.url}/talent-type`} component={TalentType} />
      <ErrorBoundaryRoute path={`${match.url}/unit`} component={Unit} />
      <ErrorBoundaryRoute path={`${match.url}/warning-type`} component={WarningType} />
      <ErrorBoundaryRoute path={`${match.url}/employee-basic-info`} component={EmployeeBasicInfo} />
      <ErrorBoundaryRoute path={`${match.url}/employee-passport`} component={EmployeePassport} />
      <ErrorBoundaryRoute path={`${match.url}/employee-award`} component={EmployeeAward} />
      <ErrorBoundaryRoute path={`${match.url}/employee-bank`} component={EmployeeBank} />
      <ErrorBoundaryRoute path={`${match.url}/employee-document`} component={EmployeeDocument} />
      <ErrorBoundaryRoute path={`${match.url}/employee-education`} component={EmployeeEducation} />
      <ErrorBoundaryRoute path={`${match.url}/employee-employment`} component={EmployeeEmployment} />
      <ErrorBoundaryRoute path={`${match.url}/employee-language`} component={EmployeeLanguage} />
      <ErrorBoundaryRoute path={`${match.url}/employee-address`} component={EmployeeAddress} />
      <ErrorBoundaryRoute path={`${match.url}/employee-talent`} component={EmployeeTalent} />
      <ErrorBoundaryRoute path={`${match.url}/employee-supervisor`} component={EmployeeSupervisor} />
      <ErrorBoundaryRoute path={`${match.url}/employee-warning`} component={EmployeeWarning} />
      <ErrorBoundaryRoute path={`${match.url}/employment-category`} component={EmploymentCategory} />
      <ErrorBoundaryRoute path={`${match.url}/employee-family`} component={EmployeeFamily} />
      <ErrorBoundaryRoute path={`${match.url}/functional-designation`} component={FunctionalDesignation} />
      <ErrorBoundaryRoute path={`${match.url}/employee-job-status`} component={EmployeeJobStatus} />
      <ErrorBoundaryRoute path={`${match.url}/employee-division`} component={EmployeeDivision} />
      <ErrorBoundaryRoute path={`${match.url}/blood-group`} component={BloodGroup} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
