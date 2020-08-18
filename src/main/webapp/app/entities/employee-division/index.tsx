import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeDivision from './employee-division';
import EmployeeDivisionDetail from './employee-division-detail';
import EmployeeDivisionUpdate from './employee-division-update';
import EmployeeDivisionDeleteDialog from './employee-division-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeDivisionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeDivisionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeDivisionDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeDivision} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeDivisionDeleteDialog} />
  </>
);

export default Routes;
