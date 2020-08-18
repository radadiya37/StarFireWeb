import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeAward from './employee-award';
import EmployeeAwardDetail from './employee-award-detail';
import EmployeeAwardUpdate from './employee-award-update';
import EmployeeAwardDeleteDialog from './employee-award-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeAwardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeAwardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeAwardDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeAward} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeAwardDeleteDialog} />
  </>
);

export default Routes;
