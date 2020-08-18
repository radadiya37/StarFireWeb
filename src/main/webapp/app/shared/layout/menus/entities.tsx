// import React from 'react';
// import MenuItem from 'app/shared/layout/menus/menu-item';
// import { DropdownItem } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Translate, translate } from 'react-jhipster';
// import { NavLink as Link } from 'react-router-dom';
// import { NavDropdown } from './menu-components';

// export const EntitiesMenu = props => (
//   <NavDropdown
//     icon="th-list"
//     name={translate('global.menu.entities.main')}
//     id="entity-menu"
//     style={{ maxHeight: '80vh', overflow: 'auto' }}
//   >
//     <MenuItem icon="asterisk" to="/address">
//       <Translate contentKey="global.menu.entities.address" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/award-type">
//       <Translate contentKey="global.menu.entities.awardType" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/company-bank">
//       <Translate contentKey="global.menu.entities.companyBank" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/branch">
//       <Translate contentKey="global.menu.entities.branch" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/time-zone">
//       <Translate contentKey="global.menu.entities.timeZone" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/city">
//       <Translate contentKey="global.menu.entities.city" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/country">
//       <Translate contentKey="global.menu.entities.country" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/department">
//       <Translate contentKey="global.menu.entities.department" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/designation">
//       <Translate contentKey="global.menu.entities.designation" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/designation-group">
//       <Translate contentKey="global.menu.entities.designationGroup" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/division">
//       <Translate contentKey="global.menu.entities.division" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/document-category">
//       <Translate contentKey="global.menu.entities.documentCategory" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/education">
//       <Translate contentKey="global.menu.entities.education" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/education-group">
//       <Translate contentKey="global.menu.entities.educationGroup" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/education-institute">
//       <Translate contentKey="global.menu.entities.educationInstitute" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/marital-status">
//       <Translate contentKey="global.menu.entities.maritalStatus" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/grade">
//       <Translate contentKey="global.menu.entities.grade" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/job-base">
//       <Translate contentKey="global.menu.entities.jobBase" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/job-group">
//       <Translate contentKey="global.menu.entities.jobGroup" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/job-level">
//       <Translate contentKey="global.menu.entities.jobLevel" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/job-status">
//       <Translate contentKey="global.menu.entities.jobStatus" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/language">
//       <Translate contentKey="global.menu.entities.language" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/language-proficiency">
//       <Translate contentKey="global.menu.entities.languageProficiency" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/personal-relationship">
//       <Translate contentKey="global.menu.entities.personalRelationship" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/religion">
//       <Translate contentKey="global.menu.entities.religion" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/state">
//       <Translate contentKey="global.menu.entities.state" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/talent-type">
//       <Translate contentKey="global.menu.entities.talentType" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/unit">
//       <Translate contentKey="global.menu.entities.unit" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/warning-type">
//       <Translate contentKey="global.menu.entities.warningType" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-basic-info">
//       <Translate contentKey="global.menu.entities.employeeBasicInfo" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-passport">
//       <Translate contentKey="global.menu.entities.employeePassport" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-award">
//       <Translate contentKey="global.menu.entities.employeeAward" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-bank">
//       <Translate contentKey="global.menu.entities.employeeBank" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-document">
//       <Translate contentKey="global.menu.entities.employeeDocument" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-education">
//       <Translate contentKey="global.menu.entities.employeeEducation" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-employment">
//       <Translate contentKey="global.menu.entities.employeeEmployment" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-language">
//       <Translate contentKey="global.menu.entities.employeeLanguage" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-address">
//       <Translate contentKey="global.menu.entities.employeeAddress" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-talent">
//       <Translate contentKey="global.menu.entities.employeeTalent" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-supervisor">
//       <Translate contentKey="global.menu.entities.employeeSupervisor" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-warning">
//       <Translate contentKey="global.menu.entities.employeeWarning" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employment-category">
//       <Translate contentKey="global.menu.entities.employmentCategory" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-family">
//       <Translate contentKey="global.menu.entities.employeeFamily" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/functional-designation">
//       <Translate contentKey="global.menu.entities.functionalDesignation" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-job-status">
//       <Translate contentKey="global.menu.entities.employeeJobStatus" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/employee-division">
//       <Translate contentKey="global.menu.entities.employeeDivision" />
//     </MenuItem>
//     <MenuItem icon="asterisk" to="/blood-group">
//       <Translate contentKey="global.menu.entities.bloodGroup" />
//     </MenuItem>
//     {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
//   </NavDropdown>
// );

import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <>
    <li className="nav-item has-treeview">
      <Link to="#" className="nav-link">
        <i className="nav-icon fa fa-user" />
        <p>
          <Translate contentKey="global.menu.entities.main">Entities</Translate>
          <i className="right fa fa-angle-left" />
        </p>
      </Link>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="/entity/address" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.address" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/award-type" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.awardType" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/company-bank" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.companyBank" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/branch" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.branch" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/time-zone" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.timeZone" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/city" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.city" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/country" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.country" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/department" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.department" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/designation" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.designation" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/designation-group" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.designationGroup" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/marital-status" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.maritalStatus" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/grade" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.grade" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/job-base" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.jobBase" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/job-group" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.jobGroup" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/job-level" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.jobLevel" />
            </p>
          </Link>
        </li><li className="nav-item">
          <Link to="/entity/job-status" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.jobStatus" />
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/entity/language" className="nav-link">
            <i className="nav-icon fa fa-globe" />
            <p>
              <Translate contentKey="global.menu.entities.language" />
            </p>
          </Link>
        </li>
      </ul>
    </li>
  </>
);

export const SignInMenu = props => (
  <>
    <li className="nav-item has-treeview">
      <Link to="#" className="nav-link">
        <i className="nav-icon fa fa-user" />
        <p>
          <Translate contentKey="global.menu.account.main">Account</Translate>
          <i className="right fa fa-angle-left" />
        </p>
      </Link>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="nav-icon fa fa-sign-in" />
            <p>
              <Translate contentKey="global.menu.account.login">Sign in</Translate>
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account/register" className="nav-link">
            <i className="nav-icon fa fa-sign-in" />
            <p>
              <Translate contentKey="global.menu.account.register">Register</Translate>
            </p>
          </Link>
        </li>
      </ul>
    </li>
  </>
);
