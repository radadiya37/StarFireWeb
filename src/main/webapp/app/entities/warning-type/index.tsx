import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WarningType from './warning-type';
import WarningTypeDetail from './warning-type-detail';
import WarningTypeUpdate from './warning-type-update';
import WarningTypeDeleteDialog from './warning-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WarningTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WarningTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WarningTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={WarningType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WarningTypeDeleteDialog} />
  </>
);

export default Routes;
