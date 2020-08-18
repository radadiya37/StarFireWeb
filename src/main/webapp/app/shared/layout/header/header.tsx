// import './header.scss';

// import React, { useState } from 'react';
// import { Translate, Storage } from 'react-jhipster';
// import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { NavLink as Link } from 'react-router-dom';
// import LoadingBar from 'react-redux-loading-bar';

// import { Home, Brand } from './header-components';
// import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

// export interface IHeaderProps {
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   ribbonEnv: string;
//   isInProduction: boolean;
//   isSwaggerEnabled: boolean;
//   currentLocale: string;
//   onLocaleChange: Function;
// }

// const Header = (props: IHeaderProps) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLocaleChange = event => {
//     const langKey = event.target.value;
//     Storage.session.set('locale', langKey);
//     props.onLocaleChange(langKey);
//   };

//   const renderDevRibbon = () =>
//     props.isInProduction === false ? (
//       <div className="ribbon dev">
//         <a href="">
//           <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
//         </a>
//       </div>
//     ) : null;

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

//   return (
//     <div id="app-header">
//       {renderDevRibbon()}
//       <LoadingBar className="loading-bar" />
//       <Navbar dark expand="sm" fixed="top" className="jh-navbar">
//         <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
//         <Brand />
//         <Collapse isOpen={menuOpen} navbar>
//           <Nav id="header-tabs" className="ml-auto" navbar>
//             <Home />
//             {props.isAuthenticated && <EntitiesMenu />}
//             {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
//             <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
//             <AccountMenu isAuthenticated={props.isAuthenticated} />
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default Header;

import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu, SignInMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  userName: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
  spinner: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false,
    spinner: false
  };

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  render() {

    return (
      <div id="app-header" >
        {this.renderDevRibbon}
        < LoadingBar className="loading-bar" />
        <Navbar className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" data-widget="pushmenu" to="#">
                <i className="fa fa-bars" />
              </Link>
            </li>
            <Home />
            {/* {isAuthenticated && isAdmin ? <h4> Test </h4> : null} */}
          </ul>
        </Navbar>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <Brand />
          <div className="sidebar">
            {this.props.isAuthenticated ? (
              <div className="user-panel d-flex">
                <div className="image">
                  <img src="content/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                  <Link to="#" className="float-right">
                    {this.props.userName}
                  </Link>
                </div>
              </div>
            ) : null}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* <NAVLink to="/entity/dashboard" icon="nav-icon fa fa-dashboard" contentKey="global.menu.entities.dashboard" /> */}
                {this.props.isAuthenticated && !this.props.isAdmin && <EntitiesMenu />}
                {this.props.isAuthenticated && this.props.isAdmin && <AdminMenu showSwagger={this.props.isSwaggerEnabled} />}
                <LocaleMenu currentLocale={this.props.currentLocale} onClick={this.handleLocaleChange} />
                {!this.props.isAuthenticated && <SignInMenu />}
                {this.props.isAuthenticated && <AccountMenu />}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
};

