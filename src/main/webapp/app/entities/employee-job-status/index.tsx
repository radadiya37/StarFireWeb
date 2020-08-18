import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeJobStatus from './employee-job-status';
import EmployeeJobStatusDetail from './employee-job-status-detail';
import EmployeeJobStatusUpdate from './employee-job-status-update';
import EmployeeJobStatusDeleteDialog from './employee-job-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeJobStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeJobStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeJobStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeJobStatus} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeJobStatusDeleteDialog} />
  </>
);

export default Routes;
