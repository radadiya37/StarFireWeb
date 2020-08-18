import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeWarning from './employee-warning';
import EmployeeWarningDetail from './employee-warning-detail';
import EmployeeWarningUpdate from './employee-warning-update';
import EmployeeWarningDeleteDialog from './employee-warning-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeWarningUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeWarningUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeWarningDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeWarning} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeWarningDeleteDialog} />
  </>
);

export default Routes;
