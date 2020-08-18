import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';

const adminMenuItems = (
  <>
    <li className="nav-item">
      <Link to="/admin/user-management" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.userManagement">User management</Translate>
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/admin/metrics" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.metrics">Metrics</Translate>
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/admin/health" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.health">Health</Translate>
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/admin/configuration" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.configuration">Configuration</Translate>
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/admin/audits" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.audits">Audits</Translate>
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/admin/logs" className="nav-link">
        <i className="nav-icon fa fa-globe" />
        <p>
          <Translate contentKey="global.menu.admin.logs">Logs</Translate>
        </p>
      </Link>
    </li>
  </>
);

const swaggerItem = (
  <li className="nav-item">
    <Link to="/admin/docs" className="nav-link">
      <i className="nav-icon fa fa-book" />
      <p>
        <Translate contentKey="global.menu.admin.apidocs">API</Translate>
      </p>
    </Link>
  </li>
);

export const AdminMenu = ({ showSwagger }) => (
  <li className="nav-item has-treeview">
    <Link to="#" className="nav-link">
      <i className="nav-icon fa fa-user-plus" />
      <p>
        <Translate contentKey="global.menu.admin.main">Administration</Translate>
        <i className="right fa fa-angle-left" />
      </p>
    </Link>
    <ul className="nav nav-treeview">
      {adminMenuItems}
      {showSwagger && swaggerItem}
    </ul>
  </li>
);

export default AdminMenu;


