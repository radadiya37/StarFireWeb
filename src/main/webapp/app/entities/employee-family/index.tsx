import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeFamily from './employee-family';
import EmployeeFamilyDetail from './employee-family-detail';
import EmployeeFamilyUpdate from './employee-family-update';
import EmployeeFamilyDeleteDialog from './employee-family-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeFamilyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeFamilyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeFamilyDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeFamily} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeFamilyDeleteDialog} />
  </>
);

export default Routes;
