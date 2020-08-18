import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeBank from './employee-bank';
import EmployeeBankDetail from './employee-bank-detail';
import EmployeeBankUpdate from './employee-bank-update';
import EmployeeBankDeleteDialog from './employee-bank-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeBankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeBankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeBankDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeBank} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeBankDeleteDialog} />
  </>
);

export default Routes;
