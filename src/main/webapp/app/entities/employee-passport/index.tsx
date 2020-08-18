import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeePassport from './employee-passport';
import EmployeePassportDetail from './employee-passport-detail';
import EmployeePassportUpdate from './employee-passport-update';
import EmployeePassportDeleteDialog from './employee-passport-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeePassportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeePassportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeePassportDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeePassport} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeePassportDeleteDialog} />
  </>
);

export default Routes;
