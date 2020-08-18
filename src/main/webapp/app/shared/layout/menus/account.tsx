// import React from 'react';
// import MenuItem from 'app/shared/layout/menus/menu-item';
// import { DropdownItem } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { NavLink as Link } from 'react-router-dom';
// import { Translate, translate } from 'react-jhipster';
// import { NavDropdown } from './menu-components';

// const accountMenuItemsAuthenticated = (
//   <>
//     <MenuItem icon="wrench" to="/account/settings">
//       <Translate contentKey="global.menu.account.settings">Settings</Translate>
//     </MenuItem>
//     <MenuItem icon="lock" to="/account/password">
//       <Translate contentKey="global.menu.account.password">Password</Translate>
//     </MenuItem>
//     <MenuItem icon="sign-out-alt" to="/logout">
//       <Translate contentKey="global.menu.account.logout">Sign out</Translate>
//     </MenuItem>
//   </>
// );

// const accountMenuItems = (
//   <>
//     <MenuItem id="login-item" icon="sign-in-alt" to="/login">
//       <Translate contentKey="global.menu.account.login">Sign in</Translate>
//     </MenuItem>
//     <MenuItem icon="sign-in-alt" to="/account/register">
//       <Translate contentKey="global.menu.account.register">Register</Translate>
//     </MenuItem>
//   </>
// );

// export const AccountMenu = ({ isAuthenticated = false }) => (
//   <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
//     {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
//   </NavDropdown>
// );

// export default AccountMenu;

import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

// const accountMenuItemsAuthenticated = (
//   <>
//     <MenuItem icon="wrench" to="/account/settings">
//       <Translate contentKey="global.menu.account.settings">Settings</Translate>
//     </MenuItem>
//     <MenuItem icon="lock" to="/account/password">
//       <Translate contentKey="global.menu.account.password">Password</Translate>
//     </MenuItem>
//     <MenuItem icon="sign-out-alt" to="/logout">
//       <Translate contentKey="global.menu.account.logout">Sign out</Translate>
//     </MenuItem>
//   </>
// );

// const accountMenuItems = (
//   <>
//     <MenuItem id="login-item" icon="sign-in-alt" to="/login">
//       <Translate contentKey="global.menu.account.login">Sign in</Translate>
//     </MenuItem>
//     <MenuItem icon="sign-in-alt" to="/account/register">
//       <Translate contentKey="global.menu.account.register">Register</Translate>
//     </MenuItem>
//   </>
// );

// export const AccountMenu = ({ isAuthenticated = false }) => (
//   <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
//     {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
//   </NavDropdown>
// );

// export default AccountMenu;

export const AccountMenu = props => (
  <>
    <li className="nav-item has-treeview">
      <Link to="#" className="nav-link">
        <i className="nav-icon fa fa-user" />
        <p>
          Account
          <i className="right fa fa-angle-left" />
        </p>
      </Link>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="/account/settings" className="nav-link">
            <i className="nav-icon fa fa-wrench" />
            <p>
              <Translate contentKey="global.menu.account.settings">Settings</Translate>
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account/password" className="nav-link">
            <i className="nav-icon fa fa-lock" />
            <p>
              <Translate contentKey="global.menu.account.password">Password</Translate>
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            <i className="nav-icon fa fa-sign-out" />
            <p>
              <Translate contentKey="global.menu.account.logout">Sign out</Translate>
            </p>
          </Link>
        </li>
      </ul>
    </li>
  </>
);



