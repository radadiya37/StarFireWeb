import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeLanguage from './employee-language';
import EmployeeLanguageDetail from './employee-language-detail';
import EmployeeLanguageUpdate from './employee-language-update';
import EmployeeLanguageDeleteDialog from './employee-language-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeLanguageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeLanguageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeLanguageDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeLanguage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeLanguageDeleteDialog} />
  </>
);

export default Routes;
