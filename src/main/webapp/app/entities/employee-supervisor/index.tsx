import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeSupervisor from './employee-supervisor';
import EmployeeSupervisorDetail from './employee-supervisor-detail';
import EmployeeSupervisorUpdate from './employee-supervisor-update';
import EmployeeSupervisorDeleteDialog from './employee-supervisor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeSupervisorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeSupervisorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeSupervisorDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeSupervisor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeSupervisorDeleteDialog} />
  </>
);

export default Routes;
