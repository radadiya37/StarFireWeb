import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeEmployment from './employee-employment';
import EmployeeEmploymentDetail from './employee-employment-detail';
import EmployeeEmploymentUpdate from './employee-employment-update';
import EmployeeEmploymentDeleteDialog from './employee-employment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeEmploymentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeEmploymentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeEmploymentDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeEmployment} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeEmploymentDeleteDialog} />
  </>
);

export default Routes;
