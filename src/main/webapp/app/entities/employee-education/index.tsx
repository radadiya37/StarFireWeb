import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeEducation from './employee-education';
import EmployeeEducationDetail from './employee-education-detail';
import EmployeeEducationUpdate from './employee-education-update';
import EmployeeEducationDeleteDialog from './employee-education-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeEducationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeEducationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeEducationDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeEducation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeEducationDeleteDialog} />
  </>
);

export default Routes;
