import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeBasicInfo from './employee-basic-info';
import EmployeeBasicInfoDetail from './employee-basic-info-detail';
import EmployeeBasicInfoUpdate from './employee-basic-info-update';
import EmployeeBasicInfoDeleteDialog from './employee-basic-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeBasicInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeBasicInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeBasicInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeBasicInfo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeBasicInfoDeleteDialog} />
  </>
);

export default Routes;
