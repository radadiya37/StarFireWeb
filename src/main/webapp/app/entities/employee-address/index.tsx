import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeAddress from './employee-address';
import EmployeeAddressDetail from './employee-address-detail';
import EmployeeAddressUpdate from './employee-address-update';
import EmployeeAddressDeleteDialog from './employee-address-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeAddressUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeAddressUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeAddressDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeAddress} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeAddressDeleteDialog} />
  </>
);

export default Routes;
