import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Designation from './designation';
import DesignationDetail from './designation-detail';
import DesignationUpdate from './designation-update';
import DesignationDeleteDialog from './designation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DesignationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DesignationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DesignationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Designation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DesignationDeleteDialog} />
  </>
);

export default Routes;
