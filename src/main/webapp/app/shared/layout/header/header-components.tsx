import React from 'react';
import { Translate } from 'react-jhipster';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavItem, NavLink, NavbarBrand, BreadcrumbItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

const STYLE = {
  logoOpacity: {
    opacity: 0.8
  }
};

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id} className="nav-item has-treeview">
    <DropdownToggle nav>
      <i className={props.icon} />
      <p>
        <span>
          <Translate contentKey="global.menu.language">Language</Translate>
        </span>
        <i className="right fa fa-angle-left" />
      </p>
    </DropdownToggle>
    <DropdownMenu>{props.children}</DropdownMenu>
  </UncontrolledDropdown>
);

export const NavDropdown1 = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export const NAVLink = props => (
  <li className="nav-item">
    <Link to={props.to} className="nav-link">
      <i className={props.icon} />
      <p>
        <Translate contentKey={props.contentKey} />
      </p>
    </Link>
  </li>
);

export const BrandIcon1 = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-gcd.png" alt="Logo" />
  </div>
);
export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-gcd.png" alt="Logo" className="brand-image" style={STYLE.logoOpacity} />
  </div>
);

export const Brand1 = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Ulis</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-link">
    <BrandIcon />
    <span className="brand-text font-weight-light">
      <Translate contentKey="global.title">Ulis</Translate>
    </span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      &nbsp;
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const ContentHeader = props => (
  <div className="content-header pt-0 pb-3">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">
            <Translate contentKey={props.contentHeadKey} />
          </h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <BreadcrumbItem icon="nav-icon fa fa-dashboard">
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            {props.children}
            <BreadcrumbItem active>
              <Translate contentKey={props.contentHeadKey} />
            </BreadcrumbItem>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

export const Content = props => (
  <section className="content">
    <div className="container-fluid">{props.children}</div>
  </section>
);
